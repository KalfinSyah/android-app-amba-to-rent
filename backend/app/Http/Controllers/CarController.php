<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    /**
     * Menampilkan daftar semua mobil.
     * GET /cars
     */
    public function index()
    {
        $cars = Car::where('status_mobil', true)->get();
        return response()->json($cars);
    }

    /**
     * Menyimpan mobil baru ke database.
     * POST /cars
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tahun_mobil' => 'required|string|max:10',
            'merk_mobil' => 'required|string|max:50',
            'nama_mobil' => 'required|string|max:100',
            'jenis_mobil' => 'required|string|max:30',
            'tipe_mesin' => 'required|string|max:20',
            'tipe_transmisi' => 'required|string|max:10',
            'harga_sewa' => 'required|numeric',
            'foto_mobil' => 'required|string|max:100',
            'status_mobil' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $car = Car::create($request->all());
        return response()->json($car, 201); // 201 Created
    }

    /**
     * Menampilkan satu mobil spesifik.
     * GET /cars/{id}
     */
    public function show($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        return response()->json($car);
    }

    /**
     * Memperbarui data mobil spesifik.
     * PUT /cars/{id}
     */
    public function update(Request $request, $id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        // Validasi bisa dibuat lebih fleksibel, 
        // misal tidak semua field 'required' saat update
        $validator = Validator::make($request->all(), [
            'tahun_mobil' => 'sometimes|required|string|max:10',
            'merk_mobil' => 'sometimes|required|string|max:50',
            'nama_mobil' => 'sometimes|required|string|max:100',
            'harga_sewa' => 'sometimes|required|numeric',
            'status_mobil' => 'sometimes|required|boolean',
            // ... tambahkan sisa field ...
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $car->update($request->all());
        return response()->json($car);
    }

    /**
     * Menghapus mobil dari database.
     * DELETE /cars/{id}
     */
    public function destroy($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found'], 404);
        }

        $car->delete();
        // 204 No Content, menandakan sukses tapi tidak ada data untuk dikembalikan
        return response()->json(null, 204);
    }
}
