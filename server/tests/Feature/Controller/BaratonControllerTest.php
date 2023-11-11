<?php

namespace Tests\Feature\Controller;

use App\Models\Bar;
use App\Models\Baraton;
use App\Models\BaratonBar;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BaratonControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $dropViews = true;

    protected function getToken($user)
    {
        $token = $user->createToken('test-token')->plainTextToken;

        return $token;
    }

    public function testIndex()
    {
        // Créez un utilisateur de test vérifié
        $user = User::factory()->create(['email_verified_at' => now()]);

        // Créez 5 enregistrements de baratons fictifs pour cet utilisateur
        Baraton::factory()->count(5)->create(['user_id' => $user->id]);

        // Exécutez la requête pour la méthode index
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get('/api/baratons');

        // Assurez-vous que la réponse a un code de statut 200
        $response->assertStatus(200);
    }

    public function testGetBaratonBars()
    {
        // Créez un utilisateur de test
        $user = User::factory()->create();

        // Créez un baraton associé à l'utilisateur
        $baraton = Baraton::factory()->create(['user_id' => $user->id]);

        // Créez des bars fictifs
        $bars = Bar::factory()->count(5)->create();

        // Associez les bars au baraton via la table pivot "baratonbar"
        foreach ($bars as $bar) {
            BaratonBar::factory()->create([
                'baraton_id' => $baraton->id,
                'bar_id' => $bar->id,
            ]);
        }

        // Exécutez la requête pour la méthode getBaratonBars
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get("/api/baratons/{$baraton->id}/bars");

        // Assurez-vous que la réponse a un code de statut 200
        // et vérifiez la structure JSON de la réponse
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['bar'],
                ],
                'message',
            ]);
    }

    public function testStore()
    {
        $user = User::factory()->create();
        $baratonData = [
            'name' => 'Test Baraton',
            'time' => 50,
            'radius' => 50,
            'city' => 'Test City',
        ];

        // Exécutez la requête pour la méthode store
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->post('/api/baratons', $baratonData);

        // Assurez-vous que la réponse a un code de statut 201
        // et vérifiez la structure JSON de la réponse
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['name', 'time', 'radius', 'city', 'user_id'],
                'message',
            ]);
    }

    public function testShow()
    {
        $user = User::factory()->create();
        $baraton = Baraton::factory()->create(['user_id' => $user->id]);

        // Exécutez la requête pour la méthode show
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get("/api/baratons/{$baraton->id}");

        // Assurez-vous que la réponse a un code de statut 200
        // et vérifiez la structure JSON de la réponse
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['name', 'time', 'radius', 'city', 'user_id'],
                'message',
            ]);
    }

    public function testUpdate()
    {
        $user = User::factory()->create();
        $baraton = Baraton::factory()->create(['user_id' => $user->id]);
        $updatedData = [
            'name' => 'Updated Baraton Name',
            'time' => 50,
            'radius' => 50,
            'city' => 'Updated Event City',
        ];

        // Exécutez la requête pour la méthode update
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->put("/api/baratons/{$baraton->id}", $updatedData);

        // Assurez-vous que la réponse a un code de statut 200
        // et vérifiez la structure JSON de la réponse
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['name', 'time', 'radius', 'city', 'user_id'],
                'message',
            ]);
    }

    public function testDestroy()
    {
        $user = User::factory()->create();
        $baraton = Baraton::factory()->create(['user_id' => $user->id]);

        // Exécutez la requête pour la méthode destroy
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->delete("/api/baratons/{$baraton->id}");

        // Assurez-vous que la réponse a un code de statut 200
        // et vérifiez la structure JSON de la réponse
        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['name', 'time', 'radius', 'city', 'user_id'],
                'message',
            ]);
    }
}
