<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\TransactionService;

class DashboardController extends Controller
{
    public function __construct(private TransactionService $tx) {}

    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $totals = $this->tx->totals($userId, [
            'from' => now()->startOfMonth()->toDateString(),
            'to'   => now()->endOfMonth()->toDateString(),
        ]);

        return Inertia::render('dashboard', [
            'totals' => $totals,
        ]);
    }
}
