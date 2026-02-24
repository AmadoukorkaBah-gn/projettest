<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'name',
        'prenom',
        'date_naissance',
        'adresse',
        'tel',
        'pere',
        'mere'
    ];
}
