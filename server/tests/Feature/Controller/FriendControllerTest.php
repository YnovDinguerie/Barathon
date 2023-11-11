<?php

namespace Tests\Feature\Controller;

use App\Models\Friend;
use App\Models\User;
use Tests\TestCase;

class FriendControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    protected $dropViews = true;

    protected function getToken($user)
    {
        $token = $user->createToken('test-token')->plainTextToken;

        return $token;
    }

    public function testIndex()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $friends = Friend::factory()->count(5)->create([
            'user_id' => $user->id,
            'friend_id' => $user2->id,
        ]);
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get('/api/friends');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'success',
            'data' => [
                '*' => ['user', 'friend'],
            ],
            'message',
        ]);
    }

    public function testPendingFriends()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $pendingFriends = Friend::factory()->count(1)->create([
            'user_id' => $user->id,
            'friend_id' => $user2->id,
            'accepted' => 0,
        ]);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->get('/api/friends/pending');

        $response->assertStatus(200);

    }

    public function testStore()
    {
        $user = User::factory()->create();

        $friend = User::factory()->create();

        $data = [
            'friend_code' => $friend->friend_code,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->post('/api/friends', $data);

        $response->assertStatus(200);

    }

    public function testUpdate()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $friend = Friend::factory()->create([
            'user_id' => $user2->id,
            'friend_id' => $user->id,
            'accepted' => 0,
        ]);

        $data = [
            'accepted' => 1,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->put("/api/friends/{$user2->id}", $data);

        $response->assertStatus(200);

    }

    public function testDestroy()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $friend = Friend::factory()->create([
            'user_id' => $user->id,
            'friend_id' => $user2->id,
        ]);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$this->getToken($user)])->delete("/api/friends/{$user2->id}");

        $response->assertStatus(200);

    }
}
