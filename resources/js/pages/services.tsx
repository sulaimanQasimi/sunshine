import GuestLayout from '@/layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Clock, DollarSign, Star } from 'lucide-react';

export default function Services() {
    return (
        <GuestLayout title="Our Services">
            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Our Professional Services
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            We offer a comprehensive range of services designed to meet your needs. 
                            Each service is delivered with the highest standards of quality and professionalism.
                        </p>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
                            {services.map((service) => (
                                <div key={service.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                                <service.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    ${service.price}
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">/hour</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {service.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                                            {service.description}
                                        </p>
                                        <ul className="space-y-2 mb-6">
                                            {service.features.map((feature) => (
                                                <li key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {service.duration}
                                            </div>
                                            <Link
                                                href="/contact"
                                                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium"
                                            >
                                                Get Quote
                                                <ArrowRight className="ml-1 h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white dark:bg-gray-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
                            Why Choose Our Services
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Professional excellence you can trust
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Our commitment to quality, reliability, and customer satisfaction sets us apart 
                            from the competition.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {benefits.map((benefit) => (
                                <div key={benefit.name} className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                        <benefit.icon className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                                        {benefit.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                        <p className="flex-auto">{benefit.description}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Transparent Pricing
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            No hidden fees, no surprises. Our pricing is clear and competitive.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-3">
                        {pricingPlans.map((plan) => (
                            <div key={plan.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {plan.name}
                                    </h3>
                                    <div className="mt-4 flex items-baseline justify-center">
                                        <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            ${plan.price}
                                        </span>
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            /hour
                                        </span>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                                        {plan.description}
                                    </p>
                                </div>
                                <ul className="mt-8 space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8">
                                    <Link
                                        href="/contact"
                                        className="block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 dark:bg-blue-700">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ready to get started?
                            <br />
                            Contact us for a free consultation.
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
                            Let's discuss your project requirements and find the perfect solution for your needs.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/contact"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/"
                                className="text-sm font-semibold leading-6 text-white"
                            >
                                Learn more <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

const services = [
    {
        name: 'Web Development',
        description: 'Custom web applications and websites built with modern technologies.',
        price: 75,
        duration: '2-4 weeks',
        icon: CheckCircle,
        features: [
            'Responsive design',
            'SEO optimization',
            'Performance optimization',
            'Security implementation',
            'Content management system'
        ]
    },
    {
        name: 'Mobile Development',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        price: 85,
        duration: '4-8 weeks',
        icon: CheckCircle,
        features: [
            'Native iOS/Android apps',
            'Cross-platform solutions',
            'App store optimization',
            'Push notifications',
            'Offline functionality'
        ]
    },
    {
        name: 'UI/UX Design',
        description: 'User-centered design solutions that enhance user experience.',
        price: 65,
        duration: '1-3 weeks',
        icon: CheckCircle,
        features: [
            'User research',
            'Wireframing & prototyping',
            'Visual design',
            'User testing',
            'Design systems'
        ]
    },
    {
        name: 'Digital Marketing',
        description: 'Comprehensive digital marketing strategies to grow your business.',
        price: 55,
        duration: 'Ongoing',
        icon: CheckCircle,
        features: [
            'SEO & SEM',
            'Social media marketing',
            'Content marketing',
            'Email campaigns',
            'Analytics & reporting'
        ]
    },
    {
        name: 'Consulting',
        description: 'Expert advice on technology strategy and digital transformation.',
        price: 95,
        duration: 'Flexible',
        icon: CheckCircle,
        features: [
            'Technology assessment',
            'Strategy development',
            'Process optimization',
            'Team training',
            'Ongoing support'
        ]
    },
    {
        name: 'Maintenance & Support',
        description: 'Ongoing maintenance and technical support for your applications.',
        price: 45,
        duration: 'Monthly',
        icon: CheckCircle,
        features: [
            'Bug fixes',
            'Security updates',
            'Performance monitoring',
            '24/7 support',
            'Regular backups'
        ]
    }
];

const benefits = [
    {
        name: 'Expert Team',
        description: 'Our team consists of experienced professionals with deep expertise in their respective fields.',
        icon: Star,
    },
    {
        name: 'Quality Assurance',
        description: 'We maintain rigorous quality standards throughout the development process.',
        icon: CheckCircle,
    },
    {
        name: 'Timely Delivery',
        description: 'We commit to delivering projects on time while maintaining the highest quality standards.',
        icon: Clock,
    },
];

const pricingPlans = [
    {
        name: 'Basic',
        price: 45,
        description: 'Perfect for small projects and startups',
        features: [
            'Basic consultation',
            'Standard development',
            'Email support',
            'Basic documentation'
        ]
    },
    {
        name: 'Professional',
        price: 75,
        description: 'Ideal for growing businesses',
        features: [
            'Priority consultation',
            'Advanced development',
            'Phone & email support',
            'Comprehensive documentation',
            'Performance optimization'
        ]
    },
    {
        name: 'Enterprise',
        price: 95,
        description: 'For large-scale projects',
        features: [
            'Dedicated consultant',
            'Custom development',
            '24/7 support',
            'Full documentation',
            'Performance optimization',
            'Security audit',
            'Ongoing maintenance'
        ]
    }
];
