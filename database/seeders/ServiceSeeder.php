<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\AdditionalItem;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Web Development Service
        $webDev = Service::create([
            'name' => 'Web Development',
            'description' => 'Custom web applications and websites built with modern technologies.',
            'base_price' => 75.00,
            'duration' => '2-4 weeks',
            'features' => [
                'Responsive design',
                'SEO optimization',
                'Performance optimization',
                'Security implementation',
                'Content management system'
            ],
            'is_special_offer' => true,
            'special_price' => 60.00,
            'offer_end_date' => '2024-12-31',
            'is_active' => true,
        ]);

        // Additional items for Web Development
        AdditionalItem::create([
            'service_id' => $webDev->id,
            'name' => 'E-commerce Integration',
            'description' => 'Add online store functionality',
            'price' => 25.00,
            'duration' => '+1 week',
            'is_active' => true,
        ]);

        AdditionalItem::create([
            'service_id' => $webDev->id,
            'name' => 'Payment Gateway',
            'description' => 'Secure payment processing',
            'price' => 15.00,
            'duration' => '+3 days',
            'is_active' => true,
        ]);

        AdditionalItem::create([
            'service_id' => $webDev->id,
            'name' => 'Analytics Setup',
            'description' => 'Google Analytics and tracking',
            'price' => 10.00,
            'duration' => '+1 day',
            'is_active' => true,
        ]);

        // Mobile Development Service
        $mobileDev = Service::create([
            'name' => 'Mobile Development',
            'description' => 'Native and cross-platform mobile applications for iOS and Android.',
            'base_price' => 85.00,
            'duration' => '4-8 weeks',
            'features' => [
                'Native iOS/Android apps',
                'Cross-platform solutions',
                'App store optimization',
                'Push notifications',
                'Offline functionality'
            ],
            'is_active' => true,
        ]);

        // Additional items for Mobile Development
        AdditionalItem::create([
            'service_id' => $mobileDev->id,
            'name' => 'Backend API',
            'description' => 'Custom backend development',
            'price' => 30.00,
            'duration' => '+2 weeks',
            'is_active' => true,
        ]);

        AdditionalItem::create([
            'service_id' => $mobileDev->id,
            'name' => 'Cloud Integration',
            'description' => 'AWS/Azure cloud services',
            'price' => 20.00,
            'duration' => '+1 week',
            'is_active' => true,
        ]);

        // UI/UX Design Service
        $uiux = Service::create([
            'name' => 'UI/UX Design',
            'description' => 'User-centered design solutions that enhance user experience.',
            'base_price' => 65.00,
            'duration' => '1-3 weeks',
            'features' => [
                'User research',
                'Wireframing & prototyping',
                'Visual design',
                'User testing',
                'Design systems'
            ],
            'is_special_offer' => true,
            'special_price' => 50.00,
            'offer_end_date' => '2024-11-30',
            'is_active' => true,
        ]);

        // Additional items for UI/UX Design
        AdditionalItem::create([
            'service_id' => $uiux->id,
            'name' => 'Design System',
            'description' => 'Complete design system creation',
            'price' => 20.00,
            'duration' => '+1 week',
            'is_active' => true,
        ]);

        AdditionalItem::create([
            'service_id' => $uiux->id,
            'name' => 'User Testing',
            'description' => 'Comprehensive user testing',
            'price' => 15.00,
            'duration' => '+3 days',
            'is_active' => true,
        ]);

        // Digital Marketing Service
        $marketing = Service::create([
            'name' => 'Digital Marketing',
            'description' => 'Comprehensive digital marketing strategies to grow your business.',
            'base_price' => 55.00,
            'duration' => 'Ongoing',
            'features' => [
                'SEO & SEM',
                'Social media marketing',
                'Content marketing',
                'Email campaigns',
                'Analytics & reporting'
            ],
            'is_active' => true,
        ]);

        // Additional items for Digital Marketing
        AdditionalItem::create([
            'service_id' => $marketing->id,
            'name' => 'Content Creation',
            'description' => 'Professional content writing',
            'price' => 15.00,
            'duration' => '+2 days',
            'is_active' => true,
        ]);

        AdditionalItem::create([
            'service_id' => $marketing->id,
            'name' => 'Social Media Management',
            'description' => 'Daily social media posts',
            'price' => 25.00,
            'duration' => '+1 week',
            'is_active' => true,
        ]);

        // Consulting Service
        $consulting = Service::create([
            'name' => 'Consulting',
            'description' => 'Expert advice on technology strategy and digital transformation.',
            'base_price' => 95.00,
            'duration' => 'Flexible',
            'features' => [
                'Technology assessment',
                'Strategy development',
                'Process optimization',
                'Team training',
                'Ongoing support'
            ],
            'is_active' => true,
        ]);

        // Additional items for Consulting
        AdditionalItem::create([
            'service_id' => $consulting->id,
            'name' => 'Technical Audit',
            'description' => 'Comprehensive system audit',
            'price' => 40.00,
            'duration' => '+1 week',
            'is_active' => true,
        ]);

        AdditionalItem::create([
            'service_id' => $consulting->id,
            'name' => 'Team Training',
            'description' => 'Staff training sessions',
            'price' => 30.00,
            'duration' => '+2 days',
            'is_active' => true,
        ]);

        // Maintenance & Support Service
        $maintenance = Service::create([
            'name' => 'Maintenance & Support',
            'description' => 'Ongoing maintenance and technical support for your applications.',
            'base_price' => 45.00,
            'duration' => 'Monthly',
            'features' => [
                'Bug fixes',
                'Security updates',
                'Performance monitoring',
                '24/7 support',
                'Regular backups'
            ],
            'is_active' => true,
        ]);

        // Additional items for Maintenance & Support
        AdditionalItem::create([
            'service_id' => $maintenance->id,
            'name' => 'Priority Support',
            'description' => '24/7 priority support',
            'price' => 20.00,
            'duration' => 'Monthly',
            'is_active' => true,
        ]);

        AdditionalItem::create([
            'service_id' => $maintenance->id,
            'name' => 'Performance Optimization',
            'description' => 'Regular performance tuning',
            'price' => 15.00,
            'duration' => '+1 day',
            'is_active' => true,
        ]);
    }
}
