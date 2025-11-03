<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionMethod extends Model
{
    use HasFactory;

    /**
     * Nama tabel yang terkait dengan model.
     *
     * @var string
     */
    protected $table = 'transaction_methods';

    /**
     * Primary key yang terkait dengan tabel.
     *
     * @var string
     */
    protected $primaryKey = 'method_id';

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
        return $this->hasMany(Order::class, 'method_id', 'method_id');
    }
}
