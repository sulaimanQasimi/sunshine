import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { 
    Users, 
    TrendingUp, 
    DollarSign, 
    Activity,
    Calendar,
    Clock,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

interface DashboardProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role?: string;
        };
    };
    stats?: {
        totalRequests: number;
        pendingRequests: number;
        completedRequests: number;
        totalServices: number;
    };
    recentRequests?: Array<{
        id: number;
        service: {
            name: string;
        };
        status: string;
        created_at: string;
    }>;
}

export default function Dashboard({ auth, stats, recentRequests }: DashboardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900';
            case 'approved':
                return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900';
            case 'pending':
                return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900';
            case 'cancelled':
                return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900';
            default:
                return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-4 w-4" />;
            case 'approved':
                return <CheckCircle className="h-4 w-4" />;
            case 'pending':
                return <Clock className="h-4 w-4" />;
            case 'cancelled':
                return <AlertCircle className="h-4 w-4" />;
            default:
                return <Activity className="h-4 w-4" />;
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Requests
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats?.totalRequests || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Pending Requests
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats?.pendingRequests || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Completed Requests
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats?.completedRequests || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <DollarSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Available Services
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats?.totalServices || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Requests */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Recent Service Requests
                        </h3>
                    </div>
                    <div className="p-6">
                        {recentRequests && recentRequests.length > 0 ? (
                            <div className="space-y-4">
                                {recentRequests.map((request) => (
                                    <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className={`p-2 rounded-full ${getStatusColor(request.status)}`}>
                                                    {getStatusIcon(request.status)}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {request.service.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(request.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 dark:text-gray-400">
                                    No recent service requests
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Quick Actions
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <a href="/services" className="w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-semibold text-sm">+</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Request New Service
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Submit a new service request
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                            </a>

                            <a href="/my-service-requests" className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-semibold text-sm">📋</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            View All Requests
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Check your service request history
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                            </a>

                            <a href="/profile" className="w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-semibold text-sm">⚙️</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Manage Profile
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Update your account settings
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Welcome Message */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm">
                <div className="px-6 py-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Welcome back, {auth.user.name}!
                        </h2>
                        <p className="text-blue-100">
                            Here's what's happening with your service requests today.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
