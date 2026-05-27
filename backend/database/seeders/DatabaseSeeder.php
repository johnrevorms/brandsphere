<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin Arcanum',
            'email' => 'admin@arcanum.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'CMS Editor',
            'email' => 'cms@arcanum.com',
            'password' => bcrypt('password'),
            'role' => 'cms',
        ]);

        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'user@arcanum.com',
            'password' => bcrypt('password'),
            'role' => 'user',
        ]);
    }
}
