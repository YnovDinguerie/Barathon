<?php

namespace Tests\Feature\Middleware;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class AuthenticateTest extends TestCase
{
    use RefreshDatabase;

    protected $dropViews = true;

    public function test_guest_is_redirected_to_login_page()
    {

        Route::get('/protected', function () {
            return 'Protected content';
        })->middleware('auth');

        $response = $this->get('/protected');

        $response->assertRedirect(redirect(env('FRONT_URL')));
    }

    public function test_authenticated_user_can_access_protected_page()
    {

        Route::get('/protected', function () {
            return 'Protected content';
        })->middleware('auth');

        $user = \App\Models\User::factory()->create();
        $this->actingAs($user);

        $response = $this->get('/protected');

        $response->assertSee('Protected content');
    }
}
