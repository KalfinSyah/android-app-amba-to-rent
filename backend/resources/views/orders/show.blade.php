<x-app-layout>
    <div class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

            <h1 class="text-3xl font-bold text-gray-900 mb-8">
                Daftar Pesanan
            </h1>


            {{-- GRID ATAS: INFORMASI PESANAN & INFORMASI MOBIL --}}
            <div class="grid grid-cols-12 lg:grid-cols-12 gap-6">

                {{-- KARTU INFORMASI PESANAN --}}
                <div class="flex flex-col bg-primary-container rounded-[24px] overflow-hidden shadow col-span-7">

                    {{-- HEADER --}}
                    <div class="bg-primary text-white px-6 py-3 flex items-center justify-between">
                        <h2 class="text-lg font-semibold">Informasi Pesanan</h2>

                        {{-- Status --}}
                        <span class="
                                top-4 right-4 px-4 py-1 rounded-full text-xs font-semibold text-white
                                @switch($order->status_order)
                                    @case('Completed') bg-green-600 @break
                                    @case('Pending') bg-yellow-600 @break
                                    @case('Ongoing') bg-blue-600 @break
                                    @case('Declined') bg-red-600 @break
                                    @default bg-gray-600
                                @endswitch
                            ">
                                {{ ucfirst($order->status_order) }}
                            </span>
                    </div>

                    {{-- BODY --}}
                    <div class="px-6 py-5 text-[#4B1F14] space-y-6">

                        {{-- Bagian Pesanan --}}
                        <div>
                            <p class="text-xs font-semibold mb-1">Pesanan:</p>
                            <p class="text-2xl font-extrabold">
                                Pesanan #{{ $order->id }}
                            </p>
                        </div>

                        {{-- Tanggal / Durasi --}}
                        <div class="grid grid-cols-[auto,1fr] gap-y-2 gap-x-8 text-sm">
                            <p class="font-semibold">Tanggal Pemesanan:</p>
                            <p>{{ $order->tanggal_order?->format('d/m/Y') ?? '-' }}</p>

                            <p class="font-semibold">Tanggal Sewa:</p>
                            <p>
                                {{ $order->tanggal_sewa?->format('d/m/Y') ?? '-' }}
                                s/d
                                {{ $order->tanggal_kembali_sewa?->format('d/m/Y') ?? '-' }}
                            </p>

                            <p class="font-semibold">Durasi Sewa:</p>
                            <p>{{ $order->durasi_sewa }} Hari</p>
                        </div>

                        {{-- Pembayaran --}}
                        <div class="space-y-2 text-sm">
                            <p class="text-xs font-semibold">Pembayaran:</p>

                            <div class="grid grid-cols-[auto,1fr] gap-y-2 gap-x-8">
                                <p class="font-semibold">Tanggal Transaksi:</p>
                                <p>{{ $order->tanggal_transaksi?->format('d/m/Y') ?? '-' }}</p>

                                <p class="font-semibold">Metode Pembayaran:</p>
                                <p>{{ $order->transactionMethod->nama_method ?? '-' }}</p>
                            </div>
                        </div>

                    </div>

                    <dif class="mt-auto mb-6">
                        {{-- Harga (kiri label, kanan nilai) --}}
                        <div class="border-t border-[#E0A894] pt-4 m-6 flex items-center justify-between">
                            <p class="text-xl font-bold">Harga:</p>
                            <p class="text-2xl font-extrabold">
                                Rp{{ number_format($order->total_harga, 0, ',', '.') }}
                            </p>
                        </div>
                        {{-- FOOTER BUTTONS --}}
                        <div class="bg-white px-6 py-4 mx-6 rounded-[25px]">
                            <div class="flex flex-col sm:flex-row gap-3">
                                @if($order->status_order === 'Pending')
                                    <x-modal-confirm
                                        title="Tolak Pesanan?"
                                        message="Status Pesanan akan berubah menjadi Cancelled. Aksi ini tidak dapat dibatalkan. Lanjutkan?"
                                        :action="route('orders.update', ['order' => $order->id, 'status_order' => 'Declined'])"
                                        method="PUT"
                                        button-text="Ya, Lanjutkan">

                                        Tolak Pesanan
                                    </x-modal-confirm>

                                    <x-modal-confirm
                                        title="Terima Pesanan?"
                                        message="Status Pesanan akan berubah menjadi Ongoing. Aksi ini tidak dapat dibatalkan. Lanjutkan?"
                                        :action="route('orders.update', ['order' => $order->id, 'status_order' => 'Ongoing'])"
                                        method="PUT"
                                        button-text="Ya, Lanjutkan"
                                        type="primary">

                                        Terima Pesanan
                                    </x-modal-confirm>
                                @endif

                                @if($order->status_order === 'Ongoing')
                                    <x-modal-confirm
                                        title="Selesaikan Pesanan?"
                                        message="Status Pesanan akan berubah menjadi Completed. Aksi ini tidak dapat dibatalkan. Lanjutkan?"
                                        :action="route('orders.update', ['order' => $order->id, 'status_order' => 'Completed'])"
                                        method="PUT"
                                        button-text="Ya, Lanjutkan"
                                        type="success">

                                        Selesaikan Pesanan
                                    </x-modal-confirm>
                                @endif
                                <div class="mt-auto ml-auto">
                                    <a href="{{ route('orders.penalties.index', $order->id) }}"
                                       class="inline-flex justify-center px-6 py-2 rounded-full
                                      bg-red-600 text-white text-sm font-semibold">
                                        Penalti: {{ $order->penalties_count }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </dif>
                </div>

                {{-- KARTU INFORMASI MOBIL --}}
                <div class="bg-primary-container rounded-[24px] overflow-hidden shadow flex flex-col col-span-5">

                    {{-- HEADER --}}
                    <div class="bg-primary text-white px-6 py-3">
                        <h2 class="text-lg font-semibold">Informasi Mobil</h2>
                    </div>

                    {{-- FOTO MOBIL --}}
                    <div>
                        <img
                            src="{{ $order->car->foto_mobil }}"
                            alt="Foto {{ $order->car->nama_mobil }}"
                            class="w-full object-contain rounded-b-[20px]"
                        >
                    </div>

                    {{-- DETAIL MOBIL --}}
                    <div class="px-6 py-4 flex-1 flex flex-col">
                        <div>
                            <p class="text-2xl font-extrabold text-[#4B1F14]">
                                {{ $order->car->nama_mobil }}
                            </p>
                            <p class="text-sm text-[#7A4A3A] font-semibold">
                                {{ $order->car->tahun_mobil }}
                            </p>

                            <p class="mt-2 text-xs text-[#7A4A3A] leading-relaxed">
                                Tipe: {{ $order->car->jenis_mobil }}
                                | Transmisi: {{ $order->car->tipe_transmisi }}
                                | Mesin: {{ $order->car->tipe_mesin }}
                            </p>
                        </div>

                        <div class="mt-4">
                            <p class="text-sm font-semibold text-[#4B1F14]">
                                Harga Sewa / Hari:
                                <span class="font-bold">
                                    Rp{{ number_format($order->car->harga_sewa, 0, ',', '.') }}
                                </span>
                            </p>
                        </div>

                        <div class="mt-auto pt-4 text-right">
                            <a href="{{ route('cars.show', $order->car) }}"
                               class="inline-flex justify-center px-6 py-2 rounded-full
                                      bg-primary-button text-white text-sm font-semibold">
                                Detail
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {{-- AREA BAWAH: INFORMASI PELANGGAN --}}
            <div class="bg-primary-container rounded-[24px] overflow-hidden shadow">
                <div class="bg-primary text-white px-6 py-3">
                    <h2 class="text-lg font-semibold">Informasi Pelanggan</h2>
                </div>

                <div class="px-6 py-5 text-[#4B1F14] grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-10 text-sm">
                    <p>
                        <span class="font-semibold block">Nama Pelanggan:</span>
                        {{ $order->user->nama_user ?? '-' }}
                    </p>

                    <p>
                        <span class="font-semibold block">Email:</span>
                        {{ $order->user->email_user ?? '-' }}
                    </p>

                    <p>
                        <span class="font-semibold block">No. Telepon:</span>
                        {{ $order->user->no_telp_user ?? '-' }}
                    </p>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
