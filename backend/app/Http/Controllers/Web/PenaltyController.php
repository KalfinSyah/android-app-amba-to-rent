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
    public function index()
    {
        $penalties = Penalty::with('order')->latest()->get();
        return view('penalties.index', compact('penalties'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $orders = Order::all();
        return view('penalties.create', compact('orders'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'jenis_penalty' => 'required|string',
            'biaya_penalty' => 'required|numeric',
            'foto_penalty' => 'required|image|max:2048',
            'status_penalty' => 'required|string'
        ]);

        $data = $request->only([
            'order_id',
            'jenis_penalty',
            'biaya_penalty',
            'status_penalty',
        ]);

        if ($request->hasFile('foto_penalty')) {
            $data['foto_penalty'] = $request->file('foto_penalty')->store('penalty', 'public');
        }

        Penalty::create($data);

        return redirect()->route('penalties.index')->with('success', 'Penalti berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $penalty = Penalty::with('order')->findOrFail($id);
        return view('penalties.show', compact('penalty'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $penalty = Penalty::findOrFail($id);
        $orders = Order::all();
        return view('penalties.edit', compact('penalty', 'orders'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'jenis_penalty' => 'required|string',
            'biaya_penalty' => 'required|numeric',
            'foto_penalty' => 'image|max:2048',
            'status_penalty' => 'required|string'
        ]);

        $penalty = Penalty::findOrFail($id);

        $data = $request->only([
            'order_id',
            'jenis_penalty',
            'biaya_penalty',
            'status_penalty',
        ]);

        if ($request->hasFile('foto_penalty')) {
            $data['foto_penalty'] = $request->file('foto_penalty')->store('penalty', 'public');
        }

        $penalty->update($data);

        return redirect()->route('penalties.show', $id)->with('success', 'Penalti berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $penalty = Penalty::findOrFail($id);
        $penalty->delete();

        return redirect()->route('penalties.index')->with('success', 'Penalti berhasil dihapus');
    }
}
