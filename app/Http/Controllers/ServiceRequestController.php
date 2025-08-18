<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServiceRequest;
use App\Models\AdditionalItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ServiceRequestController extends Controller
{
    /**
     * Display the service request form.
     */
    public function create(int $serviceId): Response
    {
        $service = Service::with('additionalItems')->findOrFail($serviceId);
        
        return Inertia::render('service-request', [
            'service' => $service,
        ]);
    }

    /**
     * Store a new service request.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'selected_additional_items' => 'array',
            'selected_additional_items.*' => 'exists:additional_items,id',
            'description' => 'nullable|string|max:1000',
            'client_name' => 'required|string|max:255',
            'client_email' => 'required|email|max:255',
            'client_phone' => 'required|string|max:20',
            'client_address' => 'required|string|max:500',
            'house_number' => 'nullable|string|max:50',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'country' => 'required|string|max:100',
            'preferred_date' => 'required|date|after:today',
            'preferred_time' => 'required|date_format:H:i',
            'special_requirements' => 'nullable|string|max:1000',
            'additional_notes' => 'nullable|string|max:1000',
        ]);

        $service = Service::findOrFail($validated['service_id']);
        
        // Calculate prices
        $basePrice = $service->current_price;
        $additionalPrice = 0;
        
        if (!empty($validated['selected_additional_items'])) {
            $additionalItems = AdditionalItem::whereIn('id', $validated['selected_additional_items'])->get();
            $additionalPrice = $additionalItems->sum('price');
        }
        
        $totalPrice = $basePrice + $additionalPrice;

        $serviceRequest = ServiceRequest::create([
            'user_id' => Auth::id(),
            'service_id' => $validated['service_id'],
            'status' => 'pending',
            'base_price' => $basePrice,
            'total_price' => $totalPrice,
            'selected_additional_items' => $validated['selected_additional_items'] ?? [],
            'description' => $validated['description'],
            'client_name' => $validated['client_name'],
            'client_email' => $validated['client_email'],
            'client_phone' => $validated['client_phone'],
            'client_address' => $validated['client_address'],
            'house_number' => $validated['house_number'],
            'city' => $validated['city'],
            'state' => $validated['state'],
            'postal_code' => $validated['postal_code'],
            'country' => $validated['country'],
            'preferred_date' => $validated['preferred_date'],
            'preferred_time' => $validated['preferred_time'],
            'special_requirements' => $validated['special_requirements'],
            'additional_notes' => $validated['additional_notes'],
        ]);

        return redirect()->route('dashboard')->with('success', 'Service request submitted successfully! We will review your request and get back to you soon.');
    }

    /**
     * Display the specified service request.
     */
    public function show(ServiceRequest $serviceRequest): Response
    {
        // Ensure user can only view their own requests (unless admin)
        if (Auth::user()->role !== 'admin' && $serviceRequest->user_id !== Auth::id()) {
            abort(403);
        }

        $serviceRequest->load(['service', 'service.additionalItems', 'user']);

        return Inertia::render('service-request-detail', [
            'serviceRequest' => $serviceRequest,
        ]);
    }

    /**
     * Confirm a service request (client action).
     */
    public function confirm(ServiceRequest $serviceRequest)
    {
        // Ensure user can only confirm their own requests
        if ($serviceRequest->user_id !== Auth::id()) {
            abort(403);
        }

        $serviceRequest->confirm();

        return redirect()->back()->with('success', 'Service request confirmed successfully!');
    }

    /**
     * Update the specified service request.
     */
    public function update(Request $request, ServiceRequest $serviceRequest)
    {
        // Ensure user can only update their own requests (unless admin)
        if (Auth::user()->role !== 'admin' && $serviceRequest->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'description' => 'nullable|string|max:1000',
            'client_name' => 'required|string|max:255',
            'client_email' => 'required|email|max:255',
            'client_phone' => 'required|string|max:20',
            'client_address' => 'required|string|max:500',
            'house_number' => 'nullable|string|max:50',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'country' => 'required|string|max:100',
            'preferred_date' => 'required|date|after:today',
            'preferred_time' => 'required|date_format:H:i',
            'special_requirements' => 'nullable|string|max:1000',
            'additional_notes' => 'nullable|string|max:1000',
        ]);

        $serviceRequest->update($validated);

        return redirect()->back()->with('success', 'Service request updated successfully!');
    }

    /**
     * Update the status of a service request (admin action).
     */
    public function updateStatus(Request $request, ServiceRequest $serviceRequest)
    {
        // Ensure only admins can update status
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,approved,in_progress,completed,cancelled',
            'admin_notes' => 'nullable|string|max:1000',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $serviceRequest->update($validated);

        return redirect()->back()->with('success', 'Service request status updated successfully!');
    }

    /**
     * Display a listing of service requests (admin view).
     */
    public function index(): Response
    {
        // Ensure only admins can view all requests
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $serviceRequests = ServiceRequest::with(['user', 'service'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('admin/service-requests', [
            'serviceRequests' => $serviceRequests,
        ]);
    }

    /**
     * Display user's own service requests.
     */
    public function myRequests(): Response
    {
        $serviceRequests = ServiceRequest::where('user_id', Auth::id())
            ->with('service')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('my-service-requests', [
            'serviceRequests' => $serviceRequests,
        ]);
    }
}
