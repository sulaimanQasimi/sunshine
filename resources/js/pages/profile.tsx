import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { User, Mail, Calendar, Shield } from 'lucide-react';

interface ProfileProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role?: string;
            email_verified_at: string | null;
            created_at: string;
        };
    };
}

export default function Profile({ auth }: ProfileProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile" />

            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg mb-8">
                    <div className="px-6 py-8">
                        <div className="flex items-center space-x-6">
                            <div className="h-20 w-20 bg-cerulean-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-2xl">
                                    {auth.user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {auth.user.name}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {auth.user.role ? auth.user.role.charAt(0).toUpperCase() + auth.user.role.slice(1) : 'User'}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Member since {new Date(auth.user.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Personal Information
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <User className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</p>
                                    <p className="text-gray-900 dark:text-white">{auth.user.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</p>
                                    <p className="text-gray-900 dark:text-white">{auth.user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</p>
                                    <p className="text-gray-900 dark:text-white">
                                        {new Date(auth.user.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Shield className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</p>
                                    <p className="text-gray-900 dark:text-white">
                                        {auth.user.role ? auth.user.role.charAt(0).toUpperCase() + auth.user.role.slice(1) : 'User'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
