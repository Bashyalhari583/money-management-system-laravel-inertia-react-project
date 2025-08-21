<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\TransactionService;

class TransactionController extends Controller
{
  public function __construct(private TransactionService $srv) {}

  public function index(Request $request)
  {
    $filters = $request->only(['type', 'from', 'to', 'category']);
    $list = $this->srv->list($request->user()->id, $filters);
    $totals = $this->srv->totals($request->user()->id, $filters);

    return Inertia::render('settings/transactions', [
      'filters' => $filters,
      'transactions' => $list,
      'totals' => $totals,
    ]);
  }

  public function store(Request $request)
  {
    $data = $request->validate([
      'type' => 'required|in:income,expense',
      'category' => 'required|string|max:100',
      'amount' => 'required|numeric|min:0.01',
      'date' => 'required|date',
      'description' => 'nullable|string'
    ]);

    $this->srv->create($request->user()->id, $data);
    return back()->with('success', 'Transaction added');
  }
}
