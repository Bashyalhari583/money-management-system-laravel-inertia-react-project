<?php

namespace App\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface TransactionRepositoryInterface
{
    public function paginatedForUser(int $userId, array $filters = []): LengthAwarePaginator;
    public function create(array $data);
    public function totals(int $userId, array $filters = []): array;
}
