/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Users, CreditCard, Activity, Wallet2Icon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { getCurrencySymbol } from "@/lib/currency-utils";

interface StatsCardsProps {
    stats: {
        totalRevenue: number;
        subscriptions: number;
        sales: number;
        activeUsers: number;
    };
}

export const StatsCards = memo(function StatsCards({ stats }: StatsCardsProps) {
    const { currentTheme } = useTheme();
    
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Total Revenue"
                value={`${getCurrencySymbol('INR')}${stats.totalRevenue?.toLocaleString('en-IN') || 0}`}
                icon={<Wallet2Icon className="h-4 w-4 text-white" />}
                trend="+20.1%"
                trendLabel="from last term"
                theme={currentTheme}
            />
            
            <StatCard
                title="Students"
                value={stats.subscriptions.toString()}
                icon={<Users className="h-4 w-4 text-white" />}
                trend="+10.1%"
                trendLabel="from last term"
                theme={currentTheme}
            />
            
            <StatCard
                title="Payments"
                value={stats.sales.toString()}
                icon={<CreditCard className="h-4 w-4 text-white" />}
                trend="+12.5%"
                trendLabel="from last term"
                theme={currentTheme}
            />
            
            <StatCard
                title="Active Students"
                value={stats.activeUsers.toString()}
                icon={<Activity className="h-4 w-4 text-white" />}
                trend="+19%"
                trendLabel="from last term"
                theme={currentTheme}
            />
        </div>
    );
});

// Extracted to a reusable component
const StatCard = memo(function StatCard({ 
    title, 
    value, 
    icon, 
    trend, 
    trendLabel, 
    theme 
}: { 
    title: string;
    value: string;
    icon: React.ReactNode;
    trend: string;
    trendLabel: string;
    theme: any;
}) {
    return (
        <Card className={`${theme.card} ${theme.text} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl border border-white/10`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">{title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.accent}`}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold tracking-tight mt-2">
                    {value}
                </div>
                <p className="text-sm mt-2 flex items-center text-emerald-500">
                    <span className="flex items-center">↗ {trend}</span>
                    <span className="ml-2 opacity-70">{trendLabel}</span>
                </p>
            </CardContent>
        </Card>
    );
});