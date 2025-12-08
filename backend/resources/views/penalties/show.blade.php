<x-app-layout>
    <div class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <h1 class="text-3xl font-bold text-gray-900 mb-8">Detail Penalti</h1>

            {{-- GRID 2 KOLOM --}}
            <div class="grid grid-cols-12 gap-6">

                {{-- KARTU INFORMASI PENALTI --}}
                <div class="flex flex-col bg-primary-container rounded-[24px] overflow-hidden shadow col-span-7">

                    {{-- HEADER --}}
                    <div class="bg-primary text-white px-6 py-3 flex items-center justify-between">
                        <h2 class="text-lg font-semibold">Informasi Penalti</h2>

                        {{-- STATUS --}}
                        <span class="
                            px-4 py-1 rounded-full text-xs font-semibold text-white
                            @if($penalty->status_penalty === '1')
                                bg-green-600
                            @else
                                bg-red-700
                            @endif
                        ">
                            {{ $penalty->status_penalty ? 'Paid' : 'Unpaid' }}
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
                            <p class="font-semibold">Tanggal Penalti dibuat:</p>
                            <p>{{ $penalty->created_at?->format('d/m/Y') ?? '-' }}</p>
                            <p class="font-semibold">Tanggal Penalti diperbarui:</p>
                            <p>{{ $penalty->updated_at?->format('d/m/Y') ?? '-' }}</p>
                        </div>

                    </div>
                    <div class="mt-auto mb-6">
                        {{-- Harga --}}
                        <div class="border-t border-[#E0A894] pt-4 m-6 flex items-center justify-between">
                            <p class="text-xl font-bold">Harga:</p>
                            <p class="text-2xl font-extrabold">
                                Rp{{ number_format($penalty->biaya_penalty, 0, ',', '.') }}
                            </p>
                        </div>
                        {{-- FOOTER BUTTONS --}}
                        <div class="bg-white px-6 py-4 mx-6 rounded-[25px]">
                            <div class="flex flex-col sm:flex-row gap-3">

                                {{-- SELESAIKAN PENALTI --}}
                                <form action="{{ route('orders.penalties.toggleStatus', [$order->id, $penalty->id]) }}"
                                      method="POST" class="inline-block">
                                    @csrf
                                    @method('PATCH')
                                    <button type="submit"
                                            class="inline-flex justify-center px-6 py-2 rounded-full
                                          bg-primary-button text-white text-sm font-semibold hover:bg-opacity-90 transition">
                                        {{ $penalty->status_penalty ? 'Ubah Status menjadi Unpaid' : 'Ubah Status menjadi Paid' }}
                                    </button>
                                </form>

                                {{-- EDIT --}}
                                <a href="{{ route('orders.penalties.edit', [$order->id, $penalty->id]) }}"
                                   class="inline-flex justify-center px-6 py-2 rounded-full
                               bg-secondary-button text-white text-sm font-semibold ml-auto">
                                    Edit
                                </a>
                                <x-modal-confirm
                                    title="Hapus Penalti?"
                                    message="Data penalti yang dihapus tidak dapat dikembalikan. Yakin ingin melanjutkan?"
                                    :action="route('orders.penalties.destroy', [$order->id, $penalty->id])"
                                    method="DELETE"
                                    button-text="Ya, Hapus">
                                    Hapus
                                </x-modal-confirm>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- KARTU GAMBAR PENALTI --}}
                <div class="bg-none rounded-[24px] overflow-hidden shadow col-span-5 flex flex-col">

                    {{-- HEADER --}}
                    <div class="bg-primary text-white px-6 py-3">
                        <h2 class="text-lg font-semibold">Gambar Penalti</h2>
                    </div>

                    {{-- GAMBAR --}}
                    <div>
                        @if ($penalty->foto_penalty)
                            <img src="{{ $penalty->foto_penalty }}"
                                 alt="Foto Penalti"
                                 class="w-full object-contain rounded-b-[20px]"
                            >
                        @else
                            <p class="text-sm text-gray-600 italic">Tidak ada gambar.</p>
                        @endif
                    </div>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
