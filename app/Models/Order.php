<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['customer_id', 'order_date', 'total_amount'];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function details() {
        return $this->hasMany(OrderDetails::class);
    }
    public function payment() {
        return $this->hasOne(Payment::class);
    }

    public function delivery() {
        return $this->hasOne();
    }



}
