import GuestLayout from '@/layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Star, Sparkles, Users, Shield, Clock, Award, Zap, Heart } from 'lucide-react';

export default function Welcome() {
    return (
        <GuestLayout>
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-cerulean-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-cerulean-200 dark:bg-cerulean-800 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full blur-xl animate-pulse delay-500"></div>

                <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mb-8 inline-flex items-center rounded-full bg-cerulean-100 dark:bg-cerulean-900 px-4 py-2 text-sm font-medium text-cerulean-700 dark:text-cerulean-300">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Professional Services Platform
                        </div>
                        
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
                            Welcome to{' '}
                            <span className="bg-gradient-to-r from-cerulean-600 to-blue-600 bg-clip-text text-transparent">
                                Sunshine
                            </span>
                        </h1>
                        
                        <p className="mt-8 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Your trusted partner for professional services. We provide high-quality solutions 
                            tailored to meet your specific needs with excellence, reliability, and innovation.
                        </p>
                        
                        <div className="mt-12 flex items-center justify-center gap-x-6">
                            <Link
                                href="/services"
                                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-cerulean-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <span>Explore Services</span>
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="group text-lg font-semibold text-gray-900 dark:text-white hover:text-cerulean-600 dark:hover:text-cerulean-400 transition-colors"
                            >
                                Contact Us 
                                <ArrowRight className="ml-2 h-4 w-4 inline group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cerulean-600 dark:text-cerulean-400">500+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cerulean-600 dark:text-cerulean-400">50+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Services</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cerulean-600 dark:text-cerulean-400">24/7</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 sm:py-32 bg-white dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-300">
                            <Award className="mr-2 h-4 w-4" />
                            Why Choose Us
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                            Everything you need for{' '}
                            <span className="bg-gradient-to-r from-cerulean-600 to-blue-600 bg-clip-text text-transparent">
                                exceptional service
                            </span>
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            We pride ourselves on delivering outstanding results through our comprehensive 
                            range of services, backed by years of experience and dedicated professionals.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <div 
                                    key={feature.name} 
                                    className="group relative bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-600"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cerulean-50 to-blue-50 dark:from-cerulean-900/20 dark:to-blue-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative">
                                        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-xl shadow-lg">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white mb-4">
                                            {feature.name}
                                        </h3>
                                        <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Preview */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900 px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300">
                            <Zap className="mr-2 h-4 w-4" />
                            Our Services
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                            Professional solutions for{' '}
                            <span className="bg-gradient-to-r from-cerulean-600 to-blue-600 bg-clip-text text-transparent">
                                every need
                            </span>
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            From cleaning services to specialized maintenance, we offer comprehensive solutions 
                            tailored to your requirements.
                        </p>
                    </div>
                    
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div key={service.name} className="group bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                                <div className="mb-4 inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-lg">
                                    <service.icon className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {service.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {service.description}
                                </p>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center text-sm font-medium text-cerulean-600 dark:text-cerulean-400 hover:text-cerulean-700 dark:hover:text-cerulean-300 group-hover:translate-x-1 transition-transform"
                                >
                                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-white dark:bg-gray-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-xl text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900 px-4 py-2 text-sm font-medium text-yellow-700 dark:text-yellow-300">
                            <Heart className="mr-2 h-4 w-4" />
                            Testimonials
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                            What our{' '}
                            <span className="bg-gradient-to-r from-cerulean-600 to-blue-600 bg-clip-text text-transparent">
                                clients say
                            </span>
                        </h2>
                    </div>
                    <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <div 
                                    key={testimonial.author} 
                                    className="group bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-600"
                                >
                                    <div className="flex items-center gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <blockquote className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                                        "{testimonial.content}"
                                    </blockquote>
                                    <div className="flex items-center">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-cerulean-500 to-blue-500 flex items-center justify-center shadow-lg">
                                            <span className="text-sm font-bold text-white">
                                                {testimonial.author.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div className="ml-4">
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
            <div className="relative bg-gradient-to-r from-cerulean-600 to-blue-600 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                
                <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Ready to get started?
                            <br />
                            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                Contact us today.
                            </span>
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
                            Let us help you achieve your goals with our professional services. 
                            Get in touch with our team to discuss your requirements.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-cerulean-600 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/services"
                                className="text-lg font-semibold leading-6 text-white hover:text-blue-100 transition-colors"
                            >
                                Learn more <ArrowRight className="ml-2 h-4 w-4 inline" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    .bg-grid-pattern {
                        background-image: radial-gradient(circle, #000 1px, transparent 1px);
                        background-size: 20px 20px;
                    }
                `
            }} />
        </GuestLayout>
    );
}

const features = [
    {
        name: 'Professional Excellence',
        description: 'Our team consists of highly skilled professionals with years of experience in their respective fields, ensuring top-quality results.',
        icon: Award,
    },
    {
        name: 'Quality Assurance',
        description: 'We maintain the highest standards of quality in all our services, with rigorous quality control processes and customer satisfaction guarantees.',
        icon: Shield,
    },
    {
        name: 'Reliable Support',
        description: '24/7 customer support to address your concerns and provide assistance whenever you need it, ensuring peace of mind.',
        icon: Clock,
    },
];

const services = [
    {
        name: 'Cleaning Services',
        description: 'Professional cleaning solutions for homes and businesses with eco-friendly products.',
        icon: Sparkles,
    },
    {
        name: 'Maintenance',
        description: 'Comprehensive maintenance services to keep your property in perfect condition.',
        icon: Shield,
    },
    {
        name: 'Specialized Care',
        description: 'Customized services tailored to your specific needs and requirements.',
        icon: Heart,
    },
];

const testimonials = [
    {
        content: 'Exceptional service quality and professional approach. The team went above and beyond our expectations. Highly recommended!',
        author: 'Sarah Johnson',
        role: 'Business Owner',
    },
    {
        content: 'The team delivered exactly what we needed, on time and within budget. Their attention to detail is outstanding.',
        author: 'Michael Chen',
        role: 'Project Manager',
    },
    {
        content: 'Outstanding customer service and attention to detail. Will definitely work with them again for future projects.',
        author: 'Emily Rodriguez',
        role: 'Marketing Director',
    },
];
