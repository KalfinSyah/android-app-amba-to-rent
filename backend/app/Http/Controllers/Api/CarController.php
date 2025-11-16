<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = Car::all();

        return response()->json([
            'message' => 'Daftar mobil berhasil diambil',
            'cars'    => $cars
        ], 200);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function showById(Car $car)
    {
        return response()->json([
            'message' => 'Data mobil ' . $car->nama_mobil . ' berhasil diambil',
            'car' => $car
        ]);
    }
    public function showByName($nama_mobil)
    {
        $car = Car::where('nama_mobil', $nama_mobil)->first();

        if ($car) {
            return response()->json([
                'message' => 'Data mobil ' . $car->nama_mobil . ' berhasil diambil',
                'car' => $car
            ]);
        } else {
            return response()->json([
                'message' => 'Mobil dengan nama ' . $nama_mobil . ' tidak ditemukan'
            ], 404);
        }
    }
    public function showByBrand($merk_mobil)
    {
        $cars = Car::where('merk_mobil', $merk_mobil)->get();

        if ($cars->isNotEmpty()) {
            return response()->json([
                'message' => 'Data mobil dengan merk ' . $merk_mobil . ' berhasil diambil',
                'cars' => $cars
            ]);
        } else {
            return response()->json([
                'message' => 'Mobil dengan merk ' . $merk_mobil . ' tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Car $car)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Car $car)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Car $car)
    {
        //
    }
}
