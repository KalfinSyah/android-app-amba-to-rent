<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penalty extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Nama tabel yang terkait dengan model.
     *
     * @var string
     */
    protected $table = 'penalties';

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
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'biaya_penalty' => 'float',
            'order_id' => 'integer'
        ];
    }

    /**
     * Relasi "belongsTo" ke tabel Order.
     */
    public function order()
    {
        // Parameter kedua: foreign key di tabel ini ('penalties')
        // Parameter ketiga: primary key di tabel 'orders'
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
}
