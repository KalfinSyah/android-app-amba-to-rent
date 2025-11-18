<x-app-layout>
    <h2 class="text-xl font-semibold mb-4">Tambah Penalti</h2>

    <form action="{{ route('orders.penalties.store', $order->id) }}" method="POST" enctype="multipart/form-data" class="space-y-4">
        @csrf

        <div>
            <label>Jenis Penalti</label>
            <select name="jenis_penalty" class="border rounded w-full p-2">
                <option value="terlambat">Terlambat</option>
                <option value="kerusakan">Kerusakan</option>
            </select>
        </div>

        <div>
            <label>Biaya Penalti</label>
            <input type="number" name="biaya_penalty" class="border rounded w-full p-2">
        </div>

        <div>
            <label>Foto Penalti</label>
            <input type="file" name="foto_penalty" class="border rounded w-full p-2">
        </div>

        <button class="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
    </form>
</x-app-layout>
