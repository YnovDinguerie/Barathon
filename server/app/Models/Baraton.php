<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Baraton extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'time',
        'radius',
        'city',
        'user_id'
    ];
}
