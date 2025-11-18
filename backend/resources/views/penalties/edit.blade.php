<x-app-layout>
    <h2 class="text-xl font-semibold mb-4">Edit Penalti</h2>

    <form action="{{ route('orders.penalties.update', [$order->id, $penalty->id]) }}" method="POST" enctype="multipart/form-data" class="space-y-4">
        @csrf
        @method('PUT')

        <div>
            <label>Order</label>
            <input type="text" value="Order #{{ $penalty->order->id }}" class="border p-2 w-full bg-gray-100" disabled>
        </div>

        <div>
            <label>Jenis Penalti</label>
            <select name="jenis_penalty" class="border rounded w-full p-2">
                <option value="terlambat" {{ $penalty->jenis_penalty == 'terlambat' ? 'selected' : '' }}>Terlambat</option>
                <option value="kerusakan" {{ $penalty->jenis_penalty == 'kerusakan' ? 'selected' : '' }}>Kerusakan</option>
            </select>
        </div>

        <div>
            <label>Biaya Penalti</label>
            <input type="number" name="biaya_penalty" value="{{ $penalty->biaya_penalty }}" class="border rounded w-full p-2">
        </div>

        <div>
            <label>Foto Penalti</label>
            <input type="file" name="foto_penalty" class="border rounded w-full p-2">

            @if ($penalty->foto_penalty)
                <img src="{{ asset('storage/' . $penalty->foto_penalty) }}" class="w-32 mt-2 rounded">
            @endif
        </div>

        <div>
            <label>Status Penalti</label>
            <select name="status_penalty" class="border rounded w-full p-2">
                <option value="pending" {{ $penalty->status_penalty == 'pending' ? 'selected' : '' }}>Pending</option>
                <option value="dibayar" {{ $penalty->status_penalty == 'dibayar' ? 'selected' : '' }}>Dibayar</option>
            </select>
        </div>

        <button class="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
    </form>
</x-app-layout>
