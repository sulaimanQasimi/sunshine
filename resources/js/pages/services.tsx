import { useState } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import { Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle, Clock, DollarSign, Star, Zap, Calendar, Plus, Minus } from 'lucide-react';

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

            {/* Special Offers Banner */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500">
                <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <Zap className="h-8 w-8 text-white mr-2" />
                            <h2 className="text-2xl font-bold text-white">Special Offers</h2>
                        </div>
                        <p className="text-orange-100 text-lg">
                            Limited time offers on selected services. Book now to secure your discount!
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
                                <div key={service.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                                    {service.is_special_offer && service.offer_end_date && !isOfferExpired(service.offer_end_date) && (
                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                                            <Zap className="h-4 w-4 mr-1" />
                                            Special Offer
                                        </div>
                                    )}
                                    
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="h-12 w-12 bg-cerulean-100 dark:bg-cerulean-900 rounded-lg flex items-center justify-center">
                                                <CheckCircle className="h-6 w-6 text-cerulean-600 dark:text-cerulean-400" />
                                            </div>
                                            <div className="flex items-center">
                                                {service.is_special_offer && service.special_price && !isOfferExpired(service.offer_end_date || '') ? (
                                                    <div className="text-right">
                                                        <span className="text-lg line-through text-gray-400">
                                                            {formatPrice(service.base_price)}
                                                        </span>
                                                        <span className="text-2xl font-bold text-red-600 dark:text-red-400 ml-2">
                                                            {formatPrice(service.special_price)}
                                                        </span>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">/hour</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                                            {formatPrice(service.base_price)}
                                                        </span>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">/hour</span>
                                                    </div>
                                                )}
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
                                        
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {service.duration}
                                            </div>
                                            {service.is_special_offer && service.offer_end_date && !isOfferExpired(service.offer_end_date) && (
                                                <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    Ends {new Date(service.offer_end_date).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => {
                                                    setSelectedService(service);
                                                    setSelectedItems([]);
                                                    setShowRequestModal(true);
                                                }}
                                                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cerulean-500 hover:bg-cerulean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cerulean-500"
                                            >
                                                Select Service
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </button>
                                            
                                            <Link
                                                href="/contact"
                                                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cerulean-500"
                                            >
                                                Get Quote
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
                    <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800">
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Request Service: {selectedService.name}
                                </h3>
                                <button
                                    onClick={() => setShowRequestModal(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Service Details */}
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Selected Service</h4>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-300">{selectedService.name}</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {formatPrice(selectedService.special_price || selectedService.base_price)}/hour
                                        </span>
                                    </div>
                                </div>

                                {/* Additional Items */}
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Additional Services</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                        {selectedService.additional_items?.map((item) => (
                                            <div key={item.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h5 className="font-medium text-gray-900 dark:text-white">{item.name}</h5>
                                                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                                                    </div>
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        +${Number(item.price).toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.duration}</span>
                                                    <button
                                                        onClick={() => addAdditionalItem(item)}
                                                        className="flex items-center text-cerulean-600 dark:text-cerulean-400 hover:text-cerulean-700 dark:hover:text-cerulean-300 text-sm"
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
                                        <div className="bg-cerulean-50 dark:bg-cerulean-900/20 p-4 rounded-lg">
                                            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Selected Additional Services:</h5>
                                            <div className="space-y-2">
                                                {selectedItems.map((item, index) => (
                                                    <div key={index} className="flex justify-between items-center">
                                                        <span className="text-sm text-gray-600 dark:text-gray-300">{item.name}</span>
                                                        <div className="flex items-center">
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-white mr-2">
                                                                +${Number(item.price).toFixed(2)}
                                                            </span>
                                                            <button
                                                                onClick={() => removeAdditionalItem(item.id)}
                                                                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
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
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center text-lg font-semibold text-gray-900 dark:text-white">
                                        <span>Total Estimated Cost:</span>
                                        <span>${Number(calculateTotalPrice()).toFixed(2)}/hour</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => setShowRequestModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <Link
                                        href={`/service-requests/create/${selectedService.id}`}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 text-center"
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
                        <h2 className="text-base font-semibold leading-7 text-cerulean-600 dark:text-cerulean-400">
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
                                        <benefit.icon className="h-5 w-5 flex-none text-cerulean-600 dark:text-cerulean-400" aria-hidden="true" />
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
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-cerulean-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
