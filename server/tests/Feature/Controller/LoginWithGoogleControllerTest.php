<?php

namespace Tests\Feature\Controller;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginWithGoogleControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $dropViews = true;

    public function test_redirect_to_google()
    {
        $response = $this->getJson('/api/authorized/google');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'redirect_url',
            ]);
    }
}
