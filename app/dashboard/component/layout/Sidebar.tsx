'use client';

import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    CreditCard,
    Settings,
    BarChart,
    GraduationCap,
    LogOut,
    Menu,
    X,
    Home,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className = "" }: SidebarProps) {
    const { currentTheme } = useTheme();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    // Check if we're in mobile view on mount and when window resizes
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobileView(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        // Initial check
        checkIfMobile();

        // Add event listener
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const desktopNavItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Students', href: '/dashboard/allData', icon: Users },
        { name: 'Courses', href: '/dashboard/courses', icon: BookOpen },
        { name: 'Payments', href: '/payments', icon: CreditCard },
        { name: 'Reports', href: '/reports', icon: BarChart },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    // Mobile-specific navigation items (simplified for mobile)
    const mobileNavItems = [
        { name: 'Home', href: '/dashboard', icon: Home },
        { name: 'Students', href: '/dashboard/allData', icon: Users },
        { name: 'Payments', href: '/payments', icon: CreditCard },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Mobile Menu Toggle Button - Only visible on mobile */}
            <button
                onClick={toggleMobileMenu}
                className={`
                    md:hidden fixed top-4 left-4 z-50
                    p-2 rounded-lg ${currentTheme.card} 
                    border border-white/10
                `}
            >
                {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
            </button>

            {/* Mobile Bottom Navigation Bar */}
            <div className={`
                md:hidden fixed bottom-0 left-0 right-0 
                ${currentTheme.card} border-t border-white/10
                flex justify-around items-center h-16 z-40
            `}>
                {mobileNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                                flex flex-col items-center justify-center
                                w-full h-full
                                ${isActive ? `text-primary` : `${currentTheme.text} opacity-70`}
                            `}
                        >
                            <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                            <span className="text-xs mt-1">{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Desktop Sidebar */}
            <aside className={`
                ${currentTheme.card} 
                ${className}
                backdrop-blur-md
                border-r border-white/10
                transition-all duration-300 z-40
                flex flex-col
                h-screen
                md:flex
                relative w-64
            `}>
                <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4 z-100">
                    <div className={`
                        h-8 w-8 
                        rounded-lg 
                        bg-gradient-to-br ${currentTheme.accent}
                        flex items-center justify-center
                    `}>
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <Link href="/" className={`${currentTheme.text} text-lg font-bold tracking-tight`}>JB GIRLS COLLEGE</Link>
                </div>

                <nav className={`space-y-1 p-4 ${currentTheme.text}`}>
                    {desktopNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 
                                    rounded-lg px-4 py-2.5
                                    text-sm font-medium
                                    transition-all duration-200
                                    group
                                    ${isActive
                                        ? `bg-gradient-to-r ${currentTheme.accent} text-white shadow-lg`
                                        : 'hover:bg-white/10'
                                    }
                                `}
                            >
                                <Icon className={`
                                    h-5 w-5
                                    transition-transform duration-200
                                    group-hover:scale-110
                                    ${isActive ? 'text-white' : 'opacity-70 group-hover:opacity-100'}
                                `} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="default"
                            size="sm"
                            className={`
                                rounded-lg
                                bg-gradient-to-r ${currentTheme.accent}
                                text-white font-medium
                                transition-all duration-200
                                transform hover:scale-105
                                hover:shadow-lg
                                flex items-center gap-2
                                w-full
                            `}
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Mobile Slide-in Menu */}
            {isMobileView && (
                <div className={`
                    fixed inset-y-0 left-0 w-64 
                    ${currentTheme.card}
                    border-r border-white/10
                    transition-all duration-300 z-50
                    transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                    flex flex-col
                    h-screen
                `}>
                    <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
                        <div className={`
                            h-8 w-8 
                            rounded-lg 
                            bg-gradient-to-br ${currentTheme.accent}
                            flex items-center justify-center
                        `}>
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <Link href="/" className={`${currentTheme.text} text-lg font-bold tracking-tight`}>JB GIRLS COLLEGE</Link>
                    </div>

                    <nav className={`space-y-1 p-4 ${currentTheme.text}`}>
                        {desktopNavItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`
                                        flex items-center gap-3 
                                        rounded-lg px-4 py-2.5
                                        text-sm font-medium
                                        transition-all duration-200
                                        group
                                        ${isActive
                                            ? `bg-gradient-to-r ${currentTheme.accent} text-white shadow-lg`
                                            : 'hover:bg-white/10'
                                        }
                                    `}
                                >
                                    <Icon className={`
                                        h-5 w-5
                                        transition-transform duration-200
                                        group-hover:scale-110
                                        ${isActive ? 'text-white' : 'opacity-70 group-hover:opacity-100'}
                                    `} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="default"
                                size="sm"
                                className={`
                                    rounded-lg
                                    bg-gradient-to-r ${currentTheme.accent}
                                    text-white font-medium
                                    transition-all duration-200
                                    transform hover:scale-105
                                    hover:shadow-lg
                                    flex items-center gap-2
                                    w-full
                                `}
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay for mobile menu */}
            {isMobileView && isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
