<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index(): Response
    {
        return Inertia::render('welcome');
    }

    /**
     * Display the services page.
     */
    public function services(): Response
    {
        return Inertia::render('services');
    }

    /**
     * Display the contact page.
     */
    public function contact(): Response
    {
        return Inertia::render('contact');
    }

    /**
     * Handle contact form submission.
     */
    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:1000',
        ]);

        // Here you would typically:
        // 1. Send an email notification
        // 2. Store the contact message in the database
        // 3. Send a confirmation email to the user

        // For now, we'll just redirect back with a success message
        return redirect()->back()->with('success', 'Thank you for your message. We will get back to you soon!');
    }
}
