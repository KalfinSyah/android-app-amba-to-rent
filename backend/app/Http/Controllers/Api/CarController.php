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
            'cars' => $cars
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
    public function show(Car $car)
    {
        return response()->json([
            'message' => 'Data Mobil berhasil diambil',
            'cars' => $car,
        ], 200);
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

    /**
     * Only showing cars that are available at that period of time.
     */
    public function available(Request $request)
    {
        $request->validate([
            'tanggal_sewa' => 'required|date',
            'tanggal_kembali_sewa' => 'required|date|after_or_equal:tanggal_sewa',
            'search' => 'nullable|string',
        ]);

        $start = $request->tanggal_sewa;
        $end = $request->tanggal_kembali_sewa;
        $search = $request->input('search');

        $query = Car::query()
            ->where('status_mobil', true)
            ->whereDoesntHave('orders', function ($q) use ($start, $end) {
                $q->whereIn('status_order', ['Pending', 'Ongoing'])
                    ->where(function ($query) use ($start, $end) {
                        $query->where('tanggal_sewa', '<=', $end)
                            ->where('tanggal_kembali_sewa', '>=', $start);
                    });
            });

        if ($search) {
            $columns = [
                'nama_mobil',
                'merk_mobil',
                'tipe_mesin',
                'tipe_transmisi',
                'jenis_mobil',
            ];

            $query->where(function ($q) use ($search, $columns) {
                foreach ($columns as $col) {
                    $q->orWhere($col, 'like', "%{$search}%");
                }
            });
        }

        $cars = $query->get();

        return response()->json([
            'message' => 'Daftar mobil tersedia berhasil diambil',
            'cars' => $cars,
        ], 200);
    }
}
