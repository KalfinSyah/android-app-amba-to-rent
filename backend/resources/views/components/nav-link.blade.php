@props(['active'])

@php
    $classes = ($active ?? false)
        ? 'inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-gray-900'
        : 'inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-white';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    <span class="{{ $active
        ? 'bg-white text-black px-2 py-2 rounded-full leading-none font-bold'
        : 'transition duration-200 hover:bg-white hover:text-black px-2 py-2 rounded-full leading-none' }}"
    >
        {{ $slot }}
    </span>
</a>
