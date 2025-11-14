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
