<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status   = $request->input('status');
        $sortBy   = $request->input('sort_by', 'tanggal_order');
        $sortDir  = $request->input('sort_dir', 'desc');

        $query = Order::query();

        if ($status) {
            $query->where('status_order', $status);
        }

        $allowedSorts = ['tanggal_order', 'durasi_sewa'];
        if (! in_array($sortBy, $allowedSorts, true)) {
            $sortBy = 'tanggal_order';
        }

        $sortDir = $sortDir === 'asc' ? 'asc' : 'desc';

        $orders = $query
            ->orderBy($sortBy, $sortDir)
            ->paginate(10)
            ->withQueryString();

        $availableStatuses = [
            'pending'   => 'Pending',
            'on_rent'   => 'Sedang Disewa',
            'completed' => 'Selesai',
            'cancelled' => 'Dibatalkan',
        ];

        return view('orders.index', [
            'orders'            => $orders,
            'status'            => $status,
            'sortBy'            => $sortBy,
            'sortDir'           => $sortDir,
            'availableStatuses' => $availableStatuses,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with('user', 'car', 'transactionMethod')->findOrFail($id);
        return view('orders.show', compact('order'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }
}
