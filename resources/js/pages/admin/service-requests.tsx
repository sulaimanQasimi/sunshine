import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Calendar, Clock, MapPin, Phone, Mail, CheckCircle, XCircle, Clock as ClockIcon, Eye, Edit } from 'lucide-react';

interface ServiceRequest {
    id: number;
    service: {
        id: number;
        name: string;
        base_price: number;
    };
    user: {
        id: number;
        name: string;
        email: string;
    };
    status: string;
    total_price: number;
    scheduled_date: string;
    scheduled_time: string;
    client_name: string;
    client_email: string;
    client_phone: string;
    client_address: string;
    client_house_number: string;
    additional_notes: string;
    is_confirmed: boolean;
    created_at: string;
    additional_items: Array<{
        id: number;
        name: string;
        price: number;
    }>;
}

interface AdminServiceRequestsProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role?: string;
        };
    };
    serviceRequests: {
        data: ServiceRequest[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function AdminServiceRequests({ auth, serviceRequests }: AdminServiceRequestsProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'in_progress':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <ClockIcon className="h-4 w-4" />;
            case 'confirmed':
                return <CheckCircle className="h-4 w-4" />;
            case 'in_progress':
                return <Clock className="h-4 w-4" />;
            case 'completed':
                return <CheckCircle className="h-4 w-4" />;
            case 'cancelled':
                return <XCircle className="h-4 w-4" />;
            default:
                return <ClockIcon className="h-4 w-4" />;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeString: string) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatStatus = (status: string) => {
        return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin - Service Requests" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Service Requests Management
                        </h1>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            Manage all service requests from customers
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <div className="flex items-center space-x-3">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Total: {serviceRequests.total} requests
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Requests List */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Request
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Service & Schedule
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {serviceRequests.data.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                #{request.id}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {formatDate(request.created_at)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {request.client_name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {request.client_email}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {request.client_phone}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {request.service.name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                {formatDate(request.scheduled_date)}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {formatTime(request.scheduled_time)}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {request.client_house_number}, {request.client_address}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                                {getStatusIcon(request.status)}
                                                <span className="ml-1">{formatStatus(request.status)}</span>
                                            </span>
                                            {!request.is_confirmed && (
                                                <div className="mt-1">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                                                        Awaiting Confirmation
                                                    </span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            ${request.total_price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <button className="text-cerulean-600 hover:text-cerulean-900 dark:text-cerulean-400 dark:hover:text-cerulean-300">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="text-desert_sand-600 hover:text-desert_sand-900 dark:text-desert_sand-400 dark:hover:text-desert_sand-300">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {serviceRequests.last_page > 1 && (
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
                                        <span className="font-medium">{(serviceRequests.current_page - 1) * serviceRequests.per_page + 1}</span>
                                        {' '}to{' '}
                                        <span className="font-medium">
                                            {Math.min(serviceRequests.current_page * serviceRequests.per_page, serviceRequests.total)}
                                        </span>
                                        {' '}of{' '}
                                        <span className="font-medium">{serviceRequests.total}</span>
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
