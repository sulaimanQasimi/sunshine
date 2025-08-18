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
    features: string[];
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
    const { data, setData, put, processing, errors } = useForm({
        name: service.name,
        description: service.description,
        base_price: service.base_price.toString(),
        duration: service.duration,
        is_active: service.is_active,
        is_special_offer: service.is_special_offer,
        special_price: service.special_price?.toString() || '',
        offer_end_date: service.offer_end_date || '',
        features: service.features.length > 0 ? service.features : [''],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/services/${service.id}`);
    };

    const addFeature = () => {
        setData('features', [...data.features, '']);
    };

    const removeFeature = (index: number) => {
        const newFeatures = data.features.filter((_, i) => i !== index);
        setData('features', newFeatures);
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData('features', newFeatures);
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
                                        className="form-input mt-1 block w-full"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
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
                                        className="form-input mt-1 block w-full"
                                        required
                                    />
                                    {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
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
                                        className="form-textarea mt-1 block w-full"
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
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
                                        className="form-input mt-1 block w-full"
                                        required
                                    />
                                    {errors.base_price && <p className="mt-1 text-sm text-red-600">{errors.base_price}</p>}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-4 w-4 text-cerulean-600 focus:ring-cerulean-500 border-gray-300 rounded"
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
                                        className="h-4 w-4 text-cerulean-600 focus:ring-cerulean-500 border-gray-300 rounded"
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
                                                className="form-input mt-1 block w-full"
                                            />
                                            {errors.special_price && <p className="mt-1 text-sm text-red-600">{errors.special_price}</p>}
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
                                                className="form-input mt-1 block w-full"
                                            />
                                            {errors.offer_end_date && <p className="mt-1 text-sm text-red-600">{errors.offer_end_date}</p>}
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
                            <div className="space-y-3">
                                {data.features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            placeholder="Enter a feature"
                                            className="form-input flex-1"
                                        />
                                        {data.features.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(index)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="text-cerulean-600 hover:text-cerulean-800 dark:text-cerulean-400 dark:hover:text-cerulean-300 text-sm"
                                >
                                    + Add Feature
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
