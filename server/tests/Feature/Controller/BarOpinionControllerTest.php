<?php

namespace Tests\Feature\Controller;

use App\Models\Bar;
use App\Models\BarOpinion;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BarOpinionControllerTest extends TestCase
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

        // Créez un utilisateur de test
        $user = User::factory()->create();
        // Créez un bar fictif
        $bar = Bar::factory()->create();

        // Créez 5 avis fictifs associés à ce bar
        BarOpinion::factory()->count(5)->create([
            'bar_id' => $bar->id,
            'user_id' => $user->id,
        ]);

        // Exécutez la requête pour la méthode index
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get("/api/bar-opinions/{$bar->id}");

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
            'opinion' => 'Ceci est un avis de test.',
        ];

        // Exécutez la requête pour la méthode store
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->post('/api/bar-opinions', $data);

        // Assurez-vous que la réponse a un code de statut 201
        $response->assertStatus(200);

        // Assurez-vous que la base de données contient le nouvel avis
        $this->assertDatabaseHas('bar_opinions', [
            'bar_id' => $bar->id,
            'opinion' => 'Ceci est un avis de test.',
        ]);
    }

    public function testUpdate()
    {
        // Créez un utilisateur de test
        $user = User::factory()->create();
        // Créez un bar fictif
        $bar = Bar::factory()->create();

        $barOpinion = BarOpinion::factory()->create([
            'bar_id' => $bar->id,
            'user_id' => $user->id,
        ]);

        // Préparez les données de la requête
        $updatedData = [
            'opinion' => 'Ceci est un avis de test mis à jour.',
        ];

        // Exécutez la requête pour la méthode update
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->put("/api/bar-opinions/{$barOpinion->id}", $updatedData);

        // Assurez-vous que la réponse a un code de statut 200
        $response->assertStatus(200);

        // Assurez-vous que l'avis a été mis à jour dans la base de données
        $this->assertDatabaseHas('bar_opinions', [
            'id' => $barOpinion->id,
            'opinion' => 'Ceci est un avis de test mis à jour.',
        ]);
    }

    public function testDestroy()
    {
        // Créez un utilisateur de test
        $user = User::factory()->create();
        // Créez un bar fictif
        $bar = Bar::factory()->create();

        // Créez 5 avis fictifs associés à ce bar
        $barOpinion = BarOpinion::factory()->create([
            'bar_id' => $bar->id,
            'user_id' => $user->id,
        ]);

        // Exécutez la requête pour la méthode destroy
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->delete("/api/bar-opinions/{$barOpinion->id}");

        // Assurez-vous que la réponse a un code de statut 200
        $response->assertStatus(200);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['opinion'],
                'message',
            ]);
    }
}
