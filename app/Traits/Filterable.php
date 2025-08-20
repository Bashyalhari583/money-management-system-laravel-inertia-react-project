<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    public function scopeApplyFilters(Builder $q, array $filters) {
        if (!empty($filters['type']))      $q->where('type', $filters['type']);
        if (!empty($filters['from']))      $q->whereDate('date','>=',$filters['from']);
        if (!empty($filters['to']))        $q->whereDate('date','<=',$filters['to']);
        if (!empty($filters['category']))  $q->where('category',$filters['category']);
        return $q;
    }
}
