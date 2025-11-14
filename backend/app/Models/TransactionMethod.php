<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionMethod extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Nama tabel yang terkait dengan model.
     *
     * @var string
     */
    protected $table = 'transaction_methods';

    /**
     * Menunjukkan apakah model harus memiliki timestamp.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Atribut yang dapat diisi secara massal.
     *
     * @var array
     */
    protected $fillable = [
        'nama_method',
    ];

    /**
     * Relasi one-to-many ke tabel Order.
     */
    public function orders()
    {
        // Parameter kedua adalah foreign key di tabel 'orders'
        // Parameter ketiga adalah primary key di tabel ini ('transaction_methods')
        return $this->hasMany(Order::class, 'method_id', 'id');
    }
}
