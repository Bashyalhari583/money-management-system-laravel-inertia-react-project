<?php

namespace App\Services;

use App\Models\Relation;
use App\Repositories\Contracts\RelationRepositoryInterface;

class RelationService
{
    public function __construct(private RelationRepositoryInterface $repo) {}

    public function list(int $userId) { return $this->repo->listForUser($userId); }
    public function send(int $userId, int $relativeId, string $type): Relation {
        return $this->repo->create([
            'user_id' => $userId,
            'relative_id' => $relativeId,
            'relation_type' => $type,
            'status' => 'pending',
        ]);
    }
    public function respond(int $id, string $status): bool {
        return $this->repo->updateStatus($id, $status);
    }
    public function search(string $q, int $me) { return $this->repo->searchUsersByName($q, $me); }
}
