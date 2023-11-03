<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('friend_code')->unique()->nullable();
        });

        // Génère un code ami unique pour les utilisateurs existants
        $existingUsers = User::all();
        foreach ($existingUsers as $user) {
            $user->friend_code = Str::random(8);
            $user->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('friend_code');
        });
    }
};
