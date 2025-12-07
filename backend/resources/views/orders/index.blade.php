<x-app-layout>
    <div class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <h1 class="text-3xl font-bold text-gray-900 mb-8">
                Daftar Pesanan
            </h1>

            <form method="GET" action="{{ route('orders.index') }}">
                <div class="mb-8 rounded-full bg-primary-container px-6 py-4 shadow flex items-center gap-4">
                    <span class="font-semibold text-gray-800 mr-2">Urutkan:</span>

                    <select
                        name="sort"
                        class="w-40 rounded-full border-none bg-rose-50 px-4 py-2 text-sm text-black shadow-inner focus:ring-0"
                        onchange="this.form.submit()"
                    >
                        <option value="recent" {{ $sort === 'recent' ? 'selected' : '' }}>Terbaru</option>
                        <option value="oldest" {{ $sort === 'oldest' ? 'selected' : '' }}>Terlama</option>
                    </select>

                    <span class="font-semibold text-gray-800 mr-2">Filter Status:</span>
                    <select
                        name="status"
                        class="w-40 rounded-full border-none bg-white px-4 py-2 text-sm text-black shadow-inner focus:ring-0"
                        onchange="this.form.submit()"
                    >
                        <option value="">Semua Status</option>
                        @foreach ($availableStatuses as $value => $label)
                            <option value="{{ $value }}" {{ $status === $value ? 'selected' : '' }}>
                                {{ $label }}
                            </option>
                        @endforeach
                    </select>

                    {{-- SEARCH --}}
                    <div class="flex items-center gap-2 ml-auto">
                        <input
                            type="text"
                            name="q"
                            value="{{ request('q') }}"
                            placeholder="Cari no pesanan"
                            class="w-[300px] rounded-full border-none bg-rose-50 px-4 py-2 text-sm text-gray-700 shadow-inner focus:ring-0"
                        >
                        <button
                            type="submit"
                            class="flex items-center justify-center rounded-full bg-amber-900 p-2 text-white shadow hover:bg-amber-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
                @forelse ($orders as $order)

                    <div class="rounded-[24px] overflow-hidden shadow bg-white flex flex-col">

                        {{-- BAGIAN ATAS PEACH --}}
                        <div class="bg-primary-container px-6 py-4 relative">

                            {{-- Status Badge --}}
                            <span class="
                                absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-semibold text-white
                                @switch($order->status_order)
                                    @case('Completed') bg-green-600 @break
                                    @case('Pending') bg-yellow-600 @break
                                    @case('Ongoing') bg-blue-600 @break
                                    @case('Declined') bg-red-600 @break
                                    @default bg-gray-600
                                @endswitch
                            ">
                                {{ ucfirst($order->status_order) }}
                            </span>

                            {{-- Judul + tanggal --}}
                            <h2 class="text-2xl font-extrabold text-gray-900">
                                Pesanan #{{ $order->id }}
                            </h2>
                            <p class="text-sm text-gray-700">
                                {{ $order->tanggal_order?->format('d F Y') ?? '-' }}
                            </p>

                            {{-- MASA SEWA --}}
                            <div class="mt-6">
                                <p class="text-sm font-semibold text-gray-800 mb-1">Masa Sewa:</p>
                                <div class="flex items-center justify-between w-full">
                                    <div class="flex items-center gap-2">
                                        <input type="text"
                                               value="{{ $order->tanggal_mulai ?? '08/11/2025' }}"
                                               class="rounded-full bg-white px-2 py-1.5 text-xs text-gray-900 shadow-inner border-none w-24 text-center"
                                               disabled>

                                        <span class="text-lg font-bold">-</span>

                                        <input type="text"
                                               value="{{ $order->tanggal_selesai ?? '11/11/2025' }}"
                                               class="rounded-full bg-white px-2 py-1.5 text-xs text-gray-900 shadow-inner border-none w-24 text-center"
                                               disabled>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        {{-- HARGA --}}
                                        <span class="text-lg font-bold text-gray-900 text-right">
                                        Rp{{ number_format($order->total_harga, 0, ',', '.') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- BAGIAN BAWAH COKLAT (FULL WIDTH) --}}
                        <div class="bg-primary p-4 flex items-center justify-between">

                            {{-- TOMBOL DETAIL --}}
                            <a href="{{ route('orders.show', $order) }}"
                               class="px-6 py-1.5 rounded-full bg-white text-gray-900 text-sm font-semibold shadow">
                                Detail
                            </a>

                            {{-- TOMBOL PENALTI --}}
                            <a href="{{ route('orders.penalties.index', $order->id) }}"
                               class="px-6 py-1.5 rounded-full bg-red-700 text-white text-sm font-semibold shadow hover:bg-red-800">
                                Penalti
                            </a>
                        </div>
                    </div>
                @empty
                    <p class="text-gray-600">Tidak ada pesanan.</p>
                @endforelse
            </div>

            {{-- PAGINATION --}}
            @if ($orders->hasPages())
                <div class="mt-6">
                    {{ $orders->links() }}
                </div>
            @endif
        </div>
    </div>
</x-app-layout>
