import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { User, Mail, Shield, Save, Camera } from 'lucide-react';

interface ProfileProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            avatar?: string;
            role?: string;
            email_verified_at: string | null;
            created_at: string;
            updated_at: string;
        };
    };
}

export default function Profile({ auth }: ProfileProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/user/profile-information');
    };

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        post('/user/password');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile Settings" />

            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg mb-8">
                    <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                                    {auth.user.avatar ? (
                                        <img 
                                            src={auth.user.avatar} 
                                            alt={auth.user.name}
                                            className="h-16 w-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        auth.user.name.charAt(0).toUpperCase()
                                    )}
                                </div>
                                <button className="absolute -bottom-1 -right-1 h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-blue-700">
                                    <Camera className="h-3 w-3" />
                                </button>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {auth.user.name}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {auth.user.email}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Member since {new Date(auth.user.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                <Shield className="h-4 w-4 mr-1" />
                                {auth.user.role ? auth.user.role.charAt(0).toUpperCase() + auth.user.role.slice(1) : 'User'}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Profile Information */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <User className="h-5 w-5 mr-2" />
                                Profile Information
                            </h2>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                            errors.name ? 'border-red-300 dark:border-red-600' : ''
                                        }`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                            errors.email ? 'border-red-300 dark:border-red-600' : ''
                                        }`}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Password Update */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <Shield className="h-5 w-5 mr-2" />
                                Update Password
                            </h2>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                <div>
                                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        id="current_password"
                                        name="current_password"
                                        value={data.current_password}
                                        onChange={(e) => setData('current_password', e.target.value)}
                                        className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                            errors.current_password ? 'border-red-300 dark:border-red-600' : ''
                                        }`}
                                        placeholder="Enter current password"
                                    />
                                    {errors.current_password && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.current_password}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                            errors.password ? 'border-red-300 dark:border-red-600' : ''
                                        }`}
                                        placeholder="Enter new password"
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                                            errors.password_confirmation ? 'border-red-300 dark:border-red-600' : ''
                                        }`}
                                        placeholder="Confirm new password"
                                    />
                                    {errors.password_confirmation && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password_confirmation}</p>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Shield className="h-4 w-4 mr-2" />
                                        {processing ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="mt-8 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Account Information
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</h3>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {auth.user.role ? auth.user.role.charAt(0).toUpperCase() + auth.user.role.slice(1) : 'User'}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Verification</h3>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {auth.user.email_verified_at ? (
                                        <span className="text-green-600 dark:text-green-400">Verified</span>
                                    ) : (
                                        <span className="text-red-600 dark:text-red-400">Not verified</span>
                                    )}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</h3>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {new Date(auth.user.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</h3>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {new Date(auth.user.updated_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
