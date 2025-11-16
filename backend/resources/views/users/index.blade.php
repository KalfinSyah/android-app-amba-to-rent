<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            {{-- ALERT SUCCESS --}}
            @if (session('success'))
                <div class="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-800">
                    {{ session('success') }}
                </div>
            @endif

            {{-- LIST PELANGGAN (CARD) --}}
            <div class="bg-white shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <h2 class="text-lg font-semibold mb-4">Daftar Pelanggan</h2>

                    @forelse ($users as $user)
                        <div class="border-b last:border-b-0 py-4 flex justify-between items-start gap-4">
                            <div>
                                <div class="font-semibold text-gray-900">
                                    {{ $user->nama_user }}
                                </div>
                                <div class="text-sm text-gray-600">
                                    Email: {{ $user->email_user }}
                                </div>
                                <div class="text-sm text-gray-600">
                                    No. Telp: {{ $user->no_telp_user }}
                                </div>
                                <div class="text-xs text-gray-500 mt-1">
                                    ID: {{ $user->id }}
                                </div>
                            </div>

                            <div class="flex flex-col items-end gap-2">
                                <a
                                    href="{{ route('users.show', $user->id) }}"
                                    class="text-sm text-indigo-600 hover:underline"
                                >
                                    Detail
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
                                        class="text-xs text-red-600 hover:underline"
                                    >
                                        Hapus
                                    </button>
                                </form>
                            </div>
                        </div>
                    @empty
                        <p class="text-sm text-gray-600">Tidak ada pelanggan.</p>
                    @endforelse
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
