<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BarOpinion extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bar_id',
        'opinion',
    ];


    public function bar(): BelongsTo
    {
        return $this->belongsTo(Bar::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
