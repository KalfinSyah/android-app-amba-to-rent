<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View
    {
        $today = Carbon::today();

        $pendingCount = Order::where('status_order', 'Pending')->count();
        $ongoingCount = Order::where('status_order', 'Ongoing')->count();

        $pickupTodayCount = Order::whereDate('tanggal_sewa', $today)
            ->whereIn('status_order', ['Pending', 'Ongoing'])
            ->count();

        $returnTodayCount = Order::whereDate('tanggal_kembali_sewa', $today)
            ->where('status_order', 'Ongoing')
            ->count();

        $overdueCount = Order::whereDate('tanggal_kembali_sewa', '<', $today)
            ->where('status_order', 'Ongoing')
            ->count();

        $carsAvailableCount = Car::where('status_mobil', 1)->count();
        $carsUnavailableCount = Car::where('status_mobil', 0)->count();

        $pendingOrders = Order::with(['user', 'car'])
            ->where('status_order', 'Pending')
            ->orderByDesc('tanggal_order')
            ->limit(10)
            ->get();

        $ongoingOrders = Order::with(['user', 'car'])
            ->where('status_order', 'Ongoing')
            ->orderBy('tanggal_kembali_sewa')
            ->limit(10)
            ->get();

        return view('dashboard', [
            'today' => $today,
            'pendingCount' => $pendingCount,
            'ongoingCount' => $ongoingCount,
            'pickupTodayCount' => $pickupTodayCount,
            'returnTodayCount' => $returnTodayCount,
            'overdueCount' => $overdueCount,
            'carsAvailableCount' => $carsAvailableCount,
            'carsUnavailableCount' => $carsUnavailableCount,
            'pendingOrders' => $pendingOrders,
            'ongoingOrders' => $ongoingOrders,
        ]);
    }
}
