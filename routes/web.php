<?php

use App\Http\Controllers\Admin\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');



Route::get('/landing`', function () {
    return Inertia::render('user/landing');
})->name('landing');

// user Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('user/profile');
    })->name('profile');
});


// Admin Routes

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    Route::get('/inventory', function () {
        return Inertia::render('admin/inventory');
    })->name('inventory');
});

// End Routes

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
