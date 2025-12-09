<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Penalty;
use Illuminate\Http\Request;

class PenaltyController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Penalty $penalty)
    {
        return response()->json([
            'message' => 'Penalty retrieved successfully.',
            'data' => $penalty
        ], 200);
    }

    public function showByOrderId($orderId)
    {
        $penalties = Penalty::where('order_id', $orderId)->get();

        return response()->json([
            'message' => 'Penalties retrieved successfully.',
            'data' => $penalties
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penalty $penalty)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Penalty $penalty)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Penalty $penalty)
    {
        //
    }
}
