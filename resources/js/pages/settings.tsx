import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Settings, Bell, Shield, Palette } from 'lucide-react';

interface SettingsProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role?: string;
        };
    };
}

export default function Settings({ auth }: SettingsProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Settings" />

            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Settings
                        </h1>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6">
                            {/* Notifications */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center">
                                    <Bell className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Email Notifications
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Receive email updates about your service requests
                                        </p>
                                    </div>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-cerulean-500">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                                </button>
                            </div>

                            {/* Security */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center">
                                    <Shield className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Two-Factor Authentication
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Add an extra layer of security to your account
                                        </p>
                                    </div>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-5"></span>
                                </button>
                            </div>

                            {/* Appearance */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center">
                                    <Palette className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Dark Mode
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Switch between light and dark themes
                                        </p>
                                    </div>
                                </div>
                                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-cerulean-500">
                                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                                </button>
                            </div>

                            {/* Language */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center">
                                    <Settings className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Language
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Choose your preferred language
                                        </p>
                                    </div>
                                </div>
                                <select className="form-select w-32">
                                    <option>English</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
