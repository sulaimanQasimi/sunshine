<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Regular House Cleaning',
                'description' => 'Complete house cleaning including dusting, vacuuming, mopping, and bathroom cleaning.',
                'price' => 80.00,
            ],
            [
                'name' => 'Deep Cleaning',
                'description' => 'Thorough deep cleaning including hard-to-reach areas, inside appliances, and detailed attention to all surfaces.',
                'price' => 150.00,
            ],
            [
                'name' => 'Kitchen Deep Clean',
                'description' => 'Comprehensive kitchen cleaning including appliances, cabinets, countertops, and floors.',
                'price' => 60.00,
            ],
            [
                'name' => 'Bathroom Deep Clean',
                'description' => 'Detailed bathroom cleaning including tiles, grout, fixtures, and sanitization.',
                'price' => 45.00,
            ],
            [
                'name' => 'Carpet Cleaning',
                'description' => 'Professional carpet cleaning and stain removal using eco-friendly products.',
                'price' => 100.00,
            ],
            [
                'name' => 'Window Cleaning',
                'description' => 'Interior and exterior window cleaning including frames and sills.',
                'price' => 40.00,
            ],
            [
                'name' => 'Move-in/Move-out Cleaning',
                'description' => 'Comprehensive cleaning service for moving in or out of a property.',
                'price' => 200.00,
            ],
            [
                'name' => 'Office Cleaning',
                'description' => 'Professional office cleaning including workstations, common areas, and restrooms.',
                'price' => 120.00,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
