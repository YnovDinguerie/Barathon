<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bar>
 */
class BarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'longitude' => fake()->longitude(),
            'latitude' => fake()->latitude(),
            'website' => fake()->url(),
            'phone' => fake()->phoneNumber(),
            'opening_hours' => fake()->name(),
            'wheelchair' => fake()->boolean(),
        ];
    }
}
