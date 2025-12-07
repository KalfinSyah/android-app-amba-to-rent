@props([
    'title' => 'Konfirmasi',
    'message' => 'Yakin ingin melanjutkan?',
    'action' => '#',
    'buttonText' => 'Ya, Lanjutkan',
    'method' => 'POST',
    'type' => 'danger'
])

@php
    $colors = [
        'danger' => [
            'trigger' => 'bg-red-600 text-white hover:bg-red-700',
            'icon' => 'text-red-600',
            'confirm' => 'bg-red-600 text-white hover:bg-red-700',
        ],
        'success' => [
            'trigger' => 'bg-green-600 text-white hover:bg-green-700',
            'icon' => 'text-green-600',
            'confirm' => 'bg-green-600 text-white hover:bg-green-700',
        ],
        'primary' => [
            'trigger' => 'bg-primary-button text-white hover:opacity-90',
            'icon' => 'text-blue-600',
            'confirm' => 'bg-primary-button text-white hover:opacity-90',
        ],
    ];

    $style = $colors[$type] ?? $colors['danger'];
@endphp

<div x-data="{ open: false }">
    {{-- TRIGGER BUTTON --}}
    {{-- Class warnanya sekarang dinamis ngambil dari $style['trigger'] --}}
    <button @click="open = true"
        {{ $attributes->merge(['class' => 'inline-flex justify-center px-6 py-2 rounded-full text-sm font-semibold shadow transition ' . $style['trigger']]) }}>
        {{ $slot }}
    </button>

    <div x-show="open" x-cloak x-transition class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div class="bg-white rounded-[24px] shadow-lg p-6 max-w-sm w-full flex items-start gap-3" @click.away="open = false">

            {{-- ICON --}}
            {{-- Class warna icon dinamis --}}
            <div class="shrink-0 {{ $style['icon'] }}">
                @if($type === 'success')
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                    </svg>
                @else
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12 2.25a9.75 9.75 0 109.75 9.75A9.76 9.76 0 0012 2.25zm3.53 12.72a.75.75 0 01-1.06 1.06L12 13.56l-2.47 2.47a.75.75 0 11-1.06-1.06L10.94 12 8.47 9.53a.75.75 0 111.06-1.06L12 10.94l2.47-2.47a.75.75 0 111.06 1.06L13.06 12l2.47 2.47z" clip-rule="evenodd"/>
                    </svg>
                @endif
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

                        {{-- TOMBOL KONFIRMASI --}}
                        {{-- Class warna tombol konfirmasi dinamis --}}
                        <button type="submit"
                                class="px-3 py-1.5 rounded-full text-white transition {{ $style['confirm'] }}">
                            {{ $buttonText }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
