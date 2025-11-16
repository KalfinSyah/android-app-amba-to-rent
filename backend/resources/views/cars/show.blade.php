<x-app-layout>
    <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">

        <h2 class="text-2xl font-semibold mb-4">Detail Mobil</h2>

        {{-- Foto Mobil --}}
        <div class="mb-4">
            <img src="{{ asset('storage/mobil/' . $car->foto_mobil) }}"
                 class="w-full max-h-64 object-cover rounded">
        </div>

        <div class="space-y-2">
            <p><strong>Nama Mobil:</strong> {{ $car->nama_mobil }}</p>
            <p><strong>Merk Mobil:</strong> {{ $car->merk_mobil }}</p>
            <p><strong>Tahun Mobil:</strong> {{ $car->tahun_mobil }}</p>
            <p><strong>Jenis Mobil:</strong> {{ $car->jenis_mobil }}</p>
            <p><strong>Tipe Mesin:</strong> {{ $car->tipe_mesin }}</p>
            <p><strong>Tipe Transmisi:</strong> {{ $car->tipe_transmisi }}</p>
            <p><strong>Harga Sewa:</strong> Rp {{ number_format($car->harga_sewa, 0, ',', '.') }}</p>

            <p><strong>Status:</strong>
                @if ($car->status_mobil)
                    <span class="text-red-600 font-semibold">Tidak Tersedia</span>
                @else
                    <span class="text-green-600 font-semibold">Tersedia</span>
                @endif
            </p>
        </div>

        {{-- Tombol --}}
        <div class="mt-6 flex gap-3">
            <a href="{{ route('cars.edit', $car->id) }}"
               class="bg-yellow-500 text-white px-4 py-2 rounded">
                Edit
            </a>

            <a href="{{ route('cars.index') }}"
               class="bg-gray-600 text-white px-4 py-2 rounded">
                Kembali
            </a>
        </div>

    </div>
</x-app-layout>
