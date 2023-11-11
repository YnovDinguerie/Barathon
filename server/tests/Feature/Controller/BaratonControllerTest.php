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
        $user = User::factory()->create(['email_verified_at' => now()]);

        Baraton::factory()->count(5)->create(['user_id' => $user->id]);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get('/api/baratons');

        $response->assertStatus(200);
    }

    public function testGetBaratonBars()
    {
        $user = User::factory()->create();

        $baraton = Baraton::factory()->create(['user_id' => $user->id]);

        $bars = Bar::factory()->count(5)->create();

        foreach ($bars as $bar) {
            BaratonBar::factory()->create([
                'baraton_id' => $baraton->id,
                'bar_id' => $bar->id,
            ]);
        }

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get("/api/baratons/{$baraton->id}/bars");

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

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->post('/api/baratons', $baratonData);

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

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get("/api/baratons/{$baraton->id}");

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

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->put("/api/baratons/{$baraton->id}", $updatedData);

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

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->delete("/api/baratons/{$baraton->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['name', 'time', 'radius', 'city', 'user_id'],
                'message',
            ]);
    }
}
