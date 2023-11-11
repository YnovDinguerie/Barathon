<?php

namespace Tests\Feature\Controller;

use App\Models\Bar;
use App\Models\FavoriteBar;
use App\Models\User;
use Tests\TestCase;

class FavoriteBarControllerTest extends TestCase
{
    protected $dropViews = true;

    protected function getToken($user)
    {
        $token = $user->createToken('test-token')->plainTextToken;

        return $token;
    }

    public function testIndex()
    {

        // Créez un utilisateur de test
        $user = User::factory()->create();
        // Créez un bar fictif
        $bar = Bar::factory()->create();

        // Créez 5 avis fictifs associés à ce bar
        FavoriteBar::factory()->create([
            'bar_id' => $bar->id,
            'user_id' => $user->id,
        ]);

        // Exécutez la requête pour la méthode index
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get('/api/favorite-bars');

        // Assurez-vous que la réponse a un code de statut 200
        $response->assertStatus(200);
    }

    public function testStore()
    {
        // Créez un utilisateur de test
        $user = User::factory()->create();

        // Créez un bar fictif
        $bar = Bar::factory()->create();

        // Préparez les données de la requête
        $data = [
            'bar_id' => $bar->id,
        ];

        // Exécutez la requête pour la méthode store
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->post('/api/favorite-bars', $data);

        // Assurez-vous que la réponse a un code de statut 201
        $response->assertStatus(200);

        // Assurez-vous que la base de données contient le nouvel avis
        $this->assertDatabaseHas('favorite_bars', [
            'bar_id' => $bar->id,
        ]);
    }

    public function testDestroy()
    {
        // Créez un utilisateur de test
        $user = User::factory()->create();
        // Créez un bar fictif
        $bar = Bar::factory()->create();

        // Créez 5 avis fictifs associés à ce bar
        $favoriteBar = FavoriteBar::factory()->create([
            'bar_id' => $bar->id,
            'user_id' => $user->id,
        ]);

        // Exécutez la requête pour la méthode destroy
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->delete("/api/favorite-bars/{$favoriteBar->id}");

        // Assurez-vous que la réponse a un code de statut 200
        $response->assertStatus(200);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [],
                'message',
            ]);
    }
}
