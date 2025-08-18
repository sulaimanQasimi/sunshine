import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { ArrowLeft, Save, User, Shield } from 'lucide-react';

interface AdminUserCreateProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role?: string;
        };
    };
}

export default function AdminUserCreate({ auth }: AdminUserCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'customer',
        send_verification_email: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/users');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin - Create User" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center space-x-3">
                            <a
                                href="/admin/users"
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </a>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Create New User
                            </h1>
                        </div>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                            Add a new user to the system
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
                                        Full Name *
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
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="form-input mt-1 block w-full"
                                        required
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Password
                            </h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Password *
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="form-input mt-1 block w-full"
                                        required
                                    />
                                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Confirm Password *
                                    </label>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="form-input mt-1 block w-full"
                                        required
                                    />
                                    {errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Role and Settings */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Role & Settings
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        User Role *
                                    </label>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <label className="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="customer"
                                                checked={data.role === 'customer'}
                                                onChange={(e) => setData('role', e.target.value)}
                                                className="sr-only"
                                            />
                                            <span className="flex flex-1">
                                                <span className="flex flex-col">
                                                    <span className="block text-sm font-medium text-gray-900 flex items-center">
                                                        <User className="h-5 w-5 mr-2 text-cerulean-600" />
                                                        Customer
                                                    </span>
                                                    <span className="mt-1 flex items-center text-sm text-gray-500">
                                                        Regular user who can request services
                                                    </span>
                                                </span>
                                            </span>
                                            <span className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${
                                                data.role === 'customer' ? 'border-cerulean-500' : 'border-transparent'
                                            }`} />
                                        </label>

                                        <label className="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="admin"
                                                checked={data.role === 'admin'}
                                                onChange={(e) => setData('role', e.target.value)}
                                                className="sr-only"
                                            />
                                            <span className="flex flex-1">
                                                <span className="flex flex-col">
                                                    <span className="block text-sm font-medium text-gray-900 flex items-center">
                                                        <Shield className="h-5 w-5 mr-2 text-coral_pink-600" />
                                                        Administrator
                                                    </span>
                                                    <span className="mt-1 flex items-center text-sm text-gray-500">
                                                        Full access to manage the system
                                                    </span>
                                                </span>
                                            </span>
                                            <span className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${
                                                data.role === 'admin' ? 'border-coral_pink-500' : 'border-transparent'
                                            }`} />
                                        </label>
                                    </div>
                                    {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="send_verification_email"
                                        checked={data.send_verification_email}
                                        onChange={(e) => setData('send_verification_email', e.target.checked)}
                                        className="h-4 w-4 text-cerulean-600 focus:ring-cerulean-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="send_verification_email" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                        Send email verification link
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end space-x-3">
                            <a
                                href="/admin/users"
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
                                {processing ? 'Creating...' : 'Create User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
