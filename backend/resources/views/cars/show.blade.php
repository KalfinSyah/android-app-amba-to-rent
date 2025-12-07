<x-app-layout>
    <div class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <h1 class="text-3xl font-bold text-gray-900 mb-8">Detail Mobil</h1>

            <div class="grid grid-cols-12 gap-6">

                {{-- KARTU INFORMASI MOBIL --}}
                <div class="flex flex-col bg-primary-container rounded-[24px] overflow-hidden shadow col-span-7">

                    {{-- HEADER --}}
                    <div class="bg-primary text-white px-6 py-3 flex items-center justify-between">
                        <h2 class="text-lg font-semibold">Informasi Mobil</h2>

                        {{-- STATUS --}}
                        <span class="
                            px-4 py-1 rounded-full text-xs font-semibold text-white
                            @if(!$car->status_mobil)
                                bg-red-600
                            @else
                                bg-green-600
                            @endif
                        ">
                            {{ $car->status_mobil ? 'Available' : 'Unavailable' }}
                        </span>
                    </div>

                    {{-- BODY --}}
                    <div class="px-6 py-5 text-[#4B1F14] space-y-6">

                        {{-- Nama Mobil --}}
                        <div>
                            <p class="text-xs font-semibold mb-1">Nama Mobil:</p>
                            <p class="text-2xl font-extrabold">
                                {{ $car->nama_mobil }}
                            </p>
                        </div>

                        {{-- Info Mobil --}}
                        <div class="grid grid-cols-[auto,1fr] gap-y-3 gap-x-8 text-sm">

                            <p class="font-semibold">Merk Mobil:</p>
                            <p>{{ $car->merk_mobil }}</p>

                            <p class="font-semibold">Tahun Mobil:</p>
                            <p>{{ $car->tahun_mobil }}</p>

                            <p class="font-semibold">Jenis Mobil:</p>
                            <p>{{ $car->jenis_mobil }}</p>

                            <p class="font-semibold">Tipe Mesin:</p>
                            <p>{{ $car->tipe_mesin }}</p>

                            <p class="font-semibold">Tipe Transmisi:</p>
                            <p>{{ $car->tipe_transmisi }}</p>
                        </div>

                    </div>
                        {{-- FOOTER --}}
                    <div class="mt-auto mb-6">
                        {{-- Harga --}}
                        <div class="border-t border-[#E0A894] pt-4 m-6 flex items-center justify-between">
                            <p class="text-xl font-bold">Harga Sewa / Hari:</p>
                            <p class="text-2xl font-extrabold">
                                Rp{{ number_format($car->harga_sewa, 0, ',', '.') }}
                            </p>
                        </div>
                        <div class="bg-white px-6 py-4 mx-6 rounded-[25px]">
                            <div class="flex items-center justify-between">
                                <form action="{{ route('cars.toggleStatus', $car->id) }}" method="POST" class="inline-block">
                                    @csrf
                                    @method('PATCH')
                                    <button type="submit"
                                            class="inline-flex justify-center px-6 py-2 rounded-full
                                          bg-primary-button text-white text-sm font-semibold hover:bg-opacity-90 transition">
                                        {{ $car->status_mobil ? 'Ubah Status menjadi Unavailable' : 'Ubah Status menjadi Available' }}
                                    </button>
                                </form>
                                {{-- EDIT --}}
                                <div class="flex gap-3">
                                    <a href="{{ route('cars.edit', $car->id) }}"
                                       class="inline-flex justify-center px-6 py-2 rounded-full
                                        bg-secondary-button text-white text-sm font-semibold">
                                        Edit
                                    </a>
                                    <x-modal-confirm
                                        title="Hapus Mobil?"
                                        message="Data mobil yang dihapus tidak dapat dikembalikan. Yakin ingin melanjutkan?"
                                        :action="route('cars.destroy', $car->id)"
                                        method="DELETE"
                                        button-text="Ya, Hapus">
                                        Hapus
                                    </x-modal-confirm>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- KARTU GAMBAR MOBIL --}}
                <div class="bg-none rounded-[24px] overflow-hidden col-span-5 flex flex-col">

                    {{-- HEADER --}}
                    <div class="bg-primary text-white px-6 py-3">
                        <h2 class="text-lg font-semibold">Gambar Mobil</h2>
                    </div>

                    {{-- GAMBAR --}}
                    <div>
                        <img
                            src="{{ $car->foto_mobil }}"
                            class="w-full object-contain rounded-b-[20px]"
                        >
                    </div>

{{--                    --}}{{-- DELETE BUTTON (Opsional) --}}
{{--                    <div class="px-6 py-4 mt-auto">--}}
{{--                        <form action="{{ route('cars.destroy', $car->id) }}" method="POST">--}}
{{--                            @csrf--}}
{{--                            @method('DELETE')--}}
{{--                            <button--}}
{{--                                class="inline-flex justify-center px-6 py-2 rounded-full bg-red-600 text-white text-sm font-semibold">--}}
{{--                                Hapus Gambar--}}
{{--                            </button>--}}
{{--                        </form>--}}
{{--                    </div>--}}
                </div>

            </div>

        </div>
    </div>
</x-app-layout>
