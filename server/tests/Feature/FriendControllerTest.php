<?php

namespace Tests\Feature;

use App\Models\Friend;
use App\Models\User;
use Tests\TestCase;

class FriendControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    protected $dropViews = true;

    protected function getToken($user)
    {
        $token = $user->createToken('test-token')->plainTextToken;

        return $token;
    }

    public function testIndex()
    {
        // Créez un utilisateur de test et connectez-le
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        // Créez des amis fictifs pour l'utilisateur
        $friends = Friend::factory()->count(5)->create([
            'user_id' => $user->id,
            'friend_id' => $user2->id,
        ]);
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get('/api/friends');

        // Assurez-vous que la réponse a un code de statut 200
        $response->assertStatus(200);

        // Vérifiez la structure JSON de la réponse
        $response->assertJsonStructure([
            'success',
            'data' => [
                '*' => ['user', 'friend'],
            ],
            'message',
        ]);
    }

    public function testPendingFriends()
    {
        // Créez un utilisateur de test et connectez-le
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        // Créez des amis en attente fictifs pour l'utilisateur
        $pendingFriends = Friend::factory()->count(1)->create([
            'user_id' => $user->id,
            'friend_id' => $user2->id,
            'accepted' => 0,
        ]);

        // Exécutez la requête pour la méthode pendingFriends
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get('/api/friends/pending');

        // Assurez-vous que la réponse a un code de statut 200
        $response->assertStatus(200);

    }

    public function testStore()
    {
        // Créez un utilisateur de test et connectez-le
        $user = User::factory()->create();

        // Créez un autre utilisateur de test
        $friend = User::factory()->create();

        // Préparez les données de la requête
        $data = [
            'friend_code' => $friend->friend_code,
        ];

        // Exécutez la requête pour la méthode store
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->post('/api/friends', $data);

        // Assurez-vous que la réponse a un code de statut 200
        $response->assertStatus(200);

    }

    public function testUpdate()
    {
        // Créez un utilisateur de test
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        // Créez un ami en attente fictif
        $friend = Friend::factory()->create([
            'user_id' => $user2->id,
            'friend_id' => $user->id,
            'accepted' => 0,
        ]);

        // Préparez les données de la requête
        $data = [
            'accepted' => 1,
        ];

        // Exécutez la requête pour la méthode update
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->put("/api/friends/{$user2->id}", $data);

        // Assurez-vous que la réponse a un code de statut 200
        $response->assertStatus(200);

    }

    public function testDestroy()
    {
        // Créez un utilisateur de test
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        // Créez un ami fictif
        $friend = Friend::factory()->create([
            'user_id' => $user->id,
            'friend_id' => $user2->id,
        ]);

        // Exécutez la requête pour la méthode destroy
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->delete("/api/friends/{$user2->id}");

        // Assurez-vous que la réponse a un code de statut 200
        $response->assertStatus(200);

    }
}
