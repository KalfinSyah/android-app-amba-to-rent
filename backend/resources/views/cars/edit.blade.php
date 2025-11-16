<x-app-layout>
    <h2 class="text-xl font-semibold mb-4">Edit Mobil</h2>

    <form action="{{ route('cars.update', $car->id) }}" method="POST" enctype="multipart/form-data" class="space-y-4">
        @csrf
        @method('PUT')

        <div>
            <label>Tahun Mobil</label>
            <input type="number" name="tahun_mobil" value="{{ $car->tahun_mobil }}" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Merk Mobil</label>
            <input type="text" name="merk_mobil" value="{{ $car->merk_mobil }}" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Nama Mobil</label>
            <input type="text" name="nama_mobil" value="{{ $car->nama_mobil }}" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Jenis Mobil</label>
            <input type="text" name="jenis_mobil" value="{{ $car->jenis_mobil }}" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Tipe Mesin</label>
            <input type="text" name="tipe_mesin" value="{{ $car->tipe_mesin }}" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Tipe Transmisi</label>
            <input type="text" name="tipe_transmisi" value="{{ $car->tipe_transmisi }}" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Harga Sewa (Rp)</label>
            <input type="number" name="harga_sewa" value="{{ $car->harga_sewa }}" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Foto Mobil</label>
            <input type="file" name="foto_mobil" class="w-full border rounded p-2">

            @if ($car->foto_mobil)
                <img src="{{ asset('storage/mobil/' . $car->foto_mobil) }}" class="w-32 mt-2">
            @endif
        </div>

        <div>
            <label>Status Mobil</label>
            <select name="status_mobil" class="w-full border rounded p-2">
                <option value="0" {{ $car->status_mobil == 0 ? 'selected' : '' }}>Tersedia</option>
                <option value="1" {{ $car->status_mobil == 1 ? 'selected' : '' }}>Tidak Tersedia</option>
            </select>
        </div>

        <button class="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
    </form>
</x-app-layout>
