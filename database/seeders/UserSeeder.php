<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('users')->insert(
            [
                [
                    'name' => ' Hari',
                    'email' => 'hbashyal878@gmail.com',
                    'email_verified_at' => now(),
                    'password' => Hash::make('domain'),
                    'remember_token' => Str::random(10),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' =>  ' Domain',
                    'email' =>  'domain@gmail.com',
                    'email_verified_at' => now(),
                    'password' => Hash::make('domain'),
                    'remember_token' => Str::random(10),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            ]
        );
    }
}
