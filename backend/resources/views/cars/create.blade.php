<x-app-layout>
    <div class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

            <h1 class="text-3xl font-bold text-gray-900 mb-8">
                Tambah Mobil
            </h1>

            <form
                action="{{ route('cars.store') }}"
                method="POST"
                enctype="multipart/form-data"
                class="bg-primary-container rounded-[24px] shadow px-8 py-4 space-y-4"
                id="formMobil"
            >
                @csrf

                {{-- GRID 2 KOLOM UTAMA --}}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {{-- KOLOM KIRI --}}
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Tahun Mobil</label>
                            <input
                                type="number"
                                name="tahun_mobil"
                                value="{{ old('tahun_mobil') }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm
                                       focus:ring-primary focus:border-primary"
                            >
                        </div>

                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Merk Mobil</label>
                            <input
                                type="text"
                                name="merk_mobil"
                                value="{{ old('merk_mobil') }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm
                                       focus:ring-primary focus:border-primary"
                            >
                        </div>

                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Nama Mobil</label>
                            <input
                                type="text"
                                name="nama_mobil"
                                value="{{ old('nama_mobil') }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm
                                       focus:ring-primary focus:border-primary"
                            >
                        </div>

                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Jenis Mobil</label>
                            <input
                                type="text"
                                name="jenis_mobil"
                                value="{{ old('jenis_mobil') }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm
                                       focus:ring-primary focus:border-primary"
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
                                value="{{ old('tipe_mesin') }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm
                                       focus:ring-primary focus:border-primary"
                            >
                        </div>

                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Tipe Transmisi</label>
                            <input
                                type="text"
                                name="tipe_transmisi"
                                value="{{ old('tipe_transmisi') }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm
                                       focus:ring-primary focus:border-primary"
                            >
                        </div>

                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Harga Sewa (Rp)</label>
                            <input
                                type="number"
                                name="harga_sewa"
                                value="{{ old('harga_sewa') }}"
                                class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm
                                       focus:ring-primary focus:border-primary"
                            >
                        </div>

                        {{-- FOTO MOBIL (MIRIP GAYA FOTO PENALTI) --}}
                        <div class="space-y-2">
                            <label class="text-lg font-semibold text-[#4B1F14]">Foto Mobil</label>

                            <div class="flex items-center gap-3">
                                {{-- INPUT FILE (hidden) --}}
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
                                    class="flex-1 px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm text-black"
                                >

                                {{-- TOMBOL PILIH FILE --}}
                                <button
                                    type="button"
                                    onclick="document.getElementById('foto_mobil').click()"
                                    class="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow"
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- STATUS MOBIL (SETENGAH LEBAR) --}}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div class="space-y-2">
                        <label class="text-lg font-semibold text-[#4B1F14]">Status Mobil</label>
                        <select
                            name="status_mobil"
                            class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm
                                   focus:ring-primary focus:border-primary"
                        >
                            <option value="0" {{ old('status_mobil') === '0' ? 'selected' : '' }}>Tersedia</option>
                            <option value="1" {{ old('status_mobil') === '1' ? 'selected' : '' }}>Tidak Tersedia</option>
                        </select>
                    </div>
                    <div></div>
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
                    form="formMobil"
                    class="px-8 py-2.5 rounded-full bg-primary text-white text-sm font-semibold shadow"
                >
                    Simpan
                </button>
            </div>
        </div>
    </div>

    <script>
        const inputFotoMobil = document.getElementById('foto_mobil');
        const textFotoMobil  = document.getElementById('foto_mobil_text');

        if (inputFotoMobil) {
            inputFotoMobil.addEventListener('change', () => {
                textFotoMobil.value = inputFotoMobil.files.length
                    ? inputFotoMobil.files[0].name
                    : '';
            });
        }
    </script>
</x-app-layout>
