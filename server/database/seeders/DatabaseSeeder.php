<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'birthdate' => '2000-10-11',
            'password' => 'azertyuiop',

        ]);

        \App\Models\User::factory(10)->create();

        $command = 'python '.'database/seeders/get_bars.py';
        exec($command, $output, $return_var);

        // Vérifiez si l'exécution a réussi
        if ($return_var === 0) {
            $this->command->info('Script exécuté avec succès!');
        } else {
            $this->command->error("Erreur lors de l'exécution du script.");
            $this->command->error(implode(PHP_EOL, $output));
        }

        \App\Models\BarOpinion::factory(500)->create();
        \App\Models\Baraton::factory(5)->create();

    }
}
