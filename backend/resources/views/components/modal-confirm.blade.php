@props([
    'title' => 'Konfirmasi',
    'message' => 'Yakin ingin melanjutkan?',
    'action' => '#',
    'buttonText' => 'Ya, Lanjutkan',
    'method' => 'POST'
])

<div x-data="{ open: false }">
    <button @click="open = true"
        {{ $attributes->merge(['class' => 'inline-flex justify-center px-6 py-2 rounded-full bg-red-600 text-white text-sm font-semibold shadow']) }}>
        {{ $slot }}
    </button>

    <div x-show="open" x-cloak x-transition class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div class="bg-white rounded-[24px] shadow-lg p-6 max-w-sm w-full flex items-start gap-3" @click.away="open = false">
            <div class="shrink-0 text-red-600">
                <!-- Icon tanda silang -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                          d="M12 2.25a9.75 9.75 0 109.75 9.75A9.76 9.76 0 0012 2.25zm3.53 12.72a.75.75 0 01-1.06 1.06L12 13.56l-2.47 2.47a.75.75 0 11-1.06-1.06L10.94 12 8.47 9.53a.75.75 0 111.06-1.06L12 10.94l2.47-2.47a.75.75 0 111.06 1.06L13.06 12l2.47 2.47z"
                          clip-rule="evenodd"/>
                </svg>
            </div>

            <div class="flex-1 text-left">
                <h3 class="text-sm font-semibold text-gray-900">{{ $title }}</h3>
                <p class="mt-1 text-sm text-gray-700">{{ $message }}</p>

                <div class="mt-4 flex justify-end gap-2">
                    <button type="button" @click="open = false"
                            class="px-3 py-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300">
                        Batal
                    </button>

                    <form action="{{ $action }}" method="POST">
                        @csrf
                        @if (strtoupper($method) !== 'POST')
                            @method($method)
                        @endif
                        <button type="submit"
                                class="px-3 py-1.5 rounded-full bg-red-600 text-white hover:bg-red-700">
                            {{ $buttonText }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
