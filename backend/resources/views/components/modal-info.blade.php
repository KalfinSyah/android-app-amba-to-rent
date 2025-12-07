@props(['status', 'message'])

<div x-data="{ open: true }"
     x-show="open"
     x-init="setTimeout(() => open = false, 5000)"
     x-transition:enter="transform ease-out duration-300 transition"
     x-transition:enter-start="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
     x-transition:enter-end="translate-y-0 opacity-100 sm:translate-x-0"
     x-transition:leave="transition ease-in duration-100"
     x-transition:leave-start="opacity-100"
     x-transition:leave-end="opacity-0"
     style="display: none;"
     class="fixed bottom-0 right-0 z-50 m-6 w-full max-w-sm"
>

    {{-- Container Card --}}
    <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-4 relative overflow-hidden">

        {{-- Progress Bar (Opsional: Indikator waktu auto-close) --}}
        <div class="absolute bottom-0 left-0 h-1 bg-gray-100 w-full">
            <div class="h-full {{ $status === 'success' ? 'bg-green-500' : 'bg-red-500' }}"
                 style="width: 100%; transition: width 5s linear;"
                 x-init="$nextTick(() => { $el.style.width = '0%' })">
            </div>
        </div>

        <div class="flex items-start gap-3">
            {{-- Icon --}}
            @if($status === 'success')
                <div class="shrink-0 text-green-500">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            @else
                <div class="shrink-0 text-red-500">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                </div>
            @endif

            {{-- Content --}}
            <div class="flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                    {{ $status === 'success' ? 'Berhasil!' : 'Terjadi Kesalahan' }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                    {{ $message }}
                </p>
            </div>

            {{-- Close Button --}}
            <button @click="open = false" class="shrink-0 ml-4 text-gray-400 hover:text-gray-500 focus:outline-none">
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</div>
