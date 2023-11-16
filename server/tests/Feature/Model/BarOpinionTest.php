<?php

namespace Tests\Feature\Model;

use App\Models\Bar;
use App\Models\BarOpinion;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BarOpinionTest extends TestCase
{
    use RefreshDatabase;

    protected $dropViews = true;

    public function test_belongs_to_user_relationship()
    {
        $user = User::factory()->create();
        $bar = Bar::factory()->create();

        $barOpinion = BarOpinion::factory()->create([
            'user_id' => $user->id,
            'bar_id' => $bar->id,
        ]);

        $this->assertInstanceOf(User::class, $barOpinion->user);
        $this->assertEquals($user->id, $barOpinion->user->id);
    }

    public function test_belongs_to_bar_relationship()
    {
        $user = User::factory()->create();

        $bar = Bar::factory()->create();
        $barOpinion = BarOpinion::factory()->create([
            'bar_id' => $bar->id,
            'user_id' => $user->id,
        ]);

        $this->assertInstanceOf(Bar::class, $barOpinion->bar);
        $this->assertEquals($bar->id, $barOpinion->bar->id);
    }

    public function test_create_bar_opinion()
    {
        $user = User::factory()->create();
        $bar = Bar::factory()->create();

        $barOpinionData = [
            'user_id' => $user->id,
            'bar_id' => $bar->id,
            'opinion' => 'This is a test opinion.',
        ];

        $barOpinion = BarOpinion::create($barOpinionData);

        $this->assertInstanceOf(BarOpinion::class, $barOpinion);
        $this->assertDatabaseHas('bar_opinions', $barOpinionData);
    }
}
