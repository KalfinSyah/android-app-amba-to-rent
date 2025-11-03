<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_user' => 'required|string|max:255',
            'email_user' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'no_telp_user' => 'required|string|max:15',
            'is_admin' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $data = $request->all();
        $data['password'] = Hash::make($request->password);
        $data['is_admin'] = $request->input('is_admin', 0);

        $user = User::create($data);
        return response()->json($user, 201);
    }
}
