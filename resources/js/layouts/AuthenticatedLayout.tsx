import { PropsWithChildren, useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { useInitials } from '@/hooks/use-initials';
import { 
    Home, 
    Settings, 
    LogOut, 
    User, 
    Menu, 
    X,
    Bell,
    Search,
    FileText,
    Shield
} from 'lucide-react';

interface AuthenticatedLayoutProps extends PropsWithChildren {
    title?: string;
    user: {
        id: number;
        name: string;
        email: string;
        role?: string;
    };
}

export default function AuthenticatedLayout({ children, title, user }: AuthenticatedLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const getInitials = useInitials();

    const handleLogout = () => {
        router.post('/logout');
    };

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'My Service Requests', href: '/my-service-requests', icon: FileText },
        { name: 'Profile', href: '/profile', icon: User },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    // Add admin navigation items if user is admin
    const adminNavigation = user.role === 'admin' ? [
        { name: 'Service Requests', href: '/admin/service-requests', icon: Shield },
        { name: 'Services', href: '/admin/services', icon: FileText },
        { name: 'Users', href: '/admin/users', icon: User },
    ] : [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile sidebar */}
            <div className={cn(
                "fixed inset-0 z-50 lg:hidden",
                sidebarOpen ? "block" : "hidden"
            )}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
                <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-gray-800">
                    <div className="flex h-16 items-center justify-between px-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">S</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                Sunshine
                            </span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                                    route().current(item.href) 
                                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                        
                        {/* Admin navigation separator and items */}
                        {adminNavigation.length > 0 && (
                            <>
                                <div className="px-2 py-2">
                                    <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                                {adminNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                                            route().current(item.href) 
                                                ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                        )}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                ))}
                            </>
                        )}
                    </nav>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                    <div className="flex h-16 items-center px-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">S</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                Sunshine
                            </span>
                        </div>
                    </div>
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                                    route().current(item.href) 
                                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                        
                        {/* Admin navigation separator and items */}
                        {adminNavigation.length > 0 && (
                            <>
                                <div className="px-2 py-2">
                                    <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                                {adminNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                                            route().current(item.href) 
                                                ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                        )}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                ))}
                            </>
                        )}
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="relative flex flex-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="block h-full w-full border-0 py-0 pl-10 pr-0 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <button
                                type="button"
                                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                            >
                                <Bell className="h-6 w-6" />
                            </button>

                            {/* Profile dropdown */}
                            <div className="relative group">
                                <div className="flex items-center space-x-3 cursor-pointer">
                                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                                        <span className="text-sm font-medium text-white">
                                            {getInitials(user.name)}
                                        </span>
                                    </div>
                                    <div className="hidden lg:block">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {user.name}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {user.role || 'User'}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Dropdown menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="py-1">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Settings
                                        </Link>
                                        <hr className="my-1 border-gray-200 dark:border-gray-700" />
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            </div>
        </div>
    );
}