<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Baraton extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'time',
        'radius',
        'city',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function baratonBars(): HasMany
    {
        return $this->hasMany(BaratonBar::class);
    }
}
