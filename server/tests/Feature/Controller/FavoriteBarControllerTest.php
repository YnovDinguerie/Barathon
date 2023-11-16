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

        $user = User::factory()->create();
        $bar = Bar::factory()->create();

        FavoriteBar::factory()->create([
            'bar_id' => $bar->id,
            'user_id' => $user->id,
        ]);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get('/api/favorite-bars');

        $response->assertStatus(200);
    }

    public function testStore()
    {
        $user = User::factory()->create();

        $bar = Bar::factory()->create();

        $data = [
            'bar_id' => $bar->id,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->post('/api/favorite-bars', $data);

        $response->assertStatus(200);

        $this->assertDatabaseHas('favorite_bars', [
            'bar_id' => $bar->id,
        ]);
    }

    public function testDestroy()
    {
        $user = User::factory()->create();
        $bar = Bar::factory()->create();

        $favoriteBar = FavoriteBar::factory()->create([
            'bar_id' => $bar->id,
            'user_id' => $user->id,
        ]);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->delete("/api/favorite-bars/{$favoriteBar->id}");

        $response->assertStatus(200);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [],
                'message',
            ]);
    }
}
