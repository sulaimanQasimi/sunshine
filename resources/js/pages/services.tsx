import { useState } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Clock, DollarSign, Star, Zap, Calendar, Plus, Minus, Sparkles, Shield, Award, Users, Heart } from 'lucide-react';

interface Service {
    id: number;
    name: string;
    description: string;
    base_price: number | string;
    duration: string;
    icon: any;
    features: string[];
    is_special_offer?: boolean;
    special_price?: number | string;
    offer_end_date?: string;
    additional_items?: AdditionalItem[];
}

interface AdditionalItem {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: string;
}

interface ServicesProps {
    services: Service[];
}

export default function Services({ services }: ServicesProps) {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedItems, setSelectedItems] = useState<AdditionalItem[]>([]);
    const [showRequestModal, setShowRequestModal] = useState(false);

    const addAdditionalItem = (item: AdditionalItem) => {
        setSelectedItems([...selectedItems, item]);
    };

    const removeAdditionalItem = (itemId: number) => {
        setSelectedItems(selectedItems.filter(item => item.id !== itemId));
    };

    const calculateTotalPrice = () => {
        if (!selectedService) return 0;
        const basePrice = typeof selectedService.special_price === 'string' 
            ? parseFloat(selectedService.special_price) 
            : (selectedService.special_price || 0);
        const actualBasePrice = typeof selectedService.base_price === 'string' 
            ? parseFloat(selectedService.base_price) 
            : selectedService.base_price;
        const finalBasePrice = basePrice || actualBasePrice;
        const additionalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
        return finalBasePrice + additionalPrice;
    };

    const isOfferExpired = (endDate: string) => {
        return new Date(endDate) < new Date();
    };

    const formatPrice = (price: number | string | null | undefined) => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return `$${(numPrice || 0).toFixed(2)}`;
    };

    return (
        <GuestLayout title="Our Services">
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
                            Professional Services
                        </div>
                        
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
                            Our{' '}
                            <span className="bg-gradient-to-r from-cerulean-600 to-blue-600 bg-clip-text text-transparent">
                                Services
                            </span>
                        </h1>
                        
                        <p className="mt-8 text-xl leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            We offer a comprehensive range of services designed to meet your needs. 
                            Each service is delivered with the highest standards of quality and professionalism.
                        </p>
                    </div>
                </div>
            </div>

            {/* Special Offers Banner */}
            <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                
                <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-6">
                            <div className="p-3 bg-white/20 rounded-full mr-4">
                                <Zap className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">Special Offers</h2>
                        </div>
                        <p className="text-orange-100 text-xl max-w-2xl mx-auto">
                            Limited time offers on selected services. Book now to secure your discount and enjoy premium quality at unbeatable prices!
                        </p>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
                            {services.map((service) => (
                                <div key={service.id} className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
                                    {service.is_special_offer && service.offer_end_date && !isOfferExpired(service.offer_end_date) && (
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg z-10">
                                            <Zap className="h-4 w-4 mr-2" />
                                            Special Offer
                                        </div>
                                    )}
                                    
                                    <div className="p-8">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="h-14 w-14 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <CheckCircle className="h-7 w-7 text-white" />
                                            </div>
                                            <div className="flex items-center">
                                                {service.is_special_offer && service.special_price && !isOfferExpired(service.offer_end_date || '') ? (
                                                    <div className="text-right">
                                                        <span className="text-lg line-through text-gray-400">
                                                            {formatPrice(service.base_price)}
                                                        </span>
                                                        <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent ml-2">
                                                            {formatPrice(service.special_price)}
                                                        </span>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">/hour</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <span className="text-3xl font-bold bg-gradient-to-r from-cerulean-600 to-blue-600 bg-clip-text text-transparent">
                                                            {formatPrice(service.base_price)}
                                                        </span>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">/hour</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                            {service.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                                            {service.description}
                                        </p>
                                        
                                        <ul className="space-y-3 mb-8">
                                            {service.features.map((feature) => (
                                                <li key={feature} className="flex items-center text-gray-600 dark:text-gray-300">
                                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                                    <span className="text-base">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <Clock className="h-4 w-4 mr-2" />
                                                {service.duration}
                                            </div>
                                            {service.is_special_offer && service.offer_end_date && !isOfferExpired(service.offer_end_date) && (
                                                <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                                                    <Calendar className="h-4 w-4 mr-2" />
                                                    Ends {new Date(service.offer_end_date).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <button
                                                onClick={() => {
                                                    setSelectedService(service);
                                                    setSelectedItems([]);
                                                    setShowRequestModal(true);
                                                }}
                                                className="group w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-cerulean-600 to-blue-600 hover:from-cerulean-700 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-300"
                                            >
                                                <span>Select Service</span>
                                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            
                                            <Link
                                                href="/contact"
                                                className="group w-full flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-base font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transform hover:-translate-y-1 transition-all duration-300"
                                            >
                                                Get Quote
                                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Request Modal */}
            {showRequestModal && selectedService && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-8 border w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl bg-white dark:bg-gray-800">
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Request Service: {selectedService.name}
                                </h3>
                                <button
                                    onClick={() => setShowRequestModal(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <div className="space-y-8">
                                {/* Service Details */}
                                <div className="bg-gradient-to-r from-cerulean-50 to-blue-50 dark:from-cerulean-900/20 dark:to-blue-900/20 p-6 rounded-xl">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Selected Service</h4>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-300 text-lg">{selectedService.name}</span>
                                        <span className="font-bold text-gray-900 dark:text-white text-xl">
                                            {formatPrice(selectedService.special_price || selectedService.base_price)}/hour
                                        </span>
                                    </div>
                                </div>

                                {/* Additional Items */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Additional Services</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        {selectedService.additional_items?.map((item) => (
                                            <div key={item.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-lg transition-shadow">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h5 className="font-semibold text-gray-900 dark:text-white">{item.name}</h5>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                        +${Number(item.price).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.duration}</span>
                                                    <button
                                                        onClick={() => addAdditionalItem(item)}
                                                        className="flex items-center text-cerulean-600 dark:text-cerulean-400 hover:text-cerulean-700 dark:hover:text-cerulean-300 text-sm font-medium"
                                                    >
                                                        <Plus className="h-4 w-4 mr-1" />
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Selected Additional Items */}
                                    {selectedItems.length > 0 && (
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl">
                                            <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Selected Additional Services:</h5>
                                            <div className="space-y-3">
                                                {selectedItems.map((item, index) => (
                                                    <div key={index} className="flex justify-between items-center">
                                                        <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                                                        <div className="flex items-center">
                                                            <span className="font-semibold text-gray-900 dark:text-white mr-3">
                                                                +${Number(item.price).toFixed(2)}
                                                            </span>
                                                            <button
                                                                onClick={() => removeAdditionalItem(item.id)}
                                                                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Total */}
                                <div className="border-t pt-6">
                                    <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white">
                                        <span>Total Estimated Cost:</span>
                                        <span className="bg-gradient-to-r from-cerulean-600 to-blue-600 bg-clip-text text-transparent">
                                            ${Number(calculateTotalPrice()).toFixed(2)}/hour
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setShowRequestModal(false)}
                                        className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <Link
                                        href={`/service-requests/create/${selectedService.id}`}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-cerulean-600 to-blue-600 text-white rounded-xl text-base font-semibold hover:from-cerulean-700 hover:to-blue-700 text-center transform hover:-translate-y-1 transition-all duration-300"
                                    >
                                        Request Service
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Why Choose Us */}
            <div className="bg-white dark:bg-gray-800 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-300">
                            <Award className="mr-2 h-4 w-4" />
                            Why Choose Our Services
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                            Professional excellence you can{' '}
                            <span className="bg-gradient-to-r from-cerulean-600 to-blue-600 bg-clip-text text-transparent">
                                trust
                            </span>
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Our commitment to quality, reliability, and customer satisfaction sets us apart 
                            from the competition.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                            {benefits.map((benefit) => (
                                <div key={benefit.name} className="group relative bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-600">
                                    <div className="absolute inset-0 bg-gradient-to-r from-cerulean-50 to-blue-50 dark:from-cerulean-900/20 dark:to-blue-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative">
                                        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-xl shadow-lg">
                                            <benefit.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white mb-4">
                                            {benefit.name}
                                        </h3>
                                        <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
                                            {benefit.description}
                                        </p>
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
                                Contact us for a free consultation.
                            </span>
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
                            Let's discuss your project requirements and find the perfect solution for your needs.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-cerulean-600 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <span>Contact Us</span>
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/"
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

const benefits = [
    {
        name: 'Expert Team',
        description: 'Our team consists of experienced professionals with deep expertise in their respective fields, ensuring top-quality results.',
        icon: Users,
    },
    {
        name: 'Quality Assurance',
        description: 'We maintain rigorous quality standards throughout the development process with comprehensive testing and validation.',
        icon: Shield,
    },
    {
        name: 'Timely Delivery',
        description: 'We commit to delivering projects on time while maintaining the highest quality standards and exceeding expectations.',
        icon: Clock,
    },
];
