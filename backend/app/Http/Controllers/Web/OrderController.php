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
        $status = $request->input('status');
        $sort = $request->input('sort', 'recent');
        $q = $request->input('q');

        $query = Order::query();

        if (!empty($status)) {
            $query->where('status_order', $status);
        }

        if ($sort === 'oldest') {
            $query->orderBy('tanggal_order', 'asc');
        } else {
            $query->orderBy('tanggal_order', 'desc');
        }

        if (!empty($q)) {
            $query->where('id', 'like', '%' . $q . '%');
        }

        $orders = $query
            ->paginate(6)
            ->withQueryString();

        $availableStatuses = [
            'Pending' => 'Pending',
            'Ongoing' => 'Ongoing',
            'Completed' => 'Completed',
            'Cancelled' => 'Cancelled',
        ];

        return view('orders.index', [
            'orders' => $orders,
            'status' => $status,
            'sort' => $sort,
            'q' => $q,
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'status_order' => 'required|in:Pending,Ongoing,Completed,Cancelled',
        ]);

        $order = Order::findOrFail($id);

        if ($request->status_order === 'cancelled' || $request->status_order === 'completed') {
            $order->mobil->status_mobil = 1;
            $order->mobil->save();
        }

        $order->status_order = $request->status_order;
        $order->save();

        return redirect()->route('orders.show', $id)->with('success', 'Status order berhasil diperbarui.');
    }
}
