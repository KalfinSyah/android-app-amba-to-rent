<x-app-layout>
    <div class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {{-- HEADER --}}
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-3xl font-bold text-gray-900">
                    Daftar Mobil
                </h1>

                {{-- Tombol Tambah Mobil --}}
                <a
                    href="{{ route('cars.create') }}"
                    class="inline-flex items-center rounded-full bg-amber-900 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-amber-800"
                >
                    + Tambah Mobil
                </a>
            </div>

            {{-- FILTER BAR --}}
            <form method="GET" action="{{ route('cars.index') }}">
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
                            <option value="{{ $value }}" {{ (string)$status === (string)$value ? 'selected' : '' }}>
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
                            placeholder="Cari nama mobil"
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

            {{-- LIST MOBIL --}}
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                @forelse ($cars as $car)
                    <div class="rounded-[24px] overflow-hidden bg-white shadow flex">

                        {{-- BAGIAN KIRI --}}
                        <div class="w-1/2 bg-primary-container flex flex-col">

                            {{-- AREA INFO --}}
                            <div class="px-6 py-4 flex-1">
                                <h2 class="text-2xl font-extrabold text-gray-900">{{ $car->nama_mobil }}</h2>
                                <p class="text-sm text-gray-800 mt-1">{{ $car->tahun_mobil }}</p>

                                <p class="text-sm text-gray-700 mt-4">
                                    <span class="font-semibold">Tipe:</span> {{ $car->jenis_mobil }}<br>
                                    <span class="font-semibold">Transmisi:</span> {{ $car->tipe_transmisi }}
                                </p>
                            </div>

                            {{-- STRIP COKLAT FULL WIDTH --}}
                            <div class="bg-primary p-4 flex items-center justify-between">
                                <a href="{{ route('cars.show', $car) }}"
                                   class="px-6 py-1.5 rounded-full bg-white text-gray-900 text-sm font-semibold shadow">
                                    Detail
                                </a>
                            </div>
                        </div>

                        {{-- BAGIAN GAMBAR --}}
                        <div class="w-1/2 relative">
                            {{-- Status Badge di kanan atas --}}
                            <span
                                class="absolute top-3 right-3 px-4 py-1 rounded-full text-xs font-semibold text-white
                                @if(!$car->status_mobil)
                                    bg-red-600
                                @else
                                    bg-green-600
                                @endif"
                            >
                                {{ $car->status_mobil ? 'Available' : 'Unavailable' }}
                            </span>

                            <img src="{{ $car->foto_mobil }}" class="w-full h-full object-cover"/>
                        </div>
                    </div>
                @empty
                    <p class="text-sm text-gray-600">Tidak ada mobil.</p>
                @endforelse
            </div>

        </div>
    </div>
</x-app-layout>
