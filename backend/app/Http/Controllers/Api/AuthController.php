<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
            try {
                // Validasi input
                $validated = $request->validate([
                    'nama_user'     => 'required|string|max:255',
                    'email_user'    => 'required|email|unique:users,email_user',
                    'password'      => 'required|min:6',
                    'no_telp_user'  => 'required|string|max:20',
                ]);
            } catch (ValidationException $e) {
                return response()->json([
                    'message' => 'Validasi gagal',
                    'errors'  => $e->errors()
                ], 422);
            }

        // Membuat user baru
        $user = User::create([
            'nama_user'     => $validated['nama_user'],
            'email_user'    => $validated['email_user'],
            'password'      => $validated['password'], // auto hashed by cast
            'no_telp_user'  => $validated['no_telp_user'],
            'is_admin'      => $validated['is_admin'] ?? false,
        ]);

        // Buat token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Register berhasil',
            'user'    => $user,
            'token'   => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email_user'    => 'required|email',
            'password' => 'required',
        ]);

        // Check if user exists & password is correct
        if (!Auth::attempt($request->only('email_user', 'password'))) {
            return response()->json([
                'message' => 'Email atau password salah'
            ], 401);
        }

        $user = User::where('email_user', $request->email_user)->first();

        // Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'user'    => $user,
            'token'   => $token
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil'
        ], 200);
    }
}
