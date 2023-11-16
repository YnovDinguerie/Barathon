<?php

namespace Tests\Feature\Model;

use App\Models\Baraton;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected $dropViews = true;

    public function test_user_can_have_baratons()
    {
        $user = User::factory()->create();
        $baraton = Baraton::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(Baraton::class, $user->baratons->first());
    }

    public function test_generate_unique_friend_code()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $friendCode1 = $user1::generateUniqueFriendCode();
        $friendCode2 = $user2::generateUniqueFriendCode();

        $this->assertNotEquals($friendCode1, $friendCode2);
    }

    public function test_user_can_have_friends()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $user1->friendsTo()->attach($user2, ['accepted' => true]);

        $this->assertTrue($user1->friends()->where('id', $user2->id)->exists());
        $this->assertTrue($user2->friends()->where('id', $user1->id)->exists());
    }

    public function test_user_can_have_pending_friends()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $user1->friendsTo()->attach($user2, ['accepted' => false]);

        $this->assertTrue($user1->pendingFriends()->where('id', $user2->id)->exists());
        $this->assertTrue($user2->pendingFriends()->where('id', $user1->id)->exists());
    }

    public function test_user_can_have_accepted_friends()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $user1->friendsTo()->attach($user2, ['accepted' => true]);

        $this->assertTrue($user1->friends()->where('id', $user2->id)->exists());
        $this->assertTrue($user2->friends()->where('id', $user1->id)->exists());
    }

    public function test_user_can_have_merged_friends()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $user1->friendsTo()->attach($user2, ['accepted' => true]);

        $this->assertTrue($user1->friends()->where('id', $user2->id)->exists());
        $this->assertTrue($user2->friends()->where('id', $user1->id)->exists());
    }

    public function test_user_can_have_merged_pending_friends()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $user1->friendsTo()->attach($user2, ['accepted' => false]);

        $this->assertTrue($user1->pendingFriends()->where('id', $user2->id)->exists());
        $this->assertTrue($user2->pendingFriends()->where('id', $user1->id)->exists());
    }
}
