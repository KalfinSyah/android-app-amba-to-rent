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
        $penalty = $request->input('penalty');
        $sort = $request->input('sort', 'recent');
        $q = $request->input('q');

        $query = Order::query();

        if (!empty($status)) {
            $query->where('status_order', $status);
        }

        if (!empty($penalty)) {
            if ($penalty === 'Terselesaikan') {
                $query->doesntHave('penalties');
            } elseif ($penalty === 'Belum Terselesaikan') {
                $query->has('penalties');
            }
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
            ->withCount('penalties')
            ->paginate(6)
            ->withQueryString();

        $availableStatuses = [
            'Pending' => 'Status Pending',
            'Ongoing' => 'Status Ongoing',
            'Completed' => 'Status Completed',
            'Declined' => 'Status Declined',
        ];

        $availablePenalties = [
            'Terselesaikan' => 'Penalti Terselesaikan',
            'Belum Terselesaikan' => 'Penalti Belum Terselesaikan',
        ];

        return view('orders.index', [
            'orders' => $orders,
            'status' => $status,
            'penalty' => $penalty,
            'sort' => $sort,
            'q' => $q,
            'availableStatuses' => $availableStatuses,
            'availablePenalties' => $availablePenalties,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with('user', 'car', 'transactionMethod')->withCount('penalties')->findOrFail($id);
        return view('orders.show', compact('order'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'status_order' => 'required|in:Pending,Ongoing,Completed,Declined',
        ]);

        $order = Order::findOrFail($id);
        $newStatus = $request->status_order;

        if (in_array($newStatus, ['Completed', 'Declined'])) {
            if ($order->mobil) {
                $order->mobil->status_mobil = 1;
                $order->mobil->save();
            }
        }

        $order->status_order = $request->status_order;
        $order->save();

        return redirect()->route('orders.show', $id)->with('success', 'Status order berhasil diperbarui.');
    }
}
