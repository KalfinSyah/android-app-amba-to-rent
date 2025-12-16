<x-app-layout>
    <div class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-semibold text-gray-900">Dashboard Operasional</h1>
                    <p class="text-sm text-gray-600">Hari ini: {{ $today->format('d M Y') }}</p>
                </div>
            </div>

            {{-- Quick Stats --}}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                <div class="rounded-xl bg-white p-4 shadow-sm border">
                    <div class="text-sm text-gray-500">Pending</div>
                    <div class="text-2xl font-semibold">{{ $pendingCount }}</div>
                </div>

                <div class="rounded-xl bg-white p-4 shadow-sm border">
                    <div class="text-sm text-gray-500">Ongoing</div>
                    <div class="text-2xl font-semibold">{{ $ongoingCount }}</div>
                </div>

                <div class="rounded-xl bg-white p-4 shadow-sm border">
                    <div class="text-sm text-gray-500">Pickup hari ini</div>
                    <div class="text-2xl font-semibold">{{ $pickupTodayCount }}</div>
                </div>

                <div class="rounded-xl bg-white p-4 shadow-sm border">
                    <div class="text-sm text-gray-500">Return hari ini</div>
                    <div class="text-2xl font-semibold">{{ $returnTodayCount }}</div>
                </div>

                <div class="rounded-xl bg-white p-4 shadow-sm border">
                    <div class="text-sm text-gray-500">Overdue</div>
                    <div class="text-2xl font-semibold text-red-600">{{ $overdueCount }}</div>
                </div>

                <div class="rounded-xl bg-white p-4 shadow-sm border">
                    <div class="text-sm text-gray-500">Mobil tersedia</div>
                    <div class="text-2xl font-semibold">{{ $carsAvailableCount }}</div>
                    <div class="text-xs text-gray-500">Tidak tersedia: {{ $carsUnavailableCount }}</div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {{-- Pending table --}}
                <div class="rounded-xl bg-white shadow-sm border">
                    <div class="p-4 border-b flex items-center justify-between">
                        <h2 class="font-semibold text-gray-900">Perlu Tindakan (Pending)</h2>
                        <a href="{{ route('orders.index') }}" class="text-sm text-primary hover:underline">Lihat semua</a>
                    </div>

                    <div class="p-4 overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="text-left text-gray-500">
                                <tr>
                                    <th class="py-2">Order</th>
                                    <th class="py-2">Pelanggan</th>
                                    <th class="py-2">Mobil</th>
                                    <th class="py-2">Sewa</th>
                                    <th class="py-2 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y">
                                @forelse ($pendingOrders as $order)
                                    <tr>
                                        <td class="py-3">#{{ $order->id }}</td>
                                        <td class="py-3">{{ $order->user?->nama_user ?? $order->user?->name ?? '-' }}</td>
                                        <td class="py-3">{{ $order->car?->nama_mobil ?? $order->car?->merk ?? '-' }}</td>
                                        <td class="py-3">
                                            {{ optional($order->tanggal_sewa)->format('d M') }}
                                            —
                                            {{ optional($order->tanggal_kembali_sewa)->format('d M') }}
                                        </td>
                                        <td class="py-3 text-right">
                                            <a href="{{ route('orders.show', $order) }}"
                                               class="inline-flex items-center rounded-lg px-3 py-1.5 border text-gray-700 hover:bg-gray-50">
                                                Detail
                                            </a>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5" class="py-6 text-center text-gray-500">Tidak ada pending order.</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>

                {{-- Ongoing table --}}
                <div class="rounded-xl bg-white shadow-sm border">
                    <div class="p-4 border-b flex items-center justify-between">
                        <h2 class="font-semibold text-gray-900">Sedang Berjalan (Ongoing)</h2>
                        <a href="{{ route('orders.index') }}" class="text-sm text-primary hover:underline">Lihat semua</a>
                    </div>

                    <div class="p-4 overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="text-left text-gray-500">
                                <tr>
                                    <th class="py-2">Order</th>
                                    <th class="py-2">Pelanggan</th>
                                    <th class="py-2">Mobil</th>
                                    <th class="py-2">Jatuh tempo</th>
                                    <th class="py-2 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y">
                                @forelse ($ongoingOrders as $order)
                                    @php
                                        $due = $order->tanggal_kembali_sewa;
                                        $isOverdue = $due && $due->lt($today);
                                        $isDueToday = $due && $due->isSameDay($today);
                                    @endphp
                                    <tr>
                                        <td class="py-3">#{{ $order->id }}</td>
                                        <td class="py-3">{{ $order->user?->nama_user ?? $order->user?->name ?? '-' }}</td>
                                        <td class="py-3">{{ $order->car?->nama_mobil ?? $order->car?->merk ?? '-' }}</td>
                                        <td class="py-3">{{ optional($order->tanggal_kembali_sewa)->format('d M Y') }}</td>
                                        <td class="py-3 text-right">
                                            @if ($isOverdue)
                                                <span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-50 text-red-700">
                                                    Overdue
                                                </span>
                                            @elseif ($isDueToday)
                                                <span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-amber-50 text-amber-700">
                                                    Due today
                                                </span>
                                            @else
                                                <span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700">
                                                    OK
                                                </span>
                                            @endif
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5" class="py-6 text-center text-gray-500">Tidak ada ongoing order.</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
