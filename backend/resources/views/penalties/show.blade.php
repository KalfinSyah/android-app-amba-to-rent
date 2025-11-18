<x-app-layout>
    <div class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <h1 class="text-3xl font-bold text-gray-900 mb-8">Detail Penalti</h1>

            {{-- GRID 2 KOLOM --}}
            <div class="grid grid-cols-12 gap-6">

                {{-- KARTU INFORMASI PENALTI --}}
                <div class="bg-primary-container rounded-[24px] overflow-hidden shadow col-span-7">

                    {{-- HEADER --}}
                    <div class="bg-primary text-white px-6 py-3 flex items-center justify-between">
                        <h2 class="text-lg font-semibold">Informasi Penalti</h2>

                        {{-- STATUS --}}
                        <span class="
                            px-4 py-1 rounded-full text-xs font-semibold text-white
                            @if($penalty->status_penalty === 'Terbayar')
                                bg-green-600
                            @else
                                bg-red-700
                            @endif
                        ">
                            {{ ucfirst($penalty->status_penalty) }}
                        </span>
                    </div>

                    {{-- BODY --}}
                    <div class="px-6 py-5 text-[#4B1F14] space-y-6">

                        {{-- Judul Penalti --}}
                        <div>
                            <p class="text-xs font-semibold mb-1">Penalti:</p>
                            <p class="text-2xl font-extrabold">
                                {{ ucfirst($penalty->jenis_penalty) }}
                            </p>
                        </div>

                        {{-- Info Tanggal --}}
                        <div class="grid grid-cols-[auto,1fr] gap-y-2 gap-x-8 text-sm">
                            <p class="font-semibold">Tanggal Penalti:</p>
                            <p>{{ $penalty->tanggal_penalty?->format('d/m/Y') ?? '-' }}</p>
                        </div>

                        {{-- PEMBAYARAN --}}
                        <div class="space-y-2 text-sm">
                            <p class="text-xs font-semibold">Pembayaran:</p>

                            <div class="grid grid-cols-[auto,1fr] gap-y-2 gap-x-8">
                                <p class="font-semibold">Tanggal Transaksi:</p>
                                <p>{{ $penalty->tanggal_transaksi?->format('d/m/Y') ?? '-' }}</p>

                                <p class="font-semibold">Metode Pembayaran:</p>
                                <p>{{ $penalty->metode_pembayaran ?? '-' }}</p>
                            </div>
                        </div>

                        {{-- Harga --}}
                        <div class="border-t border-[#E0A894] pt-4 flex items-center justify-between">
                            <p class="text-xl font-bold">Harga:</p>
                            <p class="text-2xl font-extrabold">
                                Rp{{ number_format($penalty->biaya_penalty, 0, ',', '.') }}
                            </p>
                        </div>
                    </div>

                    {{-- FOOTER BUTTONS --}}
                    <div class="bg-white px-6 py-4 mx-6 mb-6 rounded-[25px]">
                        <div class="flex flex-col sm:flex-row gap-3">

                            {{-- SELESAIKAN PENALTI --}}
                            @if($penalty->status_penalty !== 'Terbayar')
                                <a href="#"
                                   class="inline-flex justify-center px-6 py-2 rounded-full
                                   bg-primary text-white text-sm font-semibold">
                                    Ubah Status menjadi Terbayar
                                </a>
                            @endif

                            {{-- EDIT --}}
                            <a href="{{ route('orders.penalties.edit', [$order->id, $penalty->id]) }}"
                               class="inline-flex justify-center px-6 py-2 rounded-full
                               bg-secondary-button text-white text-sm font-semibold ml-auto">
                                Edit
                            </a>
                            <form action="{{ route('orders.penalties.destroy', [$order->id, $penalty->id]) }}" method="POST"
                                  onsubmit="return confirm('Yakin ingin menghapus penalti ini?')">
                                @csrf
                                @method('DELETE')
                                <button
                                    class="inline-flex justify-center px-6 py-2 rounded-full
                                             bg-red-600 text-white text-sm font-semibold">
                                    Hapus
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {{-- KARTU GAMBAR PENALTI --}}
                <div class="bg-primary-container rounded-[24px] overflow-hidden shadow col-span-5 flex flex-col">

                    {{-- HEADER --}}
                    <div class="bg-primary text-white px-6 py-3">
                        <h2 class="text-lg font-semibold">Gambar Penalti</h2>
                    </div>

                    {{-- GAMBAR --}}
                    <div class="px-6 pt-4">
                        @if ($penalty->foto_penalty)
                            <img src="{{ asset('storage/' . $penalty->foto_penalty) }}"
                                 alt="Foto Penalti"
                                 class="w-full h-56 object-cover rounded-[20px]">
                        @else
                            <p class="text-sm text-gray-600 italic">Tidak ada gambar.</p>
                        @endif
                    </div>

                    {{-- DELETE BUTTON --}}
                    <div class="px-6 py-4 mt-auto">
                        <form action="{{ route('orders.penalties.destroy', [$order->id, $penalty->id]) }}" method="POST">
                            @csrf
                            @method('DELETE')
                            <button
                                class="inline-flex justify-center px-6 py-2 rounded-full
                                        bg-red-600 text-white text-sm font-semibold">
                                Hapus Gambar
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
