<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaratonBar extends Model
{
    use HasFactory;

    protected $fillable = [
        'baraton_id',
        'bar_id',
        'status',
    ];
}
