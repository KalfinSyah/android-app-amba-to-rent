<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Penalty;
use Illuminate\Http\Request;

class PenaltyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'order_id'      => 'required|exists:orders,id',
            'jenis_penalty' => 'required|string',
            'biaya_penalty' => 'required|numeric|min:0',
            'status_penalty'=> 'required|string',
            'foto_penalty'  => 'required|image|mimes:jpg,jpeg,png|max:4096', // 4MB
        ]);
            
        // Upload file → disimpan ke public/images/penalty
        $file = $request->file('foto_penalty');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('images/penalty'), $fileName);

        // Simpan path ke database
        $path = 'images/penalty/' . $fileName;

        $penalty = Penalty::create([
            'order_id'      => $request->order_id,
            'jenis_penalty' => $request->jenis_penalty,
            'biaya_penalty' => $request->biaya_penalty,
            'foto_penalty'  => $path,
            'status_penalty'=> $request->status_penalty,
        ]);

        return response()->json([
            'message' => 'Penalty berhasil dibuat!',
            'data'    => $penalty,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Penalty $penalty)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penalty $penalty)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Penalty $penalty)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Penalty $penalty)
    {
        //
    }
}
