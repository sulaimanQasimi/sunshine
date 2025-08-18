<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_id',
        'status',
        'base_price',
        'total_price',
        'selected_additional_items',
        'description',
        'client_name',
        'client_email',
        'client_phone',
        'client_address',
        'house_number',
        'city',
        'state',
        'postal_code',
        'country',
        'preferred_date',
        'preferred_time',
        'special_requirements',
        'additional_notes',
        'client_confirmed',
        'confirmed_at',
        'admin_notes',
        'assigned_to',
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'selected_additional_items' => 'array',
        'preferred_date' => 'date',
        'preferred_time' => 'datetime',
        'client_confirmed' => 'boolean',
        'confirmed_at' => 'datetime',
    ];

    /**
     * Get the user that owns the service request.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the service for this request.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Get the admin assigned to this request.
     */
    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /**
     * Scope to get requests by status.
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to get pending requests.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope to get confirmed requests.
     */
    public function scopeConfirmed($query)
    {
        return $query->where('client_confirmed', true);
    }

    /**
     * Get the full address as a string.
     */
    public function getFullAddressAttribute(): string
    {
        $address = $this->client_address;
        if ($this->house_number) {
            $address = $this->house_number . ' ' . $address;
        }
        return $address . ', ' . $this->city . ', ' . $this->state . ' ' . $this->postal_code . ', ' . $this->country;
    }

    /**
     * Get the status badge color.
     */
    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'pending' => 'yellow',
            'approved' => 'blue',
            'in_progress' => 'purple',
            'completed' => 'green',
            'cancelled' => 'red',
            default => 'gray',
        };
    }

    /**
     * Confirm the request.
     */
    public function confirm(): void
    {
        $this->update([
            'client_confirmed' => true,
            'confirmed_at' => now(),
        ]);
    }

    /**
     * Update the status.
     */
    public function updateStatus(string $status): void
    {
        $this->update(['status' => $status]);
    }
}
