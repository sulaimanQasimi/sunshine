import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Calendar, Clock, MapPin, Phone, Mail, User, FileText, CheckCircle } from 'lucide-react';

interface ServiceRequestProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role?: string;
        };
    };
    service: {
        id: number;
        name: string;
        description: string;
        base_price: number;
        special_price?: number;
        is_special_offer?: boolean;
        offer_end_date?: string;
        additional_items?: Array<{
            id: number;
            name: string;
            description: string;
            price: number;
            duration: string;
        }>;
    };
}

export default function ServiceRequest({ auth, service }: ServiceRequestProps) {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [step, setStep] = useState(1);

    const { data, setData, post, processing, errors } = useForm({
        service_id: service.id,
        selected_additional_items: [],
        description: '',
        client_name: auth.user.name,
        client_email: auth.user.email,
        client_phone: '',
        client_address: '',
        house_number: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'USA',
        preferred_date: '',
        preferred_time: '',
        special_requirements: '',
        additional_notes: '',
    });

    const addAdditionalItem = (itemId: number) => {
        if (!selectedItems.includes(itemId)) {
            setSelectedItems([...selectedItems, itemId]);
            setData('selected_additional_items', [...selectedItems, itemId]);
        }
    };

    const removeAdditionalItem = (itemId: number) => {
        setSelectedItems(selectedItems.filter(id => id !== itemId));
        setData('selected_additional_items', selectedItems.filter(id => id !== itemId));
    };

    const calculateTotalPrice = () => {
        const basePrice = service.special_price || service.base_price;
        const additionalPrice = service.additional_items
            ?.filter(item => selectedItems.includes(item.id))
            .reduce((sum, item) => sum + item.price, 0) || 0;
        return basePrice + additionalPrice;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/service-requests');
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Request Service" />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg mb-8">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Request Service: {service.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Please fill out the form below to request this service. We'll review your request and get back to you soon.
                        </p>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg mb-8">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div className={`flex items-center ${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-600 dark:border-blue-400 bg-blue-600 dark:bg-blue-400 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                    {step > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
                                </div>
                                <span className="ml-2 text-sm font-medium">Service Details</span>
                            </div>
                            <div className={`flex items-center ${step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-blue-600 dark:border-blue-400 bg-blue-600 dark:bg-blue-400 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                    {step > 2 ? <CheckCircle className="h-4 w-4" /> : '2'}
                                </div>
                                <span className="ml-2 text-sm font-medium">Contact Information</span>
                            </div>
                            <div className={`flex items-center ${step >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-blue-600 dark:border-blue-400 bg-blue-600 dark:bg-blue-400 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                    {step > 3 ? <CheckCircle className="h-4 w-4" /> : '3'}
                                </div>
                                <span className="ml-2 text-sm font-medium">Schedule & Notes</span>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Step 1: Service Details */}
                    {step === 1 && (
                        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Service Details</h2>
                                
                                {/* Selected Service */}
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Selected Service</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-300">{service.name}</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            ${service.special_price || service.base_price}/hour
                                        </span>
                                    </div>
                                    {service.is_special_offer && service.special_price && (
                                        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            Special offer! Original price: ${service.base_price}/hour
                                        </div>
                                    )}
                                </div>

                                {/* Additional Items */}
                                {service.additional_items && service.additional_items.length > 0 && (
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">Additional Services</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {service.additional_items.map((item) => (
                                                <div key={item.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                                                            <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                                                        </div>
                                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                            +${item.price}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.duration}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => selectedItems.includes(item.id) ? removeAdditionalItem(item.id) : addAdditionalItem(item.id)}
                                                            className={`px-3 py-1 rounded text-sm font-medium ${
                                                                selectedItems.includes(item.id)
                                                                    ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                                                                    : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                                            }`}
                                                        >
                                                            {selectedItems.includes(item.id) ? 'Remove' : 'Add'}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Description */}
                                <div className="mt-6">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Project Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="form-textarea"
                                        placeholder="Please describe your project requirements..."
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                                    )}
                                </div>

                                {/* Total Price */}
                                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="flex justify-between items-center text-lg font-semibold text-gray-900 dark:text-white">
                                        <span>Total Estimated Cost:</span>
                                        <span>${calculateTotalPrice()}/hour</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Contact Information */}
                    {step === 2 && (
                        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="client_name"
                                            name="client_name"
                                            value={data.client_name}
                                            onChange={(e) => setData('client_name', e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                        {errors.client_name && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.client_name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="client_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="client_email"
                                            name="client_email"
                                            value={data.client_email}
                                            onChange={(e) => setData('client_email', e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                        {errors.client_email && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.client_email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="client_phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="client_phone"
                                            name="client_phone"
                                            value={data.client_phone}
                                            onChange={(e) => setData('client_phone', e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                        {errors.client_phone && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.client_phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="house_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            House/Apartment Number
                                        </label>
                                        <input
                                            type="text"
                                            id="house_number"
                                            name="house_number"
                                            value={data.house_number}
                                            onChange={(e) => setData('house_number', e.target.value)}
                                            className="form-input"
                                        />
                                        {errors.house_number && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.house_number}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="client_address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            id="client_address"
                                            name="client_address"
                                            value={data.client_address}
                                            onChange={(e) => setData('client_address', e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                        {errors.client_address && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.client_address}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                        {errors.city && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            value={data.state}
                                            onChange={(e) => setData('state', e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                        {errors.state && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.state}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            id="postal_code"
                                            name="postal_code"
                                            value={data.postal_code}
                                            onChange={(e) => setData('postal_code', e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                        {errors.postal_code && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.postal_code}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            value={data.country}
                                            onChange={(e) => setData('country', e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                        {errors.country && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.country}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Schedule & Notes */}
                    {step === 3 && (
                        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Schedule & Additional Information</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Preferred Date
                                        </label>
                                        <input
                                            type="date"
                                            id="preferred_date"
                                            name="preferred_date"
                                            value={data.preferred_date}
                                            onChange={(e) => setData('preferred_date', e.target.value)}
                                            className="form-input"
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                        {errors.preferred_date && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.preferred_date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Preferred Time
                                        </label>
                                        <input
                                            type="time"
                                            id="preferred_time"
                                            name="preferred_time"
                                            value={data.preferred_time}
                                            onChange={(e) => setData('preferred_time', e.target.value)}
                                            className="form-input"
                                            required
                                        />
                                        {errors.preferred_time && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.preferred_time}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="special_requirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Special Requirements
                                        </label>
                                        <textarea
                                            id="special_requirements"
                                            name="special_requirements"
                                            rows={3}
                                            value={data.special_requirements}
                                            onChange={(e) => setData('special_requirements', e.target.value)}
                                            className="form-textarea"
                                            placeholder="Any special requirements or constraints..."
                                        />
                                        {errors.special_requirements && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.special_requirements}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="additional_notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            id="additional_notes"
                                            name="additional_notes"
                                            rows={3}
                                            value={data.additional_notes}
                                            onChange={(e) => setData('additional_notes', e.target.value)}
                                            className="form-textarea"
                                            placeholder="Any additional information you'd like to share..."
                                        />
                                        {errors.additional_notes && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.additional_notes}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Submitting...' : 'Submit Request'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
