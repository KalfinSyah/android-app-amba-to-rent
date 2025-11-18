<x-app-layout>
    <div class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {{-- HEADER --}}
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-3xl font-bold text-gray-900">
                    Daftar Penalti
                </h1>

                {{-- Tombol Tambah Penalti --}}
                <a
                    href="{{ route('penalties.create') }}"
                    class="inline-flex items-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white shadow hover:bg-amber-800"
                >
                    + Tambah Penalti
                </a>
            </div>

            {{-- FILTER BAR --}}
            <div class="mb-8 rounded-full bg-primary-container px-6 py-4 shadow flex items-center gap-4">
                <span class="font-semibold text-gray-800 mr-2">Urutkan:</span>

                <select
                    name="sort"
                    class="w-40 rounded-full border-none bg-rose-50 px-4 py-2 text-sm text-black shadow-inner focus:ring-0"
                >
                    <option value="recent">Terbaru</option>
                    <option value="amount">Nominal</option>
                    <option value="status">Status</option>
                </select>

                {{-- SEARCH --}}
                <div class="flex items-center gap-2 ml-auto">
                    <input
                        type="text"
                        name="q"
                        placeholder="Cari jenis penalti / order"
                        class="w-[300px] rounded-full border-none bg-rose-50 px-4 py-2 text-sm text-gray-700 shadow-inner focus:ring-0"
                    >
                    <button
                        type="submit"
                        class="flex items-center justify-center rounded-full bg-primary p-2 text-white shadow hover:bg-amber-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                        </svg>
                    </button>
                </div>
            </div>

            {{-- LIST PENALTI --}}
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                @forelse ($penalties as $penalty)
                    <div class="rounded-[24px] overflow-hidden bg-white shadow flex flex-col">

                        {{-- FOTO / GAMBAR PENALTI --}}
                        <div class="h-40 w-full">
                            @if (!empty($penalty->foto_penalty))
                                <img
                                    src="{{ asset('storage/penalties/' . $penalty->foto_penalty) }}"
                                    alt="Foto penalti {{ $penalty->jenis_penalty }}"
                                    class="w-full h-full object-cover"
                                >
                            @else
                                {{-- fallback gambar kalau belum ada foto --}}
                                <img
                                    src="/img/penalty-placeholder.jpg"
                                    alt="Penalti"
                                    class="w-full h-full object-cover"
                                >
                            @endif
                        </div>

                        {{-- BODY CARD (PEACH) --}}
                        <div class="bg-[#FAD1C3] px-4 pt-3 pb-5 flex-1 flex flex-col">

                            {{-- Judul + status pill --}}
                            <div class="flex items-start justify-between mb-4">
                                <div>
                                    <p class="text-lg font-semibold text-[#4B1F14]">
                                        {{ $penalty->jenis_penalty }}
                                    </p>
                                </div>

                                {{-- Status badge --}}
                                <span
                                    class="px-4 py-1 rounded-full text-xs font-semibold text-white
                                    @if($penalty->status_penalty === 'Terbayar')
                                        bg-green-600
                                    @else
                                        bg-red-700
                                    @endif"
                                >
                                    {{ $penalty->status_penalty }}
                                </span>
                            </div>

                            {{-- Harga --}}
                            <div class="mt-auto">
                                <p class="text-lg font-bold text-[#4B1F14] text-right">
                                    Rp{{ number_format($penalty->biaya_penalty, 0, ',', '.') }}
                                </p>
                            </div>
                        </div>

                        {{-- STRIP COKLAT DENGAN TOMBOL --}}
                        <div class="bg-primary px-4 py-3 flex items-center gap-3">
                            <a href="{{ route('penalties.show', $penalty->id) }}"
                               class="px-5 py-1.5 rounded-full bg-white text-gray-900 text-sm font-semibold shadow">
                                Detail
                            </a>

                            <a href="{{ route('penalties.edit', $penalty->id) }}"
                               class="px-5 py-1.5 rounded-full bg-secondary-button text-white text-sm font-semibold shadow">
                                Edit
                            </a>
                        </div>
                    </div>
                @empty
                    <p class="text-sm text-gray-600">Tidak ada penalti.</p>
                @endforelse
            </div>

        </div>
    </div>
</x-app-layout>
