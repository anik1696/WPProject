<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'service_detail',
        'parts_replaced',
        'mechanic_name',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}