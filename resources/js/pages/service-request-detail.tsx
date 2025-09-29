import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Calendar, Clock, MapPin, Phone, Mail, User, FileText, CheckCircle, XCircle, Clock as ClockIcon, Edit, Eye, CheckSquare } from 'lucide-react';

interface ServiceRequestDetailProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role?: string;
        };
    };
    serviceRequest: {
        id: number;
        service?: {
            id: number;
            name: string;
            description: string;
            base_price: number;
        };
        user?: {
            id: number;
            name: string;
            email: string;
        };
        status: string;
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
        admin_notes: string | null;
        assigned_to: number | null;
        created_at: string;
        updated_at: string;
    };
}

export default function ServiceRequestDetail({ auth, serviceRequest }: ServiceRequestDetailProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingDetails, setIsEditingDetails] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const { data, setData, patch, processing, errors } = useForm({
        status: serviceRequest.status,
        admin_notes: serviceRequest.admin_notes || '',
        assigned_to: serviceRequest.assigned_to || '',
    });

    const { data: editData, setData: setEditData, patch: updateRequest, processing: updating, errors: editErrors } = useForm({
        description: serviceRequest.description || '',
        client_name: serviceRequest.client_name,
        client_email: serviceRequest.client_email,
        client_phone: serviceRequest.client_phone,
        client_address: serviceRequest.client_address,
        house_number: serviceRequest.house_number || '',
        city: serviceRequest.city,
        state: serviceRequest.state,
        postal_code: serviceRequest.postal_code,
        country: serviceRequest.country,
        preferred_date: serviceRequest.preferred_date,
        preferred_time: serviceRequest.preferred_time,
        special_requirements: serviceRequest.special_requirements || '',
        additional_notes: serviceRequest.additional_notes || '',
    });

    const { post: confirmRequest, processing: confirming } = useForm();

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
            month: 'long',
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

    const handleStatusUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/admin/service-requests/${serviceRequest.id}/status`, {
            onSuccess: () => {
                setIsEditing(false);
            }
        });
    };

    const handleUpdateDetails = (e: React.FormEvent) => {
        e.preventDefault();
        updateRequest(`/service-requests/${serviceRequest.id}`, {
            onSuccess: () => {
                setIsEditingDetails(false);
            }
        });
    };

    const handleConfirm = () => {
        confirmRequest(`/service-requests/${serviceRequest.id}/confirm`, {
            onSuccess: () => {
                setShowConfirmModal(false);
            }
        });
    };

    const canEdit = auth.user.role === 'admin';
    const canConfirm = !serviceRequest.client_confirmed && serviceRequest.user && auth.user.id === serviceRequest.user.id;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Service Request #${serviceRequest.id}`} />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg mb-8">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Service Request #{serviceRequest.id}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {serviceRequest.service?.name || 'Unknown Service'} • Submitted {formatDate(serviceRequest.created_at)}
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(serviceRequest.status)}`}>
                                    {getStatusIcon(serviceRequest.status)}
                                    <span className="ml-1">{formatStatus(serviceRequest.status)}</span>
                                </span>
                                {canEdit && (
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        {isEditing ? 'Cancel' : 'Edit'}
                                    </button>
                                )}
                                {canConfirm && (
                                    <button
                                        onClick={() => setShowConfirmModal(true)}
                                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                                    >
                                        <CheckSquare className="h-4 w-4 mr-2" />
                                        Confirm Request
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Request Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Service Information */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Service Information</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-300">Service:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{serviceRequest.service?.name || 'Unknown Service'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-300">Base Price:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">${Number(serviceRequest.base_price).toFixed(2)}/hour</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-300">Total Price:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">${Number(serviceRequest.total_price).toFixed(2)}/hour</span>
                                    </div>
                                    {serviceRequest.selected_additional_items && serviceRequest.selected_additional_items.length > 0 && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 dark:text-gray-300">Additional Items:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{serviceRequest.selected_additional_items.length} selected</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Schedule Information */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Schedule</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                        <div>
                                            <span className="text-gray-600 dark:text-gray-300">Preferred Date:</span>
                                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{formatDate(serviceRequest.preferred_date)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 text-gray-400 mr-3" />
                                        <div>
                                            <span className="text-gray-600 dark:text-gray-300">Preferred Time:</span>
                                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{formatTime(serviceRequest.preferred_time)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Client Information */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Client Information</h2>
                                    {!canEdit && (
                                        <button
                                            onClick={() => setIsEditingDetails(!isEditingDetails)}
                                            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            {isEditingDetails ? 'Cancel' : 'Edit'}
                                        </button>
                                    )}
                                </div>
                                {isEditingDetails ? (
                                    <form onSubmit={handleUpdateDetails} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="client_name"
                                                    value={editData.client_name}
                                                    onChange={(e) => setEditData('client_name', e.target.value)}
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-2 focus:ring-cerulean-500 transition-colors"
                                                    required
                                                />
                                                {editErrors.client_name && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{editErrors.client_name}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="client_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="client_email"
                                                    value={editData.client_email}
                                                    onChange={(e) => setEditData('client_email', e.target.value)}
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-2 focus:ring-cerulean-500 transition-colors"
                                                    required
                                                />
                                                {editErrors.client_email && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{editErrors.client_email}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="client_phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="client_phone"
                                                    value={editData.client_phone}
                                                    onChange={(e) => setEditData('client_phone', e.target.value)}
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-2 focus:ring-cerulean-500 transition-colors"
                                                    required
                                                />
                                                {editErrors.client_phone && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{editErrors.client_phone}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="house_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    House/Apartment Number
                                                </label>
                                                <input
                                                    type="text"
                                                    id="house_number"
                                                    value={editData.house_number}
                                                    onChange={(e) => setEditData('house_number', e.target.value)}
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-2 focus:ring-cerulean-500 transition-colors"
                                                />
                                                {editErrors.house_number && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{editErrors.house_number}</p>
                                                )}
                                            </div>
                                            <div className="md:col-span-2">
                                                <label htmlFor="client_address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Street Address
                                                </label>
                                                <input
                                                    type="text"
                                                    id="client_address"
                                                    value={editData.client_address}
                                                    onChange={(e) => setEditData('client_address', e.target.value)}
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-2 focus:ring-cerulean-500 transition-colors"
                                                    required
                                                />
                                                {editErrors.client_address && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{editErrors.client_address}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    value={editData.city}
                                                    onChange={(e) => setEditData('city', e.target.value)}
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-2 focus:ring-cerulean-500 transition-colors"
                                                    required
                                                />
                                                {editErrors.city && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{editErrors.city}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    State
                                                </label>
                                                <input
                                                    type="text"
                                                    id="state"
                                                    value={editData.state}
                                                    onChange={(e) => setEditData('state', e.target.value)}
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-2 focus:ring-cerulean-500 transition-colors"
                                                    required
                                                />
                                                {editErrors.state && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{editErrors.state}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Postal Code
                                                </label>
                                                <input
                                                    type="text"
                                                    id="postal_code"
                                                    value={editData.postal_code}
                                                    onChange={(e) => setEditData('postal_code', e.target.value)}
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-2 focus:ring-cerulean-500 transition-colors"
                                                    required
                                                />
                                                {editErrors.postal_code && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{editErrors.postal_code}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    id="country"
                                                    value={editData.country}
                                                    onChange={(e) => setEditData('country', e.target.value)}
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-2 focus:ring-cerulean-500 transition-colors"
                                                    required
                                                />
                                                {editErrors.country && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{editErrors.country}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex space-x-3 pt-4">
                                            <button
                                                type="submit"
                                                disabled={updating}
                                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                            >
                                                {updating ? 'Updating...' : 'Update Details'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditingDetails(false)}
                                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <User className="h-5 w-5 text-gray-400 mr-3" />
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-300">Name:</span>
                                                <span className="ml-2 font-medium text-gray-900 dark:text-white">{serviceRequest.client_name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="h-5 w-5 text-gray-400 mr-3" />
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-300">Email:</span>
                                                <span className="ml-2 font-medium text-gray-900 dark:text-white">{serviceRequest.client_email}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-5 w-5 text-gray-400 mr-3" />
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-300">Phone:</span>
                                                <span className="ml-2 font-medium text-gray-900 dark:text-white">{serviceRequest.client_phone}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                                            <div>
                                                <span className="text-gray-600 dark:text-gray-300">Address:</span>
                                                <div className="ml-2 font-medium text-gray-900 dark:text-white">
                                                    {serviceRequest.house_number && `${serviceRequest.house_number} `}
                                                    {serviceRequest.client_address}<br />
                                                    {serviceRequest.city}, {serviceRequest.state} {serviceRequest.postal_code}<br />
                                                    {serviceRequest.country}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Project Description */}
                        {serviceRequest.description && (
                            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Description</h2>
                                    <p className="text-gray-700 dark:text-gray-300">{serviceRequest.description}</p>
                                </div>
                            </div>
                        )}

                        {/* Special Requirements */}
                        {serviceRequest.special_requirements && (
                            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Special Requirements</h2>
                                    <p className="text-gray-700 dark:text-gray-300">{serviceRequest.special_requirements}</p>
                                </div>
                            </div>
                        )}

                        {/* Additional Notes */}
                        {serviceRequest.additional_notes && (
                            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Notes</h2>
                                    <p className="text-gray-700 dark:text-gray-300">{serviceRequest.additional_notes}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status Information */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Status Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-300">Current Status:</span>
                                        <div className="mt-1">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(serviceRequest.status)}`}>
                                                {getStatusIcon(serviceRequest.status)}
                                                <span className="ml-1">{formatStatus(serviceRequest.status)}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-300">Confirmation Status:</span>
                                        <div className="mt-1">
                                            {serviceRequest.client_confirmed ? (
                                                <div className="flex items-center text-green-600 dark:text-green-400">
                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                    <span className="text-sm font-medium">Confirmed</span>
                                                    {serviceRequest.confirmed_at && (
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                                            on {formatDate(serviceRequest.confirmed_at)}
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
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Admin Actions (Admin Only) */}
                        {canEdit && (
                            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Admin Actions</h3>
                                    {isEditing ? (
                                        <form onSubmit={handleStatusUpdate} className="space-y-4">
                                            <div>
                                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Status
                                                </label>
                                                <select
                                                    id="status"
                                                    value={data.status}
                                                    onChange={(e) => setData('status', e.target.value)}
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-cerulean-500 focus:outline-none focus:ring-2 focus:ring-cerulean-500 transition-colors"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="approved">Approved</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                                {errors.status && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="admin_notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Admin Notes
                                                </label>
                                                <textarea
                                                    id="admin_notes"
                                                    value={data.admin_notes}
                                                    onChange={(e) => setData('admin_notes', e.target.value)}
                                                    rows={3}
                                                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cerulean-500 focus:outline-none focus:ring-2 focus:ring-cerulean-500 transition-colors resize-none"
                                                    placeholder="Add any admin notes..."
                                                />
                                                {errors.admin_notes && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.admin_notes}</p>
                                                )}
                                            </div>
                                            <div className="flex space-x-3">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cerulean-600 to-blue-600 text-white rounded-md hover:from-cerulean-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                                                >
                                                    {processing ? 'Updating...' : 'Update Status'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditing(false)}
                                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        >
                                            Update Status
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Admin Notes */}
                        {serviceRequest.admin_notes && (
                            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Admin Notes</h3>
                                    <p className="text-gray-700 dark:text-gray-300">{serviceRequest.admin_notes}</p>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Navigation</h3>
                                <div className="space-y-3">
                                    <Link
                                        href="/my-service-requests"
                                        className="block w-full px-4 py-2 text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Back to My Requests
                                    </Link>
                                    {canEdit && (
                                        <Link
                                            href="/admin/service-requests"
                                            className="block w-full px-4 py-2 text-center bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                        >
                                            Back to Admin Panel
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
                        <div className="mt-3 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                                <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
                                Confirm Service Request
                            </h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Are you sure you want to confirm this service request? This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex justify-center space-x-3 mt-4">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={confirming}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                                >
                                    {confirming ? 'Confirming...' : 'Confirm Request'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
