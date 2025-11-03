<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * Nama tabel yang terkait dengan model.
     *
     * @var string
     */
    protected $table = 'orders';

    /**
     * Primary key yang terkait dengan tabel.
     *
     * @var string
     */
    protected $primaryKey = 'order_id';

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
        'car_id',
        'method_id',
        'user_id',
        'tanggal_order',
        'jenis_sewa',
        'durasi_sewa',
        'tanggal_sewa',
        'tanggal_kembali_sewa',
        'tanggal_transaksi',
        'status_order',
        'total_harga',
    ];

    /**
     * Tipe data asli untuk atribut.
     *
     * @var array
     */
    protected $casts = [
        'tanggal_order' => 'datetime',
        'tanggal_sewa' => 'date',
        'tanggal_kembali_sewa' => 'date',
        'tanggal_transaksi' => 'datetime',
        'total_harga' => 'float',
        'jenis_sewa' => 'integer',
        'durasi_sewa' => 'integer',
        'car_id' => 'integer',
        'method_id' => 'integer',
        'user_id' => 'integer',
    ];

    // ----- RELASI "BELONGS TO" (MILIK) -----

    /**
     * Mendapatkan user yang memiliki order ini.
     */
    public function user()
    {
        // Parameter kedua: foreign key di tabel ini ('orders')
        // Parameter ketiga: primary key di tabel 'users'
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    /**
     * Mendapatkan mobil yang di-order.
     */
    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id', 'car_id');
    }

    /**
     * Mendapatkan metode transaksi yang digunakan.
     */
    public function transactionMethod()
    {
        return $this->belongsTo(TransactionMethod::class, 'method_id', 'method_id');
    }

    // ----- RELASI "HAS MANY" (MEMILIKI) -----

    /**
     * Mendapatkan semua penalti untuk order ini.
     */
    public function penalties()
    {
        return $this->hasMany(Penalty::class, 'order_id', 'order_id');
    }
}
