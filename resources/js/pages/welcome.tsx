import GuestLayout from '@/layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';

export default function Welcome() {
    return (
        <GuestLayout>
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                            Welcome to{' '}
                            <span className="text-blue-600 dark:text-blue-400">Sunshine</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Your trusted partner for professional services. We provide high-quality solutions 
                            tailored to meet your specific needs with excellence and reliability.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/services"
                                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Explore Services
                                <ArrowRight className="ml-2 h-4 w-4 inline" />
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                Contact Us <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
                            Why Choose Us
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Everything you need for exceptional service
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            We pride ourselves on delivering outstanding results through our comprehensive 
                            range of services, backed by years of experience and dedicated professionals.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {features.map((feature) => (
                                <div key={feature.name} className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                        <feature.icon className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                        <p className="flex-auto">{feature.description}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-xl text-center">
                        <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600 dark:text-blue-400">
                            Testimonials
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            What our clients say
                        </p>
                    </div>
                    <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.author} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                                            <span className="text-sm font-medium text-white">
                                                {testimonial.author.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {testimonial.author}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                            Contact us today.
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
                            Let us help you achieve your goals with our professional services. 
                            Get in touch with our team to discuss your requirements.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/contact"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/services"
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

const features = [
    {
        name: 'Professional Excellence',
        description: 'Our team consists of highly skilled professionals with years of experience in their respective fields.',
        icon: CheckCircle,
    },
    {
        name: 'Quality Assurance',
        description: 'We maintain the highest standards of quality in all our services, ensuring customer satisfaction.',
        icon: CheckCircle,
    },
    {
        name: 'Reliable Support',
        description: '24/7 customer support to address your concerns and provide assistance whenever you need it.',
        icon: CheckCircle,
    },
];

const testimonials = [
    {
        content: 'Exceptional service quality and professional approach. Highly recommended!',
        author: 'Sarah Johnson',
        role: 'Business Owner',
    },
    {
        content: 'The team delivered exactly what we needed, on time and within budget.',
        author: 'Michael Chen',
        role: 'Project Manager',
    },
    {
        content: 'Outstanding customer service and attention to detail. Will definitely work with them again.',
        author: 'Emily Rodriguez',
        role: 'Marketing Director',
    },
];
