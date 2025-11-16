<x-app-layout>
    <h2 class="text-xl font-semibold mb-4">Tambah Mobil</h2>

    <form action="{{ route('cars.store') }}" method="POST" enctype="multipart/form-data" class="space-y-4">
        @csrf

        <div>
            <label>Tahun Mobil</label>
            <input type="number" name="tahun_mobil" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Merk Mobil</label>
            <input type="text" name="merk_mobil" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Nama Mobil</label>
            <input type="text" name="nama_mobil" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Jenis Mobil</label>
            <input type="text" name="jenis_mobil" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Tipe Mesin</label>
            <input type="text" name="tipe_mesin" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Tipe Transmisi</label>
            <input type="text" name="tipe_transmisi" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Harga Sewa (Rp)</label>
            <input type="number" name="harga_sewa" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Foto Mobil</label>
            <input type="file" name="foto_mobil" class="w-full border rounded p-2">
        </div>

        <div>
            <label>Status Mobil</label>
            <select name="status_mobil" class="w-full border rounded p-2">
                <option value="0">Tersedia</option>
                <option value="1">Tidak Tersedia</option>
            </select>
        </div>

        <button class="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
    </form>
</x-app-layout>
