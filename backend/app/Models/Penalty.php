<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penalty extends Model
{
    use HasFactory;

    /**
     * Nama tabel yang terkait dengan model.
     *
     * @var string
     */
    protected $table = 'penalties';

    /**
     * Primary key yang terkait dengan tabel.
     *
     * @var string
     */
    protected $primaryKey = 'penalty_id';

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
        'order_id',
        'jenis_penalty',
        'biaya_penalty',
        'foto_penalty',
        'status_penalty',
    ];

    /**
     * Tipe data asli untuk atribut.
     *
     * @var array
     */
    protected $casts = [
        'biaya_penalty' => 'float',
        'order_id' => 'integer',
    ];

    /**
     * Relasi "belongsTo" ke tabel Order.
     */
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'order_id');
    }
}
