<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ServiceRequest;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(): Response
    {
        $user = Auth::user();
        
        // Get statistics
        $stats = [
            'totalRequests' => ServiceRequest::where('user_id', $user->id)->count(),
            'pendingRequests' => ServiceRequest::where('user_id', $user->id)->where('status', 'pending')->count(),
            'completedRequests' => ServiceRequest::where('user_id', $user->id)->where('status', 'completed')->count(),
            'totalServices' => Service::count(),
        ];

        // Get recent requests
        $recentRequests = ServiceRequest::where('user_id', $user->id)
            ->with('service')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentRequests' => $recentRequests,
        ]);
    }
}
