<x-app-layout>
    <div class="py-12">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">

            <div class="bg-white shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <h2 class="text-lg font-semibold mb-4">Detail Pelanggan</h2>

                    <div class="space-y-2 text-sm">
                        <div>
                            <span class="font-semibold">ID:</span>
                            <span>{{ $user->id }}</span>
                        </div>
                        <div>
                            <span class="font-semibold">Nama:</span>
                            <span>{{ $user->nama_user }}</span>
                        </div>
                        <div>
                            <span class="font-semibold">Email:</span>
                            <span>{{ $user->email_user }}</span>
                        </div>
                        <div>
                            <span class="font-semibold">No. Telp:</span>
                            <span>{{ $user->no_telp_user }}</span>
                        </div>
                    </div>

                    <div class="mt-6 flex items-center justify-between">
                        <a
                            href="{{ route('users.index') }}"
                            class="text-sm text-gray-700 hover:underline"
                        >
                            &larr; Kembali ke daftar pelanggan
                        </a>

                        <form
                            action="{{ route('users.destroy', $user->id) }}"
                            method="POST"
                            onsubmit="return confirm('Yakin ingin menghapus pelanggan ini?');"
                        >
                            @csrf
                            @method('DELETE')
                            <button
                                type="submit"
                                class="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                            >
                                Hapus Pelanggan
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
