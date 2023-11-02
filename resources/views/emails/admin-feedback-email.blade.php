@component('mail::message')

# {{ $title }}

## User Info

<pre>{{ to_str($info) }}</pre>

Regards,<br>
{{ config('app.name') }} Team

@endcomponent
