<?php

namespace App\Services;

use App\Repositories\Contracts\TransactionRepositoryInterface;

class TransactionService
{
    public function __construct(private TransactionRepositoryInterface $repo) {}

    public function list(int $userId, array $filters = []) { return $this->repo->paginatedForUser($userId, $filters); }
    public function create(int $userId, array $data) {
        $data['user_id'] = $userId;
        return $this->repo->create($data);
    }
    public function totals(int $userId, array $filters = []) { return $this->repo->totals($userId, $filters); }
}
