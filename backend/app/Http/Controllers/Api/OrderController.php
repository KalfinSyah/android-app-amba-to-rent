<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
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
        // Validate the request
        $validated = $request->validate([
            'car_id' => 'required|integer|exists:cars,id',
            'user_id' => 'required|integer|exists:users,id',
            'method_id' => 'required|integer|exists:transaction_methods,id',
            'tanggal_order' => 'required|date',
            'durasi_sewa' => 'required|integer|min:1',
            'tanggal_sewa' => 'required|date',
            'tanggal_kembali_sewa' => 'required|date',
            'tanggal_transaksi' => 'required|date',
            'status_order' => 'required|string',
            'total_harga' => 'required|numeric|min:0',
        ]);

        $order = Order::create($validated);

        return response()->json([
            'message' => 'Order berhasil dibuat',
            'order' => $order
        ], 201);
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
