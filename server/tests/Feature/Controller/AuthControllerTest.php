<?php

namespace Tests\Feature\Controller;

use App\Models\User;
use Carbon\Carbon;
use DB;
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

    public function testVerifyUser()
    {

        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => bcrypt('Password123'),
        ]);

        $token = $user->createToken('MyApp')->plainTextToken;
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])->post('/api/verify-email/'.$token);

        $response->assertStatus(200);

    }

    public function testSendPasswordResetEmail()
    {

        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => bcrypt('Password123'),
        ]);

        $data = ['email' => $user['email']];

        $response = $this->post('/api/send-password-reset-email', $data);

        $response->assertStatus(200);
    }

    public function testResetPassword()
    {
        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => bcrypt('Password123'),
        ]);
        $token = bin2hex(random_bytes(32));
        DB::table('password_reset_tokens')
            ->where('email', $user['email'])
            ->delete();
        $password_resets_record = DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => $token,
            'created_at' => Carbon::now(),
        ]);

        $data = [
            'token' => $token,
            'email' => $user['email'],
            'password' => 'NewPassword123',
            'c_password' => 'NewPassword123',
        ];

        $response = $this->post('/api/reset-password', $data);

        $response->assertStatus(200);

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
