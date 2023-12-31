<?php

namespace Tests\Feature\Controller;

use App\Models\Bar;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BarControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;

    protected $dropViews = true;

    protected function getToken($user)
    {
        $token = $user->createToken('test-token')->plainTextToken;

        return $token;
    }

    public function testIndex()
    {
        $bar = Bar::factory()->create([
            'latitude' => -44,
            'longitude' => 0.6,
        ]);

        $latitude = -44;
        $longitude = 0.6;
        $radius = 2;

        $response = $this->get("/api/bars/$latitude&$longitude&$radius");

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                ],
            ],
        ]);
    }

    public function testSearch()
    {
        $bar = Bar::factory()->create([
            'latitude' => -44,
            'longitude' => 0.6,
        ]);
        $user = User::factory()->create();

        $latitude = -44;
        $longitude = 0.6;
        $name = 'Example';

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get("/api/bars-search/$latitude&$longitude&$name");

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                ],
            ],
        ]);
    }

    public function testSearchWithShortName()
    {
        $bar = Bar::factory()->create([
            'latitude' => -44,
            'longitude' => 0.6,
        ]);
        $user = User::factory()->create();

        $latitude = -44;
        $longitude = 0.6;
        $name = 'Ex';

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get("/api/bars-search/$latitude&$longitude&$name");

        $response->assertStatus(404);
    }
}
