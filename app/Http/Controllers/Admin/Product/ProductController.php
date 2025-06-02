<?php

namespace App\Http\Controllers\Admin\Product;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Http\Requests\Product\ProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return Inertia::render('inventory', [
            'products'=>$products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $data = $request->validated();

        for ($i = 1; $i <= 5; $i++) {
            $field = "image{$i}";
            if ($request->hasFile($field)) {
                $data[$field] = $request->file($field)->store('products', 'public');
            }
        }

        Product::create($data);

        return redirect()->route('products.index')->with('success', 'Product created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Optional, kalau butuh detail product bisa implementasi di sini
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $productedit = Product::findOrFail($id);
        return Inertia::render('products/edit', compact('productedit'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, string $id)
    {
        $product = Product::findOrFail($id);
        $data = $request->validated();

        for ($i = 1; $i <= 5; $i++) {
            $field = "image{$i}";
            if ($request->hasFile($field)) {
                // Hapus gambar lama jika ada
                if ($product->$field) {
                    Storage::disk('public')->delete($product->$field);
                }
                $data[$field] = $request->file($field)->store('products', 'public');
            }
        }

        $product->update($data);

        return redirect()->route('products.index')->with('success', 'Product updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        for ($i = 1; $i <= 5; $i++) {
            $field = "image{$i}";
            if ($product->$field) {
                Storage::disk('public')->delete($product->$field);
            }
        }

        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully');
    }
}
