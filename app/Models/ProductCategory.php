<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $fillable = ['category_name'];
    public function products(){
        return $this->hasMany(Product::class, 'product_category_id');
    }
}
