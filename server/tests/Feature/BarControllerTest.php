<?php

namespace Tests\Feature;

use App\Models\Bar;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BarControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;

    protected $dropViews = true;

    public function testIndex()
    {
        $bar = Bar::factory()->create([
            'latitude' => -44,
            'longitude' => 0.6,
        ]);

        // Simulez des valeurs de latitude, de longitude et de rayon
        $latitude = -44; // Exemple de latitude
        $longitude = 0.6; // Exemple de longitude
        $radius = 2; // Exemple de rayon

        // Effectuez la requête GET vers votre endpoint
        $response = $this->get("/api/bars/$latitude&$longitude&$radius");

        // Vérifiez si la réponse HTTP est un succès (code 200)
        $response->assertStatus(200);

        // Vérifiez la structure de la réponse JSON (adapté à votre application)
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    // Ajoutez d'autres clés que vous attendez dans la réponse JSON
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

        // Simulez des valeurs de latitude, de longitude et de rayon
        $latitude = -44; // Exemple de latitude
        $longitude = 0.6; // Exemple de longitude
        $name = 'Example'; // Exemple de nom

        // Effectuez la requête GET vers votre endpoint
        $response = $this->get("/api/bars-search/$latitude&$longitude&$name");

        // Vérifiez si la réponse HTTP est un succès (code 200)
        $response->assertStatus(200);

        // Vérifiez la structure de la réponse JSON (adapté à votre application)
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    // Ajoutez d'autres clés que vous attendez dans la réponse JSON
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

        // Simulez des valeurs de latitude, de longitude et de rayon
        $latitude = -44; // Exemple de latitude
        $longitude = 0.6; // Exemple de longitude
        $name = 'Ex'; // Nom trop court

        // Effectuez la requête GET vers votre endpoint
        $response = $this->get("/api/bars-search/$latitude&$longitude&$name");

        // Vérifiez si la réponse HTTP est une erreur (code 400)
        $response->assertStatus(404);
    }
}
