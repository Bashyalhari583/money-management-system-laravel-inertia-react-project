<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['user_id','type','category','amount','date','description'];

    public function user() { return $this->belongsTo(User::class); }
}
