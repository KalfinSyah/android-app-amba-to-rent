<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Car;
use Illuminate\Support\Facades\DB;
use App\Models\TransactionMethod;
use Illuminate\Http\Request;

class OrderController extends Controller
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
        $validated = $request->validate([
            'car_id' => 'required|integer|exists:cars,id',
            'user_id' => 'required|integer|exists:users,id',
            'method_id' => 'required|integer|exists:transaction_methods,id',

            'tanggal_order' => 'required|date',
            'durasi_sewa' => 'required|integer|min:1',

            'tanggal_sewa' => 'required|date',
            'tanggal_kembali_sewa' => 'required|date|after_or_equal:tanggal_sewa',

            'tanggal_transaksi' => 'required|date',
            'total_harga' => 'required|numeric|min:0',
        ]);

        $validated['status_order'] = 'Pending'; // Set status_order secara default

        $carId = (int) $validated['car_id'];
        $start = $validated['tanggal_sewa'];
        $end   = $validated['tanggal_kembali_sewa'];

        return DB::transaction(function () use ($validated, $carId, $start, $end) {

            // Lock baris mobil agar request paralel untuk mobil yang sama terserialisasi
            $car = Car::where('id', $carId)->lockForUpdate()->first();

            // Opsional: jika status_mobil false, langsung tolak
            if (!$car || !$car->status_mobil) {
                return response()->json([
                    'message' => 'Mobil tidak tersedia untuk dipesan.',
                    'error' => 'CAR_NOT_AVAILABLE',
                ], 409);
            }

            // Cek overlap dengan order aktif (samakan dengan available())
            $isOverlapping = Order::where('car_id', $carId)
                ->whereIn('status_order', ['Pending', 'Ongoing']) // sesuaikan jika perlu
                ->where('tanggal_sewa', '<=', $end)
                ->where('tanggal_kembali_sewa', '>=', $start)
                ->exists();

            if ($isOverlapping) {
                return response()->json([
                    'message' => 'Mobil tidak tersedia pada rentang tanggal yang dipilih. Silakan pilih tanggal atau mobil lain.',
                    'error' => 'CAR_NOT_AVAILABLE',
                ], 409);
            }

            // Jika aman, baru buat order
            $order = Order::create($validated);

            return response()->json([
                'message' => 'Order berhasil dibuat',
                'order' => $order,
            ], 201);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return response()->json([
            'message' => 'Data order dengan id ' . $order->id . ' berhasil diambil',
            'order' => $order
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }

    public function showByUserId($userId)
    {
        $orders = Order::where('user_id', $userId)->get();

        return response()->json([
            'message' => 'Data order untuk user ID ' . $userId . ' berhasil diambil',
            'orders' => $orders
        ], 200);
    }

    public function getMethods()
    {
        $methods = TransactionMethod::all();

        return response()->json([
            'message' => 'Data metode transaksi berhasil diambil',
            'orders' => $methods
        ], 200);
    }
}
