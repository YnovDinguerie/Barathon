<?php

namespace Tests\Feature\Middleware;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class EnsureEmailVerifiedTest extends TestCase
{
    use RefreshDatabase;

    protected $dropViews = true;

    public function test_user_with_verified_email_can_access_protected_page()
    {

        Route::get('/protected', function () {
            return 'Protected content';
        })->middleware('verified');

        $user = User::factory()->create(['email_verified_at' => now()]);
        $this->actingAs($user);

        $response = $this->get('/protected');

        $response->assertSee('Protected content');
    }
}
