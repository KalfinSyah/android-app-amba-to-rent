<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Penalty;
use Illuminate\Http\Request;

class PenaltyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Order $order, Request $request)
    {
        $status = $request->input('status');
        $sort = $request->input('sort', 'recent');
        $q = $request->input('q');

        $query = $order->penalties()->getQuery();

        if ($status !== null && $status !== '') {
            $query->where('status_penalty', $status);
        }

        if ($sort === 'oldest') {
            $query->orderBy('created_at', 'asc');
        } else {
            $query->orderBy('created_at', 'desc');
        }

        if (!empty($q)) {
            $query->where('jenis_penalty', 'like', '%' . $q . '%');
        }

        $penalties = $query
            ->paginate(6)
            ->withQueryString();

        $availableStatuses = [
            '1' => 'Paid',
            '0' => 'Unpaid',
        ];

        return view('penalties.index', [
            'penalties' => $penalties,
            'order' => $order,
            'status' => $status,
            'sort' => $sort,
            'q' => $q,
            'availableStatuses' => $availableStatuses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Order $order)
    {
        return view('penalties.create', compact('order'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Order $order)
    {
        $request->validate([
            'jenis_penalty' => 'required|string',
            'biaya_penalty' => 'required|numeric|min:0',
            'foto_penalty' => 'required|image|mimes:jpg,jpeg,png|max:4096', // 4MB
        ]);

        $data = [
            'jenis_penalty' => $request->jenis_penalty,
            'biaya_penalty' => $request->biaya_penalty,
            'status_penalty' => 0,
        ];

        if ($request->hasFile('foto_penalty')) {
            $path = $request->file('foto_penalty')->store('penalties', 'public');
            $data['foto_penalty'] = url('storage/' . $path);
        }

        $order->penalties()->create($data);

        return redirect()->route('orders.penalties.index', $order->id)
            ->with('success', 'Penalty berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order, Penalty $penalty)
    {
        return view('penalties.show', compact('order', 'penalty'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order, string $id)
    {
        $penalty = Penalty::findOrFail($id);
        $orders = Order::all();
        return view('penalties.edit', compact('penalty', 'order'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order, Penalty $penalty)
    {
        $request->validate([
            'jenis_penalty' => 'required|string',
            'biaya_penalty' => 'required|numeric',
            'foto_penalty' => 'nullable|image|max:2048',
            'status_penalty' => 'required|string'
        ]);

        $data = $request->only([
            'jenis_penalty',
            'biaya_penalty',
            'status_penalty',
        ]);

        if ($request->hasFile('foto_penalty')) {
            $data['foto_penalty'] = $request->file('foto_penalty')->store('penalty', 'public');
        }

        $penalty->update($data);

        return redirect()
            ->route('orders.penalties.show', [$order->id, $penalty->id])
            ->with('success', 'Penalti berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order, string $id)
    {
        $penalty = Penalty::findOrFail($id);
        $penalty->delete();

        return redirect()
            ->route('orders.penalties.index', $order->id)
            ->with('success', 'Penalti berhasil dihapus');
    }

    public function toggleStatus(Order $order, Penalty $penalty)
    {
        $penalty->update([
            'status_penalty' => !$penalty->status_penalty,
        ]);

        return back()->with('success', 'Status penalti berhasil diubah.');
    }
}
