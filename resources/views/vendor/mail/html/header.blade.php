@props(['url'])
<tr>
    <td class="header">
        <a href="{{ $url }}">
            @if (trim($slot) === 'Laravel')
                <img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo">
            @else
                @include('common.logo')
                <div style="margin-left: 8px;">{{ $slot }}</div>
            @endif
        </a>
    </td>
</tr>
