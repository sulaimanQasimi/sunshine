import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Calendar, Clock, MapPin, Phone, Mail, CheckCircle, XCircle, Clock as ClockIcon } from 'lucide-react';

interface ServiceRequest {
    id: number;
    service: {
        id: number;
        name: string;
        description: string;
    };
    status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
    base_price: number;
    total_price: number;
    selected_additional_items: number[];
    description: string;
    client_name: string;
    client_email: string;
    client_phone: string;
    client_address: string;
    house_number: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    preferred_date: string;
    preferred_time: string;
    special_requirements: string;
    additional_notes: string;
    client_confirmed: boolean;
    confirmed_at: string | null;
    created_at: string;
    updated_at: string;
}

interface MyServiceRequestsProps {
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

export default function MyServiceRequests({ auth, serviceRequests }: MyServiceRequestsProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'approved':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'in_progress':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
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
            case 'approved':
                return <CheckCircle className="h-4 w-4" />;
            case 'in_progress':
                return <ClockIcon className="h-4 w-4" />;
            case 'completed':
                return <CheckCircle className="h-4 w-4" />;
            case 'cancelled':
                return <XCircle className="h-4 w-4" />;
            default:
                return <ClockIcon className="h-4 w-4" />;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatTime = (timeString: string) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Service Requests" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg mb-8">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            My Service Requests
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Track the status of your service requests and manage your bookings.
                        </p>
                    </div>
                </div>

                {/* Service Requests List */}
                <div className="space-y-6">
                    {serviceRequests.data.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
                            <div className="text-gray-400 dark:text-gray-500 mb-4">
                                <ClockIcon className="h-12 w-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No service requests yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                You haven't submitted any service requests yet. Browse our services to get started.
                            </p>
                            <a
                                href="/services"
                                className="inline-flex items-center px-4 py-2 bg-cerulean-500 text-white rounded-md hover:bg-cerulean-700"
                            >
                                Browse Services
                            </a>
                        </div>
                    ) : (
                        serviceRequests.data.map((request) => (
                            <div key={request.id} className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {request.service.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Request #{request.id} • Submitted {formatDate(request.created_at)}
                                            </p>
                                        </div>
                                        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                                            {getStatusIcon(request.status)}
                                            <span className="ml-1 capitalize">{request.status.replace('_', ' ')}</span>
                                        </div>
                                    </div>

                                    {/* Service Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Service Details</h4>
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-900 dark:text-white">
                                                    <span className="font-medium">Service:</span> {request.service.name}
                                                </p>
                                                <p className="text-sm text-gray-900 dark:text-white">
                                                    <span className="font-medium">Base Price:</span> ${request.base_price}/hour
                                                </p>
                                                <p className="text-sm text-gray-900 dark:text-white">
                                                    <span className="font-medium">Total Price:</span> ${request.total_price}/hour
                                                </p>
                                                {request.selected_additional_items && request.selected_additional_items.length > 0 && (
                                                    <p className="text-sm text-gray-900 dark:text-white">
                                                        <span className="font-medium">Additional Items:</span> {request.selected_additional_items.length} selected
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Schedule</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                                    {formatDate(request.preferred_date)}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                                    {formatTime(request.preferred_time)}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Contact Information</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                                    {request.client_email}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                                    {request.client_phone}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                                    {request.city}, {request.state}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {request.description && (
                                        <div className="mb-6">
                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Project Description</h4>
                                            <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                                {request.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Special Requirements */}
                                    {request.special_requirements && (
                                        <div className="mb-6">
                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Special Requirements</h4>
                                            <p className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                                {request.special_requirements}
                                            </p>
                                        </div>
                                    )}

                                    {/* Confirmation Status */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center">
                                            {request.client_confirmed ? (
                                                <div className="flex items-center text-green-600 dark:text-green-400">
                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                    <span className="text-sm font-medium">Confirmed</span>
                                                    {request.confirmed_at && (
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                                            on {formatDate(request.confirmed_at)}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                                                    <ClockIcon className="h-4 w-4 mr-2" />
                                                    <span className="text-sm font-medium">Pending Confirmation</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex space-x-3">
                                            <a
                                                href={`/service-requests/${request.id}`}
                                                className="text-sm text-cerulean-600 dark:text-cerulean-400 hover:text-cerulean-700 dark:hover:text-cerulean-300 font-medium"
                                            >
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {serviceRequests.last_page > 1 && (
                    <div className="mt-8 flex justify-center">
                        <nav className="flex items-center space-x-2">
                            {serviceRequests.current_page > 1 && (
                                <a
                                    href={`/my-service-requests?page=${serviceRequests.current_page - 1}`}
                                    className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Previous
                                </a>
                            )}
                            
                            <span className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Page {serviceRequests.current_page} of {serviceRequests.last_page}
                            </span>
                            
                            {serviceRequests.current_page < serviceRequests.last_page && (
                                <a
                                    href={`/my-service-requests?page=${serviceRequests.current_page + 1}`}
                                    className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Next
                                </a>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
