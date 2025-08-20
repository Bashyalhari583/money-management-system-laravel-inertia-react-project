<?php

namespace App\Repositories\Contracts;

use App\Models\Relation;

interface RelationRepositoryInterface
{
  public function listForUser(int $userId);
  public function create(array $data): Relation;
  public function updateStatus(int $id, string $status): bool;
  public function searchUsersByName(string $query, int $excludeUserId);
}
