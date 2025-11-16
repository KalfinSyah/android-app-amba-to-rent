<x-app-layout>
    <h2 class="text-2xl font-semibold mb-6">Daftar Mobil</h2>

    <div class="mb-4">
        <a href="{{ route('cars.create') }}"
           class="bg-blue-600 text-white px-4 py-2 rounded">
            Tambah Mobil
        </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @foreach ($cars as $car)
            <div class="bg-white shadow rounded p-4">

                {{-- Foto Mobil --}}
                <img src="{{ asset('storage/mobil/' . $car->foto_mobil) }}"
                     class="w-full h-40 object-cover rounded mb-3">

                <h3 class="text-lg font-semibold">{{ $car->nama_mobil }}</h3>
                <p class="text-gray-600">{{ $car->merk_mobil }} - {{ $car->tahun_mobil }}</p>

                {{-- Harga --}}
                <p class="mt-2 font-semibold">
                    Rp {{ number_format($car->harga_sewa, 0, ',', '.') }} / hari
                </p>

                {{-- Status --}}
                <p class="mt-1">
                    @if($car->status_mobil)
                        <span class="text-green-600 font-semibold">Tersedia</span>
                    @else
                        <span class="text-red-600 font-semibold">Tidak Tersedia</span>
                    @endif
                </p>

                {{-- Tombol Aksi --}}
                <div class="mt-4 flex gap-2">

                    {{-- Detail --}}
                    <a href="{{ route('cars.show', $car->id) }}"
                       class="bg-gray-700 text-white px-3 py-1 rounded text-sm">
                        Detail
                    </a>

                    {{-- Edit --}}
                    <a href="{{ route('cars.edit', $car->id) }}"
                       class="bg-yellow-500 text-white px-3 py-1 rounded text-sm">
                        Edit
                    </a>

                    {{-- Hapus --}}
                    <form action="{{ route('cars.destroy', $car->id) }}" method="POST" onsubmit="return confirm('Yakin hapus mobil ini?')">
                        @csrf
                        @method('DELETE')
                        <button class="bg-red-600 text-white px-3 py-1 rounded text-sm">
                            Hapus
                        </button>
                    </form>
                </div>
            </div>
        @endforeach
    </div>
</x-app-layout>
