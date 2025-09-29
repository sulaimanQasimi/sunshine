<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'base_price',
        'duration',
        'features',
        'is_special_offer',
        'special_price',
        'offer_end_date',
        'is_active',
        'category',
        'tags',
        'service_area',
        'requirements',
        'included',
        'not_included',
        'preparation_time',
        'cancellation_policy',
    ];

    protected $casts = [
        'features' => 'array',
        'is_special_offer' => 'boolean',
        'special_price' => 'decimal:2',
        'base_price' => 'decimal:2',
        'offer_end_date' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Get the additional items for this service.
     */
    public function additionalItems(): HasMany
    {
        return $this->hasMany(AdditionalItem::class);
    }

    /**
     * Get the service requests for this service.
     */
    public function serviceRequests(): HasMany
    {
        return $this->hasMany(ServiceRequest::class);
    }

    /**
     * Get the current price (special price if available and not expired, otherwise base price).
     */
    public function getCurrentPriceAttribute(): float
    {
        if ($this->is_special_offer && $this->special_price && $this->offer_end_date) {
            if ($this->offer_end_date->isFuture()) {
                return $this->special_price;
            }
        }
        return $this->base_price;
    }

    /**
     * Check if the special offer is still valid.
     */
    public function getIsOfferValidAttribute(): bool
    {
        return $this->is_special_offer && 
               $this->special_price && 
               $this->offer_end_date && 
               $this->offer_end_date->isFuture();
    }

    /**
     * Scope to get only active services.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get services with valid special offers.
     */
    public function scopeWithValidOffers($query)
    {
        return $query->where('is_special_offer', true)
                    ->where('special_price', '>', 0)
                    ->where('offer_end_date', '>', now());
    }
}
