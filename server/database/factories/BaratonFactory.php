<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Baraton>
 */
class BaratonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'name' => fake()->name(),
            'time' => fake()->numberBetween(0, 7200),
            'radius' => fake()->numberBetween(100, 500),
            'city' => 'Bordeaux',
        ];
    }
}
