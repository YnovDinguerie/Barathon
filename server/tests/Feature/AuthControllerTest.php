<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $dropViews = true;

    public function testRegister()
    {

        $userData = [
            'name' => 'John Doe',
            'birthdate' => '2000-10-11',
            'email' => 'john.doe@example.com',
            'password' => 'Password123',
            'c_password' => 'Password123',
        ];

        $response = $this->post('/api/register', $userData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'User register successfully.',
            ])
            ->assertJsonStructure(['data' => ['token', 'name']]);

    }

    public function testLogin()
    {

        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => bcrypt('Password123'),
        ]);

        $loginData = ['email' => 'john.doe@example.com', 'password' => 'Password123'];
        $response = $this->post('/api/login', $loginData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'User login successfully.',
            ])
            ->assertJsonStructure(['data' => ['token', 'name', 'id']]);

    }

    public function testUpdateProfile()
    {

        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => bcrypt('Password123'),
        ]);

        $loginData = ['email' => 'john.doe@example.com', 'password' => 'Password123'];
        $this->post('/api/login', $loginData);

        $updateData = [
            'name' => 'Updated Name',
            'birthdate' => '1990-05-15',
            'email' => 'updated.email@example.com',
        ];

        $response = $this->put('/api/update-profile', $updateData);

        $response->assertStatus(200)
            ->assertJsonStructure(['data' => ['name', 'birthdate', 'email']]);

    }
}
