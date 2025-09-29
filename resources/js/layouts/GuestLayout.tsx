import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Menu, X, Sparkles, Home, Shield, Mail, User, UserPlus } from 'lucide-react';
import { useState } from 'react';

interface GuestLayoutProps extends PropsWithChildren {
    title?: string;
}

export default function GuestLayout({ children, title }: GuestLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Navigation */}
            <nav className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="group flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                                        <span className="text-white font-bold text-lg">S</span>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                        <Sparkles className="h-2 w-2 text-white" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold bg-gradient-to-r from-cerulean-600 to-blue-600 bg-clip-text text-transparent">
                                        Blue Shine
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                                        Professional Services
                                    </span>
                                </div>
                            </Link>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-2">
                            <Link 
                                href="/" 
                                className={cn(
                                    "group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg",
                                    route().current('home') 
                                        ? "text-white bg-gradient-to-r from-cerulean-600 to-blue-600 shadow-lg" 
                                        : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:text-cerulean-600 dark:hover:text-cerulean-400 hover:bg-cerulean-50 dark:hover:bg-cerulean-900/20 border border-gray-200 dark:border-gray-700 hover:border-cerulean-300 dark:hover:border-cerulean-600"
                                )}
                            >
                                <span className="relative z-10 flex items-center">
                                    <Home className="h-4 w-4 mr-2" />
                                    Home
                                </span>
                                {route().current('home') && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-cerulean-600 to-blue-600 rounded-2xl shadow-lg"></div>
                                )}
                            </Link>
                            <Link 
                                href="/services" 
                                className={cn(
                                    "group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg",
                                    route().current('services') 
                                        ? "text-white bg-gradient-to-r from-cerulean-600 to-blue-600 shadow-lg" 
                                        : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:text-cerulean-600 dark:hover:text-cerulean-400 hover:bg-cerulean-50 dark:hover:bg-cerulean-900/20 border border-gray-200 dark:border-gray-700 hover:border-cerulean-300 dark:hover:border-cerulean-600"
                                )}
                            >
                                <span className="relative z-10 flex items-center">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Services
                                </span>
                                {route().current('services') && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-cerulean-600 to-blue-600 rounded-2xl shadow-lg"></div>
                                )}
                            </Link>
                            <Link 
                                href="/contact" 
                                className={cn(
                                    "group relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg",
                                    route().current('contact') 
                                        ? "text-white bg-gradient-to-r from-cerulean-600 to-blue-600 shadow-lg" 
                                        : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:text-cerulean-600 dark:hover:text-cerulean-400 hover:bg-cerulean-50 dark:hover:bg-cerulean-900/20 border border-gray-200 dark:border-gray-700 hover:border-cerulean-300 dark:hover:border-cerulean-600"
                                )}
                            >
                                <span className="relative z-10 flex items-center">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Contact
                                </span>
                                {route().current('contact') && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-cerulean-600 to-blue-600 rounded-2xl shadow-lg"></div>
                                )}
                            </Link>
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-3">
                            <Link 
                                href="/login" 
                                className="group px-6 py-3 rounded-2xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:text-cerulean-600 dark:hover:text-cerulean-400 hover:bg-cerulean-50 dark:hover:bg-cerulean-900/20 border border-gray-200 dark:border-gray-700 hover:border-cerulean-300 dark:hover:border-cerulean-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                <span className="flex items-center">
                                    <User className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                                    Login
                                </span>
                            </Link>
                            <Link 
                                href="/register" 
                                className="group px-6 py-3 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-cerulean-600 to-blue-600 hover:from-cerulean-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <span className="flex items-center">
                                    <UserPlus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                                    Register
                                </span>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-cerulean-600 dark:hover:text-cerulean-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden">
                            <div className="px-3 pt-3 pb-4 space-y-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 mt-4">
                                <Link 
                                    href="/" 
                                    className={cn(
                                        "group flex items-center px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-300 transform hover:-translate-y-0.5",
                                        route().current('home') 
                                            ? "text-white bg-gradient-to-r from-cerulean-600 to-blue-600 shadow-lg" 
                                            : "text-gray-700 dark:text-gray-300 hover:text-cerulean-600 dark:hover:text-cerulean-400 hover:bg-cerulean-50 dark:hover:bg-cerulean-900/20"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Home className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                                    Home
                                </Link>
                                <Link 
                                    href="/services" 
                                    className={cn(
                                        "group flex items-center px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-300 transform hover:-translate-y-0.5",
                                        route().current('services') 
                                            ? "text-white bg-gradient-to-r from-cerulean-600 to-blue-600 shadow-lg" 
                                            : "text-gray-700 dark:text-gray-300 hover:text-cerulean-600 dark:hover:text-cerulean-400 hover:bg-cerulean-50 dark:hover:bg-cerulean-900/20"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Shield className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                                    Services
                                </Link>
                                <Link 
                                    href="/contact" 
                                    className={cn(
                                        "group flex items-center px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-300 transform hover:-translate-y-0.5",
                                        route().current('contact') 
                                            ? "text-white bg-gradient-to-r from-cerulean-600 to-blue-600 shadow-lg" 
                                            : "text-gray-700 dark:text-gray-300 hover:text-cerulean-600 dark:hover:text-cerulean-400 hover:bg-cerulean-50 dark:hover:bg-cerulean-900/20"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Mail className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                                    Contact
                                </Link>
                                <div className="pt-4 pb-2 space-y-2">
                                    <Link 
                                        href="/login" 
                                        className="group flex items-center px-4 py-3 rounded-2xl text-base font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:text-cerulean-600 dark:hover:text-cerulean-400 hover:bg-cerulean-50 dark:hover:bg-cerulean-900/20 border border-gray-200 dark:border-gray-700 hover:border-cerulean-300 dark:hover:border-cerulean-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <User className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                                        Login
                                    </Link>
                                    <Link 
                                        href="/register" 
                                        className="group flex items-center px-4 py-3 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-cerulean-600 to-blue-600 hover:from-cerulean-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <UserPlus className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                                        Register
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {title && (
                    <div className="bg-white dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {title}
                            </h1>
                        </div>
                    </div>
                )}
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-cerulean-500 to-blue-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">S</span>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-cerulean-600 to-blue-600 bg-clip-text text-transparent">
                                    Blue Shine
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                                Your trusted partner for professional services. We provide high-quality solutions 
                                tailored to meet your specific needs with excellence, reliability, and innovation.
                            </p>
                            <div className="flex space-x-4">
                                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">📧</span>
                                </div>
                                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">📱</span>
                                </div>
                                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">📍</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-cerulean-600 dark:hover:text-cerulean-400 transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services" className="text-gray-600 dark:text-gray-300 hover:text-cerulean-600 dark:hover:text-cerulean-400 transition-colors">
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-cerulean-600 dark:hover:text-cerulean-400 transition-colors">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-cerulean-600 dark:hover:text-cerulean-400 transition-colors">
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Info</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li>asem.espanta@gmail.com</li>
                                <li>‪+49 1575 1450300</li>
                                <li>Istanbul, Turkey</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            &copy; 2024 Blue Shine. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
