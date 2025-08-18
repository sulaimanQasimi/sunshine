<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ServiceRequest;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ServiceRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        $perPage = $request->get('per_page', 10);

        if ($user->isAdmin()) {
            // Admin can see all requests
            $requests = ServiceRequest::with(['user', 'service'])->paginate($perPage);
        } else {
            // Customer can only see their own requests
            $requests = $user->requests()->with('service')->paginate($perPage);
        }

        return response()->json([
            'success' => true,
            'data' => $requests
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $serviceRequest = ServiceRequest::create([
            'user_id' => Auth::id(),
            'service_id' => $request->service_id,
            'status' => 'pending'
        ]);

        $serviceRequest->load('service');

        return response()->json([
            'success' => true,
            'message' => 'Service request created successfully',
            'data' => $serviceRequest
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceRequest $serviceRequest): JsonResponse
    {
        $user = Auth::user();

        // Check if user can view this request
        if (!$user->isAdmin() && $serviceRequest->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $serviceRequest->load(['user', 'service']);

        return response()->json([
            'success' => true,
            'data' => $serviceRequest
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ServiceRequest $serviceRequest): JsonResponse
    {
        $user = Auth::user();

        // Check if user can update this request
        if (!$user->isAdmin() && $serviceRequest->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'sometimes|required|in:pending,approved,completed,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        // Only admin can approve/complete requests
        if (in_array($request->status, ['approved', 'completed']) && !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required for this action.'
            ], 403);
        }

        // Only the request owner can cancel their own request
        if ($request->status === 'cancelled' && $serviceRequest->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. You can only cancel your own requests.'
            ], 403);
        }

        $serviceRequest->update($request->all());
        $serviceRequest->load(['user', 'service']);

        return response()->json([
            'success' => true,
            'message' => 'Service request updated successfully',
            'data' => $serviceRequest
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceRequest $serviceRequest): JsonResponse
    {
        $user = Auth::user();

        // Check if user can delete this request
        if (!$user->isAdmin() && $serviceRequest->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $serviceRequest->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service request deleted successfully'
        ]);
    }

    /**
     * Approve a service request (admin only)
     */
    public function approve(ServiceRequest $serviceRequest): JsonResponse
    {
        if (!Auth::user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $serviceRequest->update(['status' => 'approved']);
        $serviceRequest->load(['user', 'service']);

        return response()->json([
            'success' => true,
            'message' => 'Service request approved successfully',
            'data' => $serviceRequest
        ]);
    }

    /**
     * Complete a service request (admin only)
     */
    public function complete(ServiceRequest $serviceRequest): JsonResponse
    {
        if (!Auth::user()->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ], 403);
        }

        $serviceRequest->update(['status' => 'completed']);
        $serviceRequest->load(['user', 'service']);

        return response()->json([
            'success' => true,
            'message' => 'Service request completed successfully',
            'data' => $serviceRequest
        ]);
    }

    /**
     * Cancel a service request (owner only)
     */
    public function cancel(ServiceRequest $serviceRequest): JsonResponse
    {
        $user = Auth::user();

        if ($serviceRequest->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. You can only cancel your own requests.'
            ], 403);
        }

        $serviceRequest->update(['status' => 'cancelled']);
        $serviceRequest->load(['user', 'service']);

        return response()->json([
            'success' => true,
            'message' => 'Service request cancelled successfully',
            'data' => $serviceRequest
        ]);
    }
}
