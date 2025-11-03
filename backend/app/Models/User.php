<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * Nama tabel yang terkait dengan model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * Primary key yang terkait dengan tabel.
     *
     * @var string
     */
    protected $primaryKey = 'user_id';

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
        'nama_user',
        'email_user',
        'password',
        'no_telp_user',
        'is_admin'
    ];

    /**
     * Atribut yang harus disembunyikan saat serialisasi.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Tipe data asli untuk atribut.
     *
     * @var array
     */
    protected $casts = [
        'is_admin' => 'boolean',
        'no_telp_user' => 'string' // Sebaiknya simpan no telp sebagai string
    ];

    /**
     * Relasi one-to-many ke tabel Order.
     */
    public function orders()
    {
        // Parameter kedua: foreign key di tabel 'orders'
        // Parameter ketiga: primary key di tabel 'users'
        return $this->hasMany(Order::class, 'user_id', 'user_id');
    }
}
