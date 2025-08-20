<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Settings\DashboardController;
use App\Http\Controllers\Settings\RelationController;
use App\Http\Controllers\Settings\TransactionController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// //dashboard
// Route::get('dashboard', [DashboardController::class, 'index'])
//     ->name('dashboard.index');

//dashboard (protected by auth and verified middleware)
Route::middleware(['auth', 'verified'])->group(function () {
    //dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])
        ->name('dashboard.index');
    //relations
    Route::get('relations', [RelationController::class, 'index'])
        ->name('relations.index');
    Route::get('relations/search', [RelationController::class, 'search'])
        ->name('relations.search');
    Route::post('relations', [RelationController::class, 'store'])
        ->name('relations.store');
    Route::post('relations/respond/{id}', [RelationController::class, 'respond'])
        ->name('relations.respond');

    //transactions
    Route::get('transactions', [TransactionController::class, 'index'])
        ->name('transactions.index');
    Route::post('transactions', [TransactionController::class, 'store'])
        ->name('transactions.store');
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
