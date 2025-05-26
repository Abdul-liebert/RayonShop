<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    protected $fillable = ['category_discount_id', 'product_id','percentage','start_date','end_date'];

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
