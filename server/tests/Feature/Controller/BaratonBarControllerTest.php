<?php

namespace Tests\Feature\Controller;

use App\Models\Bar;
use App\Models\Baraton;
use App\Models\BaratonBar;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BaratonBarControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $dropViews = true;

    protected function getToken($user)
    {
        $token = $user->createToken('test-token')->plainTextToken;

        return $token;
    }

    public function testStore()
    {
        $user = User::factory()->create(['email_verified_at' => now()]);

        $baraton = Baraton::factory()->create(['user_id' => $user->id]);

        $bar = Bar::factory()->create();

        $data = [
            'baraton_id' => $baraton->id,
            'bar_id' => $bar->id,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->post('/api/baraton-bars', $data);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['baraton_id', 'bar_id'],
                'message',
            ]);
    }

    public function testShow()
    {
        $user = User::factory()->create(['email_verified_at' => now()]);
        $baraton = Baraton::factory()->create(['user_id' => $user->id]);
        $bar = Bar::factory()->create();

        $baratonBar = BaratonBar::factory()->create([
            'baraton_id' => $baraton->id,
            'bar_id' => $bar->id,
        ]);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get("/api/baraton-bars/{$baratonBar->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['bar', 'baraton'],
                'message',
            ]);
    }

    public function testUpdate()
    {
        $user = User::factory()->create(['email_verified_at' => now()]);
        $baraton = Baraton::factory()->create(['user_id' => $user->id]);
        $bar = Bar::factory()->create();

        $baratonBar = BaratonBar::factory()->create([
            'baraton_id' => $baraton->id,
            'bar_id' => $bar->id,
        ]);

        $updatedData = [
            'baraton_id' => $baraton->id,
            'bar_id' => $bar->id,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])
            ->put("/api/baraton-bars/{$baratonBar->id}", $updatedData);

        $response->assertStatus(200);

    }

    public function testDestroy()
    {
        $user = User::factory()->create(['email_verified_at' => now()]);
        $baraton = Baraton::factory()->create(['user_id' => $user->id]);
        $bar = Bar::factory()->create();

        $baratonBar = BaratonBar::factory()->create([
            'baraton_id' => $baraton->id,
            'bar_id' => $bar->id,
        ]);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])
            ->delete("/api/baraton-bars/{$baratonBar->id}");

        $response->assertStatus(200);

    }
}
