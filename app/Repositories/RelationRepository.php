<?php

namespace App\Repositories;

use App\Models\Relation;
use App\Repositories\Contracts\RelationRepositoryInterface;
use Illuminate\Support\Facades\DB;

class RelationRepository implements RelationRepositoryInterface
{
    public function listForUser(int $userId) {
        return Relation::with(['sender','receiver'])
            ->where(function($q) use ($userId) {
                $q->where('user_id', $userId)->orWhere('relative_id', $userId);
            })
            ->latest()->get();
    }

    public function create(array $data): Relation {
        return Relation::create($data);
    }

    public function updateStatus(int $id, string $status): bool {
        return Relation::where('id', $id)->update(['status'=>$status]) > 0;
    }

    // RAW QUERY example for user search (fast + simple)
    public function searchUsersByName(string $query, int $excludeUserId) {
        return DB::select(
            "SELECT id, name, email FROM users WHERE id != ? AND name LIKE ? ORDER BY name LIMIT 20",
            [$excludeUserId, "%{$query}%"]
        );
    }
}
