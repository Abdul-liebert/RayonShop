<?php

namespace App\Http\Controllers\Admin\Product;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
{

return Inertia::render('admin/inventory', [
    'categoryp' => ProductCategory::all(),
]);

}

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_name'=>'required'
        ]);

        ProductCategory::create($validated);

        return redirect()->back()->with('success', 'Succesfully added category product');
    }

    /**
     * Display the specified resource.
     */
    public function update(Request $request,  $id)
    {

        $categoryp = ProductCategory::findOrFail($id);
         $validated = $request->validate([
            'category_name'=>'required'
        ]);

        $categoryp::update($validated);

        return redirect()->back()->with('success', 'Succesfully updated category product');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categoryp = ProductCategory::findOrFail($id);
        $categoryp->delete();

        return redirect()->back()->with('success', 'Succesfully delete category product');

;    }
}
