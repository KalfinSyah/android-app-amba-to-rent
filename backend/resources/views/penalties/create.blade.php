<x-app-layout>
    <div class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

            <h1 class="text-3xl font-bold text-gray-900 mb-8">
                Tambah Penalti
            </h1>

            <form action="{{ route('orders.penalties.store', $order->id) }}"
                  method="POST"
                  enctype="multipart/form-data"
                  class="bg-primary-container rounded-[24px] shadow px-8 py-4"
                  id="formPenalti">
                @csrf

                {{-- INPUT – JENIS PENALTI --}}

                {{-- GRID: BIAYA + FOTO --}}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <h2 class="text-2xl font-bold text-white col-span-3 py-1 text-center bg-primary rounded-[24px]">
                        Informasi Penalti
                    </h2>

                    <div class="space-y-2 col-span-3">
                        <label class="text-lg font-semibold text-[#4B1F14]">Jenis Penalti:</label>
                        <input type="text"
                               name="jenis_penalty"
                               placeholder="Contoh: Penyok, Lecet, dll"
                               class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm focus:ring-primary focus:border-primary"
                               required>
                    </div>

                    {{-- FOTO PENALTI (INPUT + BUTTON TERGABUNG) --}}
                    <div class="space-y-2 col-span-3">
                        <label class="text-lg font-semibold text-[#4B1F14]">Gambar Penalti:</label>

                        <div class="flex items-center gap-3">

                            {{-- INPUT FILE (disembunyikan) --}}
                            <input id="foto_penalty"
                                   type="file"
                                   name="foto_penalty"
                                   class="hidden"
                                   accept="image/*">

                            {{-- TEXTBOX PREVIEW PATH --}}
                            <input id="foto_penalty_text"
                                   type="text"
                                   readonly
                                   placeholder="Pilih gambar..."
                                   class="flex-1 px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm text-black">

                            {{-- TOMBOL PILIH FILE --}}
                            <button type="button"
                                    onclick="document.getElementById('foto_penalty').click()"
                                    class="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold shadow">
                                Upload
                            </button>
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold text-white col-span-3 py-1 text-center bg-primary rounded-[24px]">
                        Biaya Penalti
                    </h2>

                    {{-- BIAYA PENALTI --}}
                    <div class="space-y-2 col-span-3">
                        <label class="text-lg font-semibold text-[#4B1F14]">Biaya Penalti:</label>
                        <input type="number"
                               name="biaya_penalty"
                               class="w-full px-4 py-3 rounded-[20px] bg-white border border-[#E0A894] text-sm focus:ring-primary focus:border-primary"
                               placeholder="Masukkan biaya..." required>
                    </div>

                </div>
            </form>
            <div class="mt-6 flex justify-end gap-4">

                <a href="{{ route('orders.penalties.index', $order->id) }}"
                   class="px-6 py-2.5 rounded-full border border-primary text-primary bg-white text-sm font-semibold shadow">
                    Batal
                </a>

                <button type="submit"
                        form="formPenalti"
                        class="px-8 py-2.5 rounded-full bg-primary text-white text-sm font-semibold shadow">
                    Tambah
                </button>

            </div>
        </div>
    </div>
    <script>
        const inputFile = document.getElementById('foto_penalty');
        const textBox   = document.getElementById('foto_penalty_text');

        inputFile.addEventListener('change', () => {
            textBox.value = inputFile.files.length ? inputFile.files[0].name : '';
        });
    </script>
</x-app-layout>
