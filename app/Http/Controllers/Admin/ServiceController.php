<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display a listing of services.
     */
    public function index(): Response
    {
        // Ensure only admins can access
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $services = Service::withCount('additionalItems')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('admin/services/index', [
            'services' => $services,
        ]);
    }

    /**
     * Show the form for creating a new service.
     */
    public function create(): Response
    {
        // Ensure only admins can access
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('admin/services/create');
    }

    /**
     * Store a newly created service in storage.
     */
    public function store(Request $request)
    {
        // Ensure only admins can access
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'base_price' => 'required|numeric|min:0',
            'duration' => 'required|string|max:100',
            'is_active' => 'boolean',
            'is_special_offer' => 'boolean',
            'special_price' => 'nullable|numeric|min:0',
            'offer_end_date' => 'nullable|date|after:today',
            'features' => 'array',
            'features.*.name' => 'required|string|max:255',
            'features.*.price' => 'required|numeric|min:0',
            'category' => 'nullable|string|max:100',
            'tags' => 'nullable|string|max:500',
            'service_area' => 'nullable|string|max:500',
            'requirements' => 'nullable|string|max:1000',
            'included' => 'nullable|string|max:1000',
            'not_included' => 'nullable|string|max:1000',
            'preparation_time' => 'nullable|string|max:100',
            'cancellation_policy' => 'nullable|string|max:1000',
        ]);

        // Filter out empty features
        $features = array_filter($validated['features'] ?? [], function($feature) {
            return !empty(trim($feature['name'] ?? ''));
        });

        $service = Service::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'base_price' => $validated['base_price'],
            'duration' => $validated['duration'],
            'is_active' => $validated['is_active'] ?? true,
            'is_special_offer' => $validated['is_special_offer'] ?? false,
            'special_price' => $validated['special_price'],
            'offer_end_date' => $validated['offer_end_date'],
            'features' => $features,
            'category' => $validated['category'],
            'tags' => $validated['tags'],
            'service_area' => $validated['service_area'],
            'requirements' => $validated['requirements'],
            'included' => $validated['included'],
            'not_included' => $validated['not_included'],
            'preparation_time' => $validated['preparation_time'],
            'cancellation_policy' => $validated['cancellation_policy'],
        ]);

        return redirect()->route('admin.services.index')->with('success', 'Service created successfully!');
    }

    /**
     * Display the specified service.
     */
    public function show(Service $service): Response
    {
        // Ensure only admins can access
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $service->load('additionalItems');

        return Inertia::render('admin/services/show', [
            'service' => $service,
        ]);
    }

    /**
     * Show the form for editing the specified service.
     */
    public function edit(Service $service): Response
    {
        // Ensure only admins can access
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $service->load('additionalItems');

        return Inertia::render('admin/services/edit', [
            'service' => $service,
        ]);
    }

    /**
     * Update the specified service in storage.
     */
    public function update(Request $request, Service $service)
    {
        // Ensure only admins can access
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'base_price' => 'required|numeric|min:0',
            'duration' => 'required|string|max:100',
            'is_active' => 'boolean',
            'is_special_offer' => 'boolean',
            'special_price' => 'nullable|numeric|min:0',
            'offer_end_date' => 'nullable|date',
            'features' => 'array',
            'features.*.name' => 'required|string|max:255',
            'features.*.price' => 'required|numeric|min:0',
            'category' => 'nullable|string|max:100',
            'tags' => 'nullable|string|max:500',
            'service_area' => 'nullable|string|max:500',
            'requirements' => 'nullable|string|max:1000',
            'included' => 'nullable|string|max:1000',
            'not_included' => 'nullable|string|max:1000',
            'preparation_time' => 'nullable|string|max:100',
            'cancellation_policy' => 'nullable|string|max:1000',
        ]);

        // Filter out empty features
        $features = array_filter($validated['features'] ?? [], function($feature) {
            return !empty(trim($feature['name'] ?? ''));
        });

        $service->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'base_price' => $validated['base_price'],
            'duration' => $validated['duration'],
            'is_active' => $validated['is_active'] ?? true,
            'is_special_offer' => $validated['is_special_offer'] ?? false,
            'special_price' => $validated['special_price'],
            'offer_end_date' => $validated['offer_end_date'],
            'features' => $features,
            'category' => $validated['category'],
            'tags' => $validated['tags'],
            'service_area' => $validated['service_area'],
            'requirements' => $validated['requirements'],
            'included' => $validated['included'],
            'not_included' => $validated['not_included'],
            'preparation_time' => $validated['preparation_time'],
            'cancellation_policy' => $validated['cancellation_policy'],
        ]);

        return redirect()->route('admin.services.index')->with('success', 'Service updated successfully!');
    }

    /**
     * Remove the specified service from storage.
     */
    public function destroy(Service $service)
    {
        // Ensure only admins can access
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        // Check if service has any requests
        if ($service->serviceRequests()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete service that has associated requests.');
        }

        $service->delete();

        return redirect()->route('admin.services.index')->with('success', 'Service deleted successfully!');
    }
}
