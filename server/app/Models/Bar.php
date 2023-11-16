<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bar extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'longitude',
        'latitude',
        'website',
        'phone',
        'opening_hours',
        'wheelchair',
    ];

    public function baratonBars(): HasMany
    {
        return $this->hasMany(BaratonBar::class);
    }

    public function favoriteBars(): HasMany
    {
        return $this->hasMany(FavoriteBar::class);
    }
}
