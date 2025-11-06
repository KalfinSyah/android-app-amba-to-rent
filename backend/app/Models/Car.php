<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Nama tabel yang terkait dengan model.
     *
     * @var string
     */
    protected $table = 'cars';

    /**
     * Primary key yang terkait dengan tabel.
     *
     * @var string
     */
    protected $primaryKey = 'car_id';

    /**
     * Menunjukkan apakah model harus memiliki timestamp (created_at & updated_at).
     *
     * @var bool
     */
    public $timestamps = false; // Database Anda tidak memiliki created_at/updated_at

    /**
     * Atribut yang dapat diisi secara massal (mass assignable).
     *
     * @var array
     */
    protected $fillable = [
        'tahun_mobil',
        'merk_mobil',
        'nama_mobil',
        'jenis_mobil',
        'tipe_mesin',
        'tipe_transmisi',
        'harga_sewa',
        'foto_mobil',
        'status_mobil',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'harga_sewa' => 'float',
            'status_mobil' => 'boolean'
        ];
    }

    /**
     * Relasi one-to-many ke tabel Order.
     */
    public function orders()
    {
        // Parameter kedua adalah foreign key di tabel 'orders'
        // Parameter ketiga adalah primary key di tabel ini ('cars')
        return $this->hasMany(Order::class, 'car_id', 'id');
    }
}
