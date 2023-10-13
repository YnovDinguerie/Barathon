<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $rawToken;
    public $url;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($token)
    {

        $this->rawToken = $token;
        $this->url = env("FRONT_URL", "") . '/auth/reset-password/' . $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.resetPassword');
    }
}
