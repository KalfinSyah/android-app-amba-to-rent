<?php

namespace App\Http\Controllers\Web;

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
        $cars = Car::latest()->paginate(10);
        return view('cars.index', compact('cars'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('cars.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tahun_mobil' => 'required|integer',
            'merk_mobil' => 'required',
            'nama_mobil' => 'required',
            'jenis_mobil' => 'required',
            'tipe_mesin' => 'required',
            'tipe_transmisi' => 'required',
            'harga_sewa' => 'required|numeric',
            'foto_mobil' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status_mobil' => 'required|boolean',
        ]);

        Car::create(
            $request->only([
                'tahun_mobil',
                'merk_mobil',
                'nama_mobil',
                'jenis_mobil',
                'tipe_mesin',
                'tipe_transmisi',
                'harga_sewa',
                'foto_mobil',
                'status_mobil',
            ])
        );

        return redirect()->route('cars.index')->with('success', 'Mobil berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $car = Car::findOrFail($id);
        return view('cars.show', compact('car'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $car = Car::findOrFail($id);
        return view('cars.edit', compact('car'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'tahun_mobil' => 'required|integer',
            'merk_mobil' => 'required',
            'nama_mobil' => 'required',
            'jenis_mobil' => 'required',
            'tipe_mesin' => 'required',
            'tipe_transmisi' => 'required',
            'harga_sewa' => 'required|numeric',
            'foto_mobil' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status_mobil' => 'required|boolean',
        ]);

        $car = Car::findOrFail($id);
        $car->update(
            $request->only([
                'tahun_mobil',
                'merk_mobil',
                'nama_mobil',
                'jenis_mobil',
                'tipe_mesin',
                'tipe_transmisi',
                'harga_sewa',
                'foto_mobil',
                'status_mobil',
            ])
        );

        return redirect()->route('cars.index')->with('success', 'Mobil berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $car = Car::findOrFail($id);
        $car->delete();

        return redirect()->route('cars.index')->with('success', 'Mobil berhasil dihapus.');
    }
}
