import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { ArrowLeft, Save } from 'lucide-react';

interface Service {
    id: number;
    name: string;
    description: string;
    base_price: number | string;
    duration: string;
    is_active: boolean;
    is_special_offer: boolean;
    special_price?: number | string;
    offer_end_date?: string;
    features: Array<{ name: string; price: string }>;
    category?: string;
    tags?: string;
    service_area?: string;
    requirements?: string;
    included?: string;
    not_included?: string;
    preparation_time?: string;
    cancellation_policy?: string;
    additional_items?: Array<{
        id?: number;
        name: string;
        description: string;
        price: string;
        duration: string;
        is_active: boolean;
    }>;
}

interface AdminServiceEditProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role?: string;
        };
    };
    service: Service;
}

export default function AdminServiceEdit({ auth, service }: AdminServiceEditProps) {
    const { data, setData, put, processing, errors } = useForm<{
        name: string;
        description: string;
        base_price: string;
        duration: string;
        is_active: boolean;
        is_special_offer: boolean;
        special_price: string;
        offer_end_date: string;
        features: Array<{ name: string; price: string }>;
        category: string;
        tags: string;
        service_area: string;
        requirements: string;
        included: string;
        not_included: string;
        preparation_time: string;
        cancellation_policy: string;
        additional_items: Array<{
            id?: number;
            name: string;
            description: string;
            price: string;
            duration: string;
            is_active: boolean;
        }>;
    }>({
        name: service.name,
        description: service.description,
        base_price: service.base_price.toString(),
        duration: service.duration,
        is_active: service.is_active,
        is_special_offer: service.is_special_offer,
        special_price: service.special_price?.toString() || '',
        offer_end_date: service.offer_end_date || '',
        features: service.features.length > 0 ? service.features : [{ name: '', price: '' }],
        category: service.category || '',
        tags: service.tags || '',
        service_area: service.service_area || '',
        requirements: service.requirements || '',
        included: service.included || '',
        not_included: service.not_included || '',
        preparation_time: service.preparation_time || '',
        cancellation_policy: service.cancellation_policy || '',
        additional_items: service.additional_items && service.additional_items.length > 0 ? service.additional_items : [{ name: '', description: '', price: '', duration: '', is_active: true }],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/services/${service.id}`);
    };

    const addFeature = () => {
        setData('features', [...data.features, { name: '', price: '' }]);
    };

    const removeFeature = (index: number) => {
        const newFeatures = data.features.filter((_, i) => i !== index);
        setData('features', newFeatures);
    };

    const updateFeature = (index: number, field: 'name' | 'price', value: string) => {
        const newFeatures = [...data.features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setData('features', newFeatures);
    };

    const addAdditionalItem = () => {
        setData('additional_items', [...data.additional_items, { name: '', description: '', price: '', duration: '', is_active: true }]);
    };

    const removeAdditionalItem = (index: number) => {
        const newItems = data.additional_items.filter((_, i) => i !== index);
        setData('additional_items', newItems);
    };

    const updateAdditionalItem = (index: number, field: string, value: string | boolean) => {
        const newItems = [...data.additional_items];
        newItems[index] = { ...newItems[index], [field]: value };
        setData('additional_items', newItems);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin - Edit Service" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center space-x-3">
                            <a
                                href="/admin/services"
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </a>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Edit Service
                            </h1>
                        </div>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            Update service information
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        {/* Basic Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Service Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Duration *
                                    </label>
                                    <input
                                        type="text"
                                        id="duration"
                                        value={data.duration}
                                        onChange={(e) => setData('duration', e.target.value)}
                                        placeholder="e.g., 2 hours, 1 day"
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                        required
                                    />
                                    {errors.duration && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.duration}</p>}
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Description *
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Pricing
                            </h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="base_price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Base Price ($) *
                                    </label>
                                    <input
                                        type="number"
                                        id="base_price"
                                        step="0.01"
                                        min="0"
                                        value={data.base_price}
                                        onChange={(e) => setData('base_price', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                        required
                                    />
                                    {errors.base_price && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.base_price}</p>}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-4 w-4 text-cerulean-600 focus:ring-cerulean-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                                    />
                                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Active Service
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Special Offer */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Special Offer (Optional)
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_special_offer"
                                        checked={data.is_special_offer}
                                        onChange={(e) => setData('is_special_offer', e.target.checked)}
                                        className="h-4 w-4 text-cerulean-600 focus:ring-cerulean-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                                    />
                                    <label htmlFor="is_special_offer" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Enable Special Offer
                                    </label>
                                </div>

                                {data.is_special_offer && (
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="special_price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Special Price ($)
                                            </label>
                                            <input
                                                type="number"
                                                id="special_price"
                                                step="0.01"
                                                min="0"
                                                value={data.special_price}
                                                onChange={(e) => setData('special_price', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                            />
                                            {errors.special_price && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.special_price}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="offer_end_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Offer End Date
                                            </label>
                                            <input
                                                type="date"
                                                id="offer_end_date"
                                                value={data.offer_end_date}
                                                onChange={(e) => setData('offer_end_date', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                            />
                                            {errors.offer_end_date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.offer_end_date}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Features
                            </h3>
                            <div className="space-y-4">
                                {data.features.map((feature, index) => (
                                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Feature Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={feature.name}
                                                    onChange={(e) => updateFeature(index, 'name', e.target.value)}
                                                    placeholder="Enter feature name"
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="w-32">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Price ($)
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={feature.price}
                                                    onChange={(e) => updateFeature(index, 'price', e.target.value)}
                                                    placeholder="0.00"
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                                />
                                            </div>
                                            {data.features.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className="mt-6 px-3 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 border border-red-300 dark:border-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center text-gray-500 dark:text-gray-400 hover:border-cerulean-500 hover:text-cerulean-600 dark:hover:text-cerulean-400 transition-colors"
                                >
                                    + Add Feature
                                </button>
                            </div>
                        </div>

                        {/* Service Details */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Service Details
                            </h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="e.g., Cleaning, Maintenance"
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                    />
                                    {errors.category && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>}
                                </div>

                                <div>
                                    <label htmlFor="preparation_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Preparation Time
                                    </label>
                                    <input
                                        type="text"
                                        id="preparation_time"
                                        value={data.preparation_time}
                                        onChange={(e) => setData('preparation_time', e.target.value)}
                                        placeholder="e.g., 30 minutes, 1 hour"
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                    />
                                    {errors.preparation_time && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.preparation_time}</p>}
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        id="tags"
                                        value={data.tags}
                                        onChange={(e) => setData('tags', e.target.value)}
                                        placeholder="e.g., eco-friendly, deep-clean, residential"
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                    />
                                    {errors.tags && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tags}</p>}
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="service_area" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Service Area
                                    </label>
                                    <textarea
                                        id="service_area"
                                        rows={3}
                                        value={data.service_area}
                                        onChange={(e) => setData('service_area', e.target.value)}
                                        placeholder="Describe the areas covered by this service"
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                    />
                                    {errors.service_area && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.service_area}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Service Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Service Information
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Requirements
                                    </label>
                                    <textarea
                                        id="requirements"
                                        rows={3}
                                        value={data.requirements}
                                        onChange={(e) => setData('requirements', e.target.value)}
                                        placeholder="List any specific requirements or preparations needed"
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                    />
                                    {errors.requirements && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.requirements}</p>}
                                </div>

                                <div>
                                    <label htmlFor="included" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        What's Included
                                    </label>
                                    <textarea
                                        id="included"
                                        rows={3}
                                        value={data.included}
                                        onChange={(e) => setData('included', e.target.value)}
                                        placeholder="List what is included in this service"
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                    />
                                    {errors.included && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.included}</p>}
                                </div>

                                <div>
                                    <label htmlFor="not_included" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        What's Not Included
                                    </label>
                                    <textarea
                                        id="not_included"
                                        rows={3}
                                        value={data.not_included}
                                        onChange={(e) => setData('not_included', e.target.value)}
                                        placeholder="List what is not included in this service"
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                    />
                                    {errors.not_included && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.not_included}</p>}
                                </div>

                                <div>
                                    <label htmlFor="cancellation_policy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Cancellation Policy
                                    </label>
                                    <textarea
                                        id="cancellation_policy"
                                        rows={3}
                                        value={data.cancellation_policy}
                                        onChange={(e) => setData('cancellation_policy', e.target.value)}
                                        placeholder="Describe the cancellation policy for this service"
                                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                    />
                                    {errors.cancellation_policy && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cancellation_policy}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Additional Items */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Additional Items
                            </h3>
                            <div className="space-y-4">
                                {data.additional_items.map((item, index) => (
                                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Item Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.name}
                                                    onChange={(e) => updateAdditionalItem(index, 'name', e.target.value)}
                                                    placeholder="Enter item name"
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Price ($) *
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={item.price}
                                                    onChange={(e) => updateAdditionalItem(index, 'price', e.target.value)}
                                                    placeholder="0.00"
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Duration
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.duration}
                                                    onChange={(e) => updateAdditionalItem(index, 'duration', e.target.value)}
                                                    placeholder="e.g., 30 minutes"
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="sm:col-span-2 lg:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={item.description}
                                                    onChange={(e) => updateAdditionalItem(index, 'description', e.target.value)}
                                                    placeholder="Describe this additional item..."
                                                    rows={2}
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-1 focus:ring-cerulean-500 sm:text-sm resize-none"
                                                />
                                            </div>
                                            <div className="sm:col-span-2 lg:col-span-3 flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`item-active-${index}`}
                                                        checked={item.is_active}
                                                        onChange={(e) => updateAdditionalItem(index, 'is_active', e.target.checked)}
                                                        className="h-4 w-4 text-cerulean-600 focus:ring-cerulean-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                                                    />
                                                    <label htmlFor={`item-active-${index}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                                        Active
                                                    </label>
                                                </div>
                                                {data.additional_items.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeAdditionalItem(index)}
                                                        className="px-3 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 border border-red-300 dark:border-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addAdditionalItem}
                                    className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center text-gray-500 dark:text-gray-400 hover:border-cerulean-500 hover:text-cerulean-600 dark:hover:text-cerulean-400 transition-colors"
                                >
                                    + Add Additional Item
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end space-x-3">
                            <a
                                href="/admin/services"
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cerulean-500"
                            >
                                Cancel
                            </a>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cerulean-500 hover:bg-cerulean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cerulean-500 disabled:opacity-50"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                {processing ? 'Updating...' : 'Update Service'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
