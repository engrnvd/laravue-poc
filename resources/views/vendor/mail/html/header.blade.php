@props(['url'])
<tr>
    <td class="header">
        <a href="{{ $url }}">
            @if (trim($slot) === 'Laravel')
                <img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo">
            @else
                @include('common.logo')
                {{ $slot }}
            @endif
        </a>
    </td>
</tr>
