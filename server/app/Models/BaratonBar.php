<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BaratonBar extends Model
{
    use HasFactory;

    protected $fillable = [
        'baraton_id',
        'bar_id',
        'status',
    ];

    public function bar(): BelongsTo
    {
        return $this->belongsTo(Bar::class);
    }

    public function baraton(): BelongsTo
    {
        return $this->belongsTo(Baraton::class);
    }
}
