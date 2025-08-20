<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Relation extends Model
{
    protected $fillable = ['user_id','relative_id','relation_type','status'];

    public function sender()  { return $this->belongsTo(User::class, 'user_id'); }
    public function receiver(){ return $this->belongsTo(User::class, 'relative_id'); }
}
