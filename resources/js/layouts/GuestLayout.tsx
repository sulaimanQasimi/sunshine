import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface GuestLayoutProps extends PropsWithChildren {
    title?: string;
}

export default function GuestLayout({ children, title }: GuestLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Navigation */}
            <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">S</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    Sunshine
                                </span>
                            </Link>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <Link 
                                href="/" 
                                className={cn(
                                    "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium",
                                    route().current('home') && "text-blue-600 dark:text-blue-400"
                                )}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/services" 
                                className={cn(
                                    "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium",
                                    route().current('services') && "text-blue-600 dark:text-blue-400"
                                )}
                            >
                                Services
                            </Link>
                            <Link 
                                href="/contact" 
                                className={cn(
                                    "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium",
                                    route().current('contact') && "text-blue-600 dark:text-blue-400"
                                )}
                            >
                                Contact
                            </Link>
                            <Link 
                                href="/login" 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Login
                            </Link>
                            <Link 
                                href="/register" 
                                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {title && (
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {title}
                            </h1>
                        </div>
                    )}
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-600 dark:text-gray-400">
                        <p>&copy; 2024 Sunshine. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
