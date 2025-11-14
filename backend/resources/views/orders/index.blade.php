<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            {{-- FORM FILTER --}}
            <form method="GET" action="{{ route('orders.index') }}" class="mb-4 flex flex-wrap gap-2 items-center">

                <select name="status" class="border rounded px-2 py-1">
                    <option value="">Semua status</option>
                    @foreach ($availableStatuses as $value => $label)
                        <option value="{{ $value }}" @selected(($status ?? null) === $value)>{{ $label }}</option>
                    @endforeach
                </select>

                <select name="sort_by" class="border rounded px-2 py-1">
                    <option value="order_date" @selected(($sortBy ?? '') === 'order_date')>Tanggal Pesanan</option>
                    <option value="rental_duration" @selected(($sortBy ?? '') === 'rental_duration')>Durasi Sewa</option>
                </select>

                <select name="sort_dir" class="border rounded px-2 py-1">
                    <option value="desc" @selected(($sortDir ?? '') === 'desc')>Terbaru dulu</option>
                    <option value="asc" @selected(($sortDir ?? '') === 'asc')>Terlama dulu</option>
                </select>

                <button type="submit" class="bg-blue-600 text-white px-3 py-1 rounded">
                    Filter
                </button>
            </form>

            {{-- TABEL DATA ORDERS --}}
            <div class="bg-white shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    @forelse ($orders as $order)
                        <div class="border-b last:border-b-0 py-3 flex justify-between items-center">
                            <div>
                                <div class="font-semibold">
                                    ID: {{ $order->id }} —
                                    {{ $order->tanggal_order?->format('d/m/Y') ?? $order->created_at->format('d/m/Y') }}
                                </div>
                                <div class="text-sm text-gray-600">
                                    Mobil: {{ $order->car->nama_mobil ?? '-' }}
                                    ({{ $order->car->merk_mobil ?? '-' }})
                                </div>
                                <div class="text-sm text-gray-600">
                                    Pelanggan: {{ $order->user->nama_user ?? '-' }}
                                </div>
                                <div class="text-sm text-gray-600">
                                    Durasi sewa: {{ $order->durasi_sewa ?? $order->rental_duration ?? '-' }}
                                </div>
                                <div class="text-sm">
                                    Status:
                                    <span class="px-2 py-0.5 rounded text-xs
                                        @if($order->status === 'pending') bg-yellow-100 text-yellow-800
                                        @elseif($order->status === 'on_rent') bg-blue-100 text-blue-800
                                        @elseif($order->status === 'completed') bg-green-100 text-green-800
                                        @elseif($order->status === 'cancelled') bg-red-100 text-red-800
                                        @else bg-gray-100 text-gray-800 @endif
                                    ">
                                        {{ ucfirst($order->status) }}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <a
                                    href="{{ route('orders.show', $order) }}"
                                    class="text-sm text-indigo-600 hover:underline"
                                >
                                    Detail
                                </a>
                            </div>
                        </div>
                    @empty
                        <p>Tidak ada pesanan.</p>
                    @endforelse

                    {{-- PAGINATION --}}
                    <div class="mt-4">
                        {{ $orders->links() }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
