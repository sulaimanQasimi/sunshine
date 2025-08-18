import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Plus, Edit, Trash2, Eye, Calendar, DollarSign, Clock } from 'lucide-react';

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
    created_at: string;
    updated_at: string;
    additional_items_count: number;
}

interface AdminServicesProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role?: string;
        };
    };
    services: {
        data: Service[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function AdminServices({ auth, services }: AdminServicesProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatPrice = (price: number | string | null | undefined) => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return `$${(numPrice || 0).toFixed(2)}`;
    };

    const isOfferExpired = (endDate: string) => {
        return new Date(endDate) < new Date();
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin - Services Management" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Services Management
                        </h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            Manage all services and their pricing
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Link
                            href="/admin/services/create"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cerulean-500 hover:bg-cerulean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cerulean-500"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Service
                        </Link>
                    </div>
                </div>

                {/* Services List */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Service
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Pricing
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Additional Items
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {services.data.map((service) => (
                                    <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {service.name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                {service.description.length > 100 
                                                    ? `${service.description.substring(0, 100)}...` 
                                                    : service.description
                                                }
                                            </div>
                                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                Created: {formatDate(service.created_at)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {formatPrice(service.base_price)}
                                            </div>
                                            {service.is_special_offer && service.special_price && (
                                                <div className="text-sm text-green-600 dark:text-green-400">
                                                    Special: {formatPrice(service.special_price)}
                                                </div>
                                            )}
                                            {service.is_special_offer && service.offer_end_date && (
                                                <div className={`text-xs ${isOfferExpired(service.offer_end_date) ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'}`}>
                                                    {isOfferExpired(service.offer_end_date) ? 'Expired' : `Ends: ${formatDate(service.offer_end_date)}`}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {service.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                service.is_active 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                            }`}>
                                                {service.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {service.additional_items_count} items
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    href={`/admin/services/${service.id}`}
                                                    className="text-cerulean-600 hover:text-cerulean-900 dark:text-cerulean-400 dark:hover:text-cerulean-300"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/services/${service.id}/edit`}
                                                    className="text-desert_sand-600 hover:text-desert_sand-900 dark:text-desert_sand-400 dark:hover:text-desert_sand-300"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {services.last_page > 1 && (
                        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </a>
                                <a
                                    href="#"
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </a>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        Showing{' '}
                                        <span className="font-medium">{(services.current_page - 1) * services.per_page + 1}</span>
                                        {' '}to{' '}
                                        <span className="font-medium">
                                            {Math.min(services.current_page * services.per_page, services.total)}
                                        </span>
                                        {' '}of{' '}
                                        <span className="font-medium">{services.total}</span>
                                        {' '}results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            Previous
                                        </a>
                                        <a
                                            href="#"
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            Next
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
