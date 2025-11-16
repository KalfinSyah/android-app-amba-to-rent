<x-app-layout>
    <h2 class="text-xl font-semibold mb-4">Daftar Penalti</h2>

    <a href="{{ route('penalties.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded">Tambah Penalti</a>

    <table class="w-full mt-4 border">
        <thead>
        <tr class="bg-gray-100">
            <th class="p-2 border">ID</th>
            <th class="p-2 border">Order ID</th>
            <th class="p-2 border">Jenis</th>
            <th class="p-2 border">Biaya</th>
            <th class="p-2 border">Status</th>
            <th class="p-2 border">Aksi</th>
        </tr>
        </thead>
        <tbody>
        @foreach ($penalties as $p)
            <tr>
                <td class="p-2 border">{{ $p->id }}</td>
                <td class="p-2 border">{{ $p->order->id }}</td>
                <td class="p-2 border">{{ $p->jenis_penalty }}</td>
                <td class="p-2 border">Rp {{ number_format($p->biaya_penalty, 0, ',', '.') }}</td>
                <td class="p-2 border">{{ ucfirst($p->status_penalty) }}</td>
                <td class="p-2 border">
                    <a href="{{ route('penalties.show', $p->id) }}" class="text-blue-600">Detail</a> |
                    <a href="{{ route('penalties.edit', $p->id) }}" class="text-yellow-600">Edit</a>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</x-app-layout>
