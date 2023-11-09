<?php

namespace Tests\Feature;

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
        // Exécutez la méthode verify avec le bon token
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])->post('/api/verify-email/'.$token);

        // Assurez-vous que la réponse a un code de statut 200
        $response->assertStatus(200);

    }

    public function testSendPasswordResetEmail()
    {

        $user = User::factory()->create([
            'email' => 'john.doe@example.com',
            'password' => bcrypt('Password123'),
        ]);

        // Préparez les données de la requête
        $data = ['email' => $user['email']];

        // Exécutez la méthode sendPasswordResetEmail
        $response = $this->post('/api/send-password-reset-email', $data);

        // Assurez-vous que la réponse a un code de statut 200
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

        // Préparez les données de la requête
        $data = [
            'token' => $token, // Remplacez par le bon jeton
            'email' => $user['email'], // Remplacez par le bon e-mail
            'password' => 'NewPassword123',
            'c_password' => 'NewPassword123',
        ];

        // Exécutez la méthode resetPassword
        $response = $this->post('/api/reset-password', $data);

        // Assurez-vous que la réponse a un code de statut 200
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
