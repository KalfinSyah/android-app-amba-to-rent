<x-app-layout>
    <div class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

            <h1 class="text-3xl font-bold text-gray-900 mb-8">
                Edit Mobil
            </h1>

            <form
                action="{{ route('cars.update', $car->id) }}"
                method="POST"
                enctype="multipart/form-data"
                class="bg-primary-container rounded-[24px] shadow px-8 py-4"
                id="formMobilEdit"
            >
                @csrf
                @method('PUT')

                {{-- GRID 2 KOLOM --}}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {{-- KOLOM KIRI --}}
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Tahun Mobil</label>
                            <input
                                type="number"
                                name="tahun_mobil"
                                value="{{ old('tahun_mobil', $car->tahun_mobil) }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894]
                                       text-sm focus:ring-primary focus:border-primary"
                            >
                        </div>

                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Merk Mobil</label>
                            <input
                                type="text"
                                name="merk_mobil"
                                value="{{ old('merk_mobil', $car->merk_mobil) }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894]
                                       text-sm focus:ring-primary focus:border-primary"
                            >
                        </div>

                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Nama Mobil</label>
                            <input
                                type="text"
                                name="nama_mobil"
                                value="{{ old('nama_mobil', $car->nama_mobil) }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894]
                                       text-sm focus:ring-primary focus:border-primary"
                            >
                        </div>

                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Jenis Mobil</label>
                            <input
                                type="text"
                                name="jenis_mobil"
                                value="{{ old('jenis_mobil', $car->jenis_mobil) }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894]
                                       text-sm focus:ring-primary focus:border-primary"
                            >
                        </div>
                    </div>

                    {{-- KOLOM KANAN --}}
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Tipe Mesin</label>
                            <input
                                type="text"
                                name="tipe_mesin"
                                value="{{ old('tipe_mesin', $car->tipe_mesin) }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894]
                                       text-sm focus:ring-primary focus:border-primary"
                            >
                        </div>

                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Tipe Transmisi</label>
                            <input
                                type="text"
                                name="tipe_transmisi"
                                value="{{ old('tipe_transmisi', $car->tipe_transmisi) }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894]
                                       text-sm focus:ring-primary focus:border-primary"
                            >
                        </div>

                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Harga Sewa (Rp)</label>
                            <input
                                type="number"
                                name="harga_sewa"
                                value="{{ old('harga_sewa', $car->harga_sewa) }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894]
                                       text-sm focus:ring-primary focus:border-primary"
                            >
                        </div>

                        {{-- STATUS MOBIL (SETENGAH LEBAR) --}}
                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Status Mobil</label>
                            <select
                                name="status_mobil"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894]
                                   text-sm focus:ring-primary focus:border-primary"
                            >
                                <option value="0" {{ old('status_mobil', $car->status_mobil) == 0 ? 'selected' : '' }}>
                                    Tersedia
                                </option>
                                <option value="1" {{ old('status_mobil', $car->status_mobil) == 1 ? 'selected' : '' }}>
                                    Tidak Tersedia
                                </option>
                            </select>
                        </div>

                        {{-- FOTO MOBIL (MIRIP EDIT PENALTY) --}}
                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Foto Mobil</label>

                            <div class="flex items-center gap-3">
                                {{-- INPUT FILE (disembunyikan) --}}
                                <input
                                    id="foto_mobil"
                                    type="file"
                                    name="foto_mobil"
                                    class="hidden"
                                    accept="image/*"
                                >

                                {{-- TEXTBOX PREVIEW --}}
                                <input
                                    id="foto_mobil_text"
                                    type="text"
                                    readonly
                                    placeholder="Pilih gambar..."
                                    value="{{ $car->foto_mobil ? basename($car->foto_mobil) : '' }}"
                                    class="flex-1 px-4 py-3 rounded-[20px] bg-white border border-[#E0A894]
                                           text-sm text-black"
                                >

                                {{-- BUTTON PILIH FILE --}}
                                <button
                                    type="button"
                                    onclick="document.getElementById('foto_mobil').click()"
                                    class="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow"
                                >
                                    Ganti
                                </button>
                            </div>

                            {{-- PREVIEW GAMBAR SAAT INI --}}
                            @if ($car->foto_mobil)
                                <div class="mt-3">
                                    <p class="text-xs text-[#7A4A3A] mb-1">Gambar saat ini:</p>
                                    <img
                                        src="{{ asset('storage/mobil/' . $car->foto_mobil) }}"
                                        alt="Foto mobil"
                                        class="w-32 h-32 object-cover rounded-[16px] border border-[#E0A894]"
                                    >
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </form>

            {{-- BUTTONS BAWAH --}}
            <div class="mt-6 flex justify-end gap-4">
                <a
                    href="{{ route('cars.index') }}"
                    class="px-6 py-2.5 rounded-full border border-primary text-primary bg-white text-sm font-semibold shadow"
                >
                    Batal
                </a>

                <button
                    type="submit"
                    form="formMobilEdit"
                    class="px-8 py-2.5 rounded-full bg-primary text-white text-sm font-semibold shadow"
                >
                    Simpan
                </button>
            </div>

        </div>
    </div>

    <script>
        const inputFotoMobilEdit = document.getElementById('foto_mobil');
        const textFotoMobilEdit = document.getElementById('foto_mobil_text');

        if (inputFotoMobilEdit) {
            inputFotoMobilEdit.addEventListener('change', () => {
                textFotoMobilEdit.value = inputFotoMobilEdit.files.length
                    ? inputFotoMobilEdit.files[0].name
                    : '';
            });
        }
    </script>
</x-app-layout>
