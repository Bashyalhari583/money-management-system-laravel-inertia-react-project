<?php

namespace App\Repositories;

use App\Models\Transaction;
use App\Repositories\Contracts\TransactionRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class TransactionRepository implements TransactionRepositoryInterface
{
    public function paginatedForUser(int $userId, array $filters = []): LengthAwarePaginator {
        return Transaction::where('user_id', $userId)
            ->when(!empty($filters['type']), fn($q)=>$q->where('type',$filters['type']))
            ->when(!empty($filters['from']), fn($q)=>$q->whereDate('date','>=',$filters['from']))
            ->when(!empty($filters['to']),   fn($q)=>$q->whereDate('date','<=',$filters['to']))
            ->orderByDesc('date')
            ->paginate(10)
            ->withQueryString();
    }

    public function create(array $data) {
        return Transaction::create($data);
    }

    // RAW aggregation for speed
    public function totals(int $userId, array $filters = []): array {
        $bindings = [$userId];
        $where = "user_id = ?";

        if (!empty($filters['from'])) { $where .= " AND date >= ?"; $bindings[] = $filters['from']; }
        if (!empty($filters['to']))   { $where .= " AND date <= ?"; $bindings[] = $filters['to']; }

        $sql = "
            SELECT
              SUM(CASE WHEN type='income'  THEN amount ELSE 0 END) AS total_income,
              SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expense
            FROM transactions
            WHERE {$where}
        ";

        $row = DB::selectOne($sql, $bindings);
        $income = (float)($row->total_income ?? 0);
        $expense= (float)($row->total_expense ?? 0);
        return [
            'total_income'  => $income,
            'total_expense' => $expense,
            'net'           => $income - $expense,
        ];
    }
}
