<x-app-layout>
    <div class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

            <h1 class="text-3xl font-bold text-gray-900 mb-8">
                Edit Penalti
            </h1>

            {{-- FORM EDIT PENALTI --}}
            <form
                action="{{ route('orders.penalties.update', [$order->id, $penalty->id]) }}"
                method="POST"
                enctype="multipart/form-data"
                class="bg-primary-container rounded-[24px] shadow px-8 py-4"
                id="formPenaltiEdit"
            >
                @csrf
                @method('PUT')

                {{-- GRID: BIAYA + FOTO --}}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <h2 class="text-2xl font-bold text-white col-span-3 py-1 text-center bg-primary rounded-[24px]">
                        Informasi Penalti
                    </h2>

                    {{-- INPUT – JENIS PENALTI --}}
                    <div class="space-y-2 col-span-3">
                        <label class="text-lg font-semibold text-[#4B1F14]">Jenis Penalti:</label>
                        <input
                            type="text"
                            name="jenis_penalty"
                            value="{{ old('jenis_penalty', $penalty->jenis_penalty) }}"
                            placeholder="Contoh: Penyok, Lecet, dll"
                            class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm focus:ring-primary focus:border-primary"
                            required
                        >
                    </div>

                    {{-- PREVIEW GAMBAR SAAT INI --}}
                    @if ($penalty->foto_penalty)
                        <div class="space-y-2">
                            <p class="text-lg font-bold text-[#4B1F14] mb-1">Gambar Penalty saat ini:</p>
                            <img
                                src="{{ asset($penalty->foto_penalty) }}"
                                alt="Foto penalti"
                                class="w-auto h-auto object-cover rounded-[16px] border border-[#E0A894]"
                            >
                        </div>
                    @endif

                    {{-- FOTO PENALTI (INPUT + BUTTON TERGABUNG) --}}
                    <div class="space-y-2 col-span-2">
                        <label class="text-lg font-semibold text-[#4B1F14]">Ubah Gambar Penalti:</label>

                        <div class="flex items-center gap-3">
                            {{-- INPUT FILE (disembunyikan) --}}
                            <input
                                id="foto_penalty"
                                type="file"
                                name="foto_penalty"
                                class="hidden"
                                accept="image/*"
                            >

                            {{-- TEXTBOX PREVIEW PATH --}}
                            <input
                                id="foto_penalty_text"
                                type="text"
                                readonly
                                placeholder="Pilih gambar..."
                                value="{{ $penalty->foto_penalty ? basename($penalty->foto_penalty) : '' }}"
                                class="flex-1 px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm text-black"
                            >

                            {{-- TOMBOL PILIH FILE --}}
                            <button
                                type="button"
                                onclick="document.getElementById('foto_penalty').click()"
                                class="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow"
                            >
                                Ganti
                            </button>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold text-white col-span-3 py-1 text-center bg-primary rounded-[24px]">
                        Biaya dan Status Penalti
                    </h2>

                    {{-- BIAYA PENALTI --}}
                    <div class="space-y-2 col-span-2">
                        <label class="text-lg font-semibold text-[#4B1F14]">Biaya Penalti:</label>
                        <input
                            type="number"
                            name="biaya_penalty"
                            value="{{ old('biaya_penalty', $penalty->biaya_penalty) }}"
                            class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm focus:ring-primary focus:border-primary"
                            placeholder="Masukkan biaya..."
                            required
                        >
                    </div>

                    {{-- STATUS PENALTI --}}
                    <div class="space-y-2">
                        <label class="text-lg font-semibold text-[#4B1F14]">Status Penalti:</label>
                        <select
                            name="status_penalty"
                            class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm focus:ring-primary focus:border-primary"
                            required
                        >
                            <option
                                value="Belum Dibayar" {{ old('status_penalty', $penalty->status_penalty) === 'Belum Dibayar' ? 'selected' : '' }}>
                                Belum Dibayar
                            </option>
                            <option
                                value="Terbayar" {{ old('status_penalty', $penalty->status_penalty) === 'Terbayar' ? 'selected' : '' }}>
                                Terbayar
                            </option>
                        </select>
                    </div>
                </div>

            </form>

            {{-- BUTTONS BAWAH --}}
            <div class="mt-6 flex justify-end gap-4">
                <a
                    href="{{ route('orders.penalties.index', $order->id) }}"
                    class="px-6 py-2.5 rounded-full border border-primary text-primary bg-white text-sm font-semibold shadow"
                >
                    Batal
                </a>

                <button
                    type="submit"
                    form="formPenaltiEdit"
                    class="px-8 py-2.5 rounded-full bg-primary text-white text-sm font-semibold shadow"
                >
                    Simpan
                </button>
            </div>

        </div>
    </div>

    <script>
        const inputFileEdit = document.getElementById('foto_penalty');
        const textBoxEdit = document.getElementById('foto_penalty_text');

        if (inputFileEdit) {
            inputFileEdit.addEventListener('change', () => {
                textBoxEdit.value = inputFileEdit.files.length ? inputFileEdit.files[0].name : '';
            });
        }
    </script>
</x-app-layout>
