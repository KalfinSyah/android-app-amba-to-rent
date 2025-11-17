<x-app-layout>
    <div class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {{-- HEADER --}}
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-3xl font-bold text-gray-900">
                    Daftar Pelanggan
                </h1>

{{--                <a--}}
{{--                    href="#"--}}
{{--                    class="inline-flex items-center rounded-full bg-amber-900 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-amber-800"--}}
{{--                >--}}
{{--                    + Tambah Pelanggan--}}
{{--                </a>--}}
            </div>

            {{-- FILTER BAR --}}
            <div class="mb-8 rounded-full bg-primary-container px-6 py-4 shadow flex items-center gap-4">
                <span class="font-semibold text-gray-800 mr-2">Urutkan:</span>
                <select
                    name="sort"
                    class="w-40 rounded-full border-none bg-rose-50 px-4 py-2 text-sm text-black shadow-inner focus:ring-0"
                >
                    <option value="name">Nama</option>
                    <option value="recent">Terbaru</option>
                </select>

{{--                <span class="font-semibold text-gray-800 mr-2">Filter:</span>--}}
{{--                <select--}}
{{--                    name="status"--}}
{{--                    class="w-40 rounded-full border-none bg-white px-4 py-2 text-sm text-black shadow-inner focus:ring-0"--}}
{{--                >--}}
{{--                    <option value="">Semua</option>--}}
{{--                    <option value="new">Pelanggan Baru</option>--}}
{{--                    <option value="active">Sering Sewa</option>--}}
{{--                </select>--}}

                <div class="flex items-center gap-2 ml-auto">
                    <input
                        type="text"
                        name="q"
                        placeholder="Cari nama atau email"
                        class="w-[300px] rounded-full border-none bg-rose-50 px-4 py-2 text-sm text-gray-700 shadow-inner focus:ring-0"
                    >
                    <button
                        type="submit"
                        class="flex items-center justify-center rounded-full bg-amber-900 p-2 text-white shadow hover:bg-amber-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                        </svg>
                    </button>
                </div>
            </div>

                {{-- LIST PELANGGAN DALAM CARD --}}
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    @forelse ($users as $user)
                        <div class="rounded-[24px] overflow-hidden bg-primary-container shadow flex flex-col">
                            {{-- AREA ATAS (INFO + NO TELP) --}}
                            <div class="px-6 py-4">
                                <div class="items-start justify-between gap-4">
                                    <div>
                                        <h2 class="text-2xl font-extrabold text-gray-900">
                                            {{ $user->nama_user }}
                                        </h2>
                                        <p class="text-sm text-gray-700">
                                            {{ $user->email_user }}
                                        </p>
                                        <p class="text-xl font-bold text-gray-900 text-right">
                                            {{ $user->no_telp_user }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {{-- BAR BAWAH --}}
                            <div class="mt-auto bg-primary px-6 py-3">
                                <div class="flex items-center justify-between">
                                    <span class="text-[12px] text-white">
                                        Terdaftar {{ $user->created_at?->format('d M Y') }}
                                    </span>
{{--                                    <a--}}
{{--                                        href="{{ route('users.destroy', $user->id) }}"--}}
{{--                                        class="inline-flex items-center rounded-full bg-red-700 px-5 py-1.5 text-sm font-semibold text-white shadow hover:bg-olive-800"--}}
{{--                                    >--}}
{{--                                        Hapus--}}
{{--                                    </a>--}}
                                </div>
                            </div>
                        </div>
                    @empty
                        <p class="text-sm text-gray-600">Tidak ada pelanggan.</p>
                    @endforelse
                </div>

        </div>
    </div>
</x-app-layout>
