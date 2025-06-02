<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\Product\ProductCategoryController;
use App\Http\Controllers\Admin\Product\ProductController;
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

    // Product CRUD
       // Tampilkan list produk
Route::get('/products', [ProductController::class, 'index'])->name('products.index');

// Form tambah produk
Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');

// Simpan produk baru
Route::post('/products', [ProductController::class, 'store'])->name('products.store');

// Form edit produk
Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');

// Update produk
Route::put('/products/{id}', [ProductController::class, 'update'])->name('products.update');

// Hapus produk
Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

// Product Category Id
Route::get('/ProductCategory', [ProductCategoryController::class, 'index'])->name('categoryp.index');
Route::post('/ProductCategory', [ProductCategoryController::class, 'store'])->name('categoryp.store');
Route::put('/ProductCategory/{id}', [ProductCategoryController::class, 'update'])->name('categoryp.update');
Route::delete('/ProductCategory/{id}', [ProductCategoryController::class, 'destroy'])->name('categoryp.destroy');
});



// End Routes

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
