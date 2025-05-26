<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $fillable = ['product_category_id', 'name', 'price', 'stock', 'description',
        'image1', 'image2', 'image3', 'image4', 'image5'];
    public function category(){
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }

    public function orderDetails(){
        return $this->hasMany(OrderDetails::class);
    }
    public function reviews(){
        return $this->hasMany(ProductReview::class);
    }

    public function discounts(){
        return $this->hasMany(Discount::class);
    }


}
