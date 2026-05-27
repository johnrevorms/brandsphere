<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'career_id',
        'user_id',
        'name',
        'email',
        'phone',
        'cv_path',
        'cover_letter',
        'status',
    ];

    public function career()
    {
        return $this->belongsTo(Career::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
