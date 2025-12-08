<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * Nama tabel yang terkait dengan model.
     *
     * @var string
     */
    protected $table = 'users';

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
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_admin' => 'boolean',
            'no_telp_user' => 'string',
            'password' => 'hashed'
        ];
    }

    /**
     * Relasi one-to-many ke tabel Order.
     */
    public function orders()
    {
        // Parameter kedua: foreign key di tabel 'orders'
        // Parameter ketiga: primary key di tabel ini ('users')
        return $this->hasMany(Order::class, 'user_id', 'id');
    }

    public function getAuthIdentifierName()
    {
        return 'email_user';
    }
}
