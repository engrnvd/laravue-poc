<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AdminFeedbackMailable extends Mailable
{
    use Queueable, SerializesModels;

    public string $title;
    public $info;

    public function __construct($title, $info)
    {
        $this->title = $title;
        $this->info = $info;
    }

    public function envelope()
    {
        return new Envelope(
            subject: $this->title,
        );
    }

    public function content()
    {
        return new Content(
            markdown: 'emails.admin-feedback-email',
        );
    }

    public function attachments()
    {
        return [];
    }
}
