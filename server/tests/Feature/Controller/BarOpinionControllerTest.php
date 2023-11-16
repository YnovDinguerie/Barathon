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

        $user = User::factory()->create();
        $bar = Bar::factory()->create();

        BarOpinion::factory()->count(5)->create([
            'bar_id' => $bar->id,
            'user_id' => $user->id,
        ]);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get("/api/bar-opinions/{$bar->id}");

        $response->assertStatus(200);
    }

    public function testStore()
    {
        $user = User::factory()->create();

        $bar = Bar::factory()->create();

        $data = [
            'bar_id' => $bar->id,
            'opinion' => 'Ceci est un avis de test.',
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->post('/api/bar-opinions', $data);

        $response->assertStatus(200);

        $this->assertDatabaseHas('bar_opinions', [
            'bar_id' => $bar->id,
            'opinion' => 'Ceci est un avis de test.',
        ]);
    }

    public function testUpdate()
    {
        $user = User::factory()->create();
        $bar = Bar::factory()->create();

        $barOpinion = BarOpinion::factory()->create([
            'bar_id' => $bar->id,
            'user_id' => $user->id,
        ]);

        $updatedData = [
            'opinion' => 'Ceci est un avis de test mis à jour.',
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->put("/api/bar-opinions/{$barOpinion->id}", $updatedData);

        $response->assertStatus(200);

        $this->assertDatabaseHas('bar_opinions', [
            'id' => $barOpinion->id,
            'opinion' => 'Ceci est un avis de test mis à jour.',
        ]);
    }

    public function testDestroy()
    {
        $user = User::factory()->create();
        $bar = Bar::factory()->create();

        $barOpinion = BarOpinion::factory()->create([
            'bar_id' => $bar->id,
            'user_id' => $user->id,
        ]);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->delete("/api/bar-opinions/{$barOpinion->id}");

        $response->assertStatus(200);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['opinion'],
                'message',
            ]);
    }
}
