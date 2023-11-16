<?php

namespace Tests\Feature\Model;

use App\Models\Bar;
use App\Models\Baraton;
use App\Models\BaratonBar;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BarTest extends TestCase
{
    use RefreshDatabase;

    protected $dropViews = true;

    public function test_bar_can_have_baratons()
    {
        $user = User::factory()->create(['email_verified_at' => now()]);

        $baraton = Baraton::factory()->create(['user_id' => $user->id]);

        $bar = Bar::factory()->create();
        $baratonBar = BaratonBar::factory()->create([
            'bar_id' => $bar->id,
            'baraton_id' => $baraton->id,
        ]);

        $this->assertInstanceOf(BaratonBar::class, $bar->baratonBars->first());
    }

    public function test_create_bar()
    {
        $barData = [
            'name' => 'Example Bar',
            'longitude' => 123.456,
            'latitude' => 789.012,
            'website' => 'https://example.com',
            'phone' => '123-456-7890',
            'opening_hours' => 'Mon-Fri: 9AM-5PM',
            'wheelchair' => true,
        ];

        $bar = Bar::create($barData);

        $this->assertInstanceOf(Bar::class, $bar);
        $this->assertDatabaseHas('bars', $barData);
    }
}
