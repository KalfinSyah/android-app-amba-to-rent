<x-app-layout>
    <h2 class="text-xl font-semibold mb-4">Detail Penalti</h2>

    <p><strong>ID Penalti:</strong> {{ $penalty->id }}</p>
    <p><strong>Order ID:</strong> {{ $penalty->order->id }}</p>
    <p><strong>Jenis:</strong> {{ ucfirst($penalty->jenis_penalty) }}</p>
    <p><strong>Biaya:</strong> Rp {{ number_format($penalty->biaya_penalty, 0, ',', '.') }}</p>
    <p><strong>Status:</strong> {{ ucfirst($penalty->status_penalty) }}</p>

    @if ($penalty->foto_penalty)
        <p class="mt-2"><strong>Foto:</strong></p>
        <img src="{{ asset('storage/' . $penalty->foto_penalty) }}" class="w-40 rounded shadow">
    @endif

    <a href="{{ route('penalties.edit', $penalty->id) }}" class="inline-block mt-4 bg-yellow-500 text-white px-4 py-2 rounded">
        Edit Penalti
    </a>
</x-app-layout>
