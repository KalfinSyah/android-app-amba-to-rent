<x-app-layout>
    <div>
        <h2>Detail Order</h2>
        <p>ID Order: {{ $order->id }}</p>
        <p>Tanggal: {{ $order->tanggal_order }}</p>

        <h3>Data Mobil</h3>
        <p>Nama Mobil: {{ $order->car->nama_mobil }}</p>
        <p>Merk Mobil: {{ $order->car->merk_mobil }}</p>
        <p>Harga Sewa: Rp {{ number_format($order->car->harga_sewa, 0, ',', '.') }}</p>

        <h3>Data Pelanggan</h3>
        <p>Nama: {{ $order->user->nama_user }}</p>
        <p>Email: {{ $order->user->email_user }}</p>
        <p>No Telp: {{ $order->user->no_telp_user }}</p>
    </div>
    <div>
        <form action="{{ route('orders.update', $order->id) }}" method="POST" class="mt-4">
            @csrf
            @method('PUT')

            <label class="font-semibold">Ubah Status Pesanan</label>
            <select name="status_order" class="border rounded px-3 py-2 w-full mt-1">
                <option value="Pending"   {{ $order->status_order == 'Pending' ? 'selected' : '' }}>Pending</option>
                <option value="Ongoing"   {{ $order->status_order == 'Ongoing' ? 'selected' : '' }}>Ongoing</option>
                <option value="Cancelled"  {{ $order->status_order == 'Cancelled' ? 'selected' : '' }}>Cancelled</option>
                <option value="Completed" {{ $order->status_order == 'Completed' ? 'selected' : '' }}>Completed</option>
            </select>

            <button class="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700">
                Simpan Perubahan
            </button>
        </form>
    </div>
</x-app-layout>
