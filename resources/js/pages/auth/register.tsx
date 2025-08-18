import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="flex justify-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-cerulean-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                Sunshine
                            </span>
                        </Link>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Or{' '}
                        <Link
                            href="/login"
                            className="font-medium text-cerulean-600 hover:text-cerulean-500 dark:text-cerulean-400 dark:hover:text-cerulean-300"
                        >
                            sign in to your existing account
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`appearance-none relative block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-cerulean-500 focus:border-cerulean-500 focus:z-10 sm:text-sm ${
                                        errors.name
                                            ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                    }`}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`appearance-none relative block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-cerulean-500 focus:border-cerulean-500 focus:z-10 sm:text-sm ${
                                        errors.email
                                            ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                    }`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`appearance-none relative block w-full pl-10 pr-10 py-2 border rounded-md placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-cerulean-500 focus:border-cerulean-500 focus:z-10 sm:text-sm ${
                                        errors.password
                                            ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                    }`}
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className={`appearance-none relative block w-full pl-10 pr-10 py-2 border rounded-md placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-cerulean-500 focus:border-cerulean-500 focus:z-10 sm:text-sm ${
                                        errors.password_confirmation
                                            ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20'
                                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                    }`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                >
                                    {showPasswordConfirmation ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    )}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password_confirmation}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cerulean-500 hover:bg-cerulean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cerulean-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Creating account...' : 'Create account'}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-medium text-cerulean-600 hover:text-cerulean-500 dark:text-cerulean-400 dark:hover:text-cerulean-300"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            By creating an account, you agree to our{' '}
                            <Link href="/terms" className="text-cerulean-600 hover:text-cerulean-500 dark:text-cerulean-400">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-cerulean-600 hover:text-cerulean-500 dark:text-cerulean-400">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
