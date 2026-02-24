<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        Student::create([
            'name' => 'Amadou',
            'prenom' => 'Bah',
            'date_naissance' => '2005-01-01',
            'adresse' => 'Conakry',
            'tel' => '622334455',
            'pere' => 'Moussa Bah',
            'mere' => 'Fatoumata Bah'
        ]);
    }
}