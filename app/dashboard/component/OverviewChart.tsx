"use client";

import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useTheme } from "@/hooks/useTheme";
import { getCurrencySymbol } from "@/lib/currency-utils";

interface OverviewChartProps {
    data: Array<{
        name: string;
        total: number;
    }>;
    currency?: string;
}

export function OverviewChart({ data, currency = "INR" }: OverviewChartProps) {
    const { theme, currentTheme } = useTheme();

    // Memoize gradient colors to prevent unnecessary recalculations
    const gradientColors = useMemo(() => {
        const colorMap = {
            'light': ['#c4b5fd', '#8b5cf6'],    // violet gradient
            'dark': ['#a78bfa', '#7c3aed'],      // deeper violet gradient
            'forest': ['#6ee7b7', '#34d399'],    // emerald gradient
            'ocean': ['#93c5fd', '#60a5fa'],     // blue gradient
            'sunset': ['#fdba74', '#fb923c']     // orange gradient
        };
        
        return colorMap[theme as keyof typeof colorMap] || colorMap.dark;
    }, [theme]);

    // Memoized tooltip component to prevent unnecessary rerenders
    const CustomTooltip = useMemo(() => {
        // Return a function component
        return function TooltipContent({ active, payload, label }: {
            active?: boolean;
            payload?: Array<{ value: number }>;
            label?: string;
        }) {
            if (active && payload && payload.length) {
                return (
                    <div className={`${currentTheme.card} ${currentTheme.text} p-3 rounded-lg shadow-lg backdrop-blur-sm border border-white/10`}>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm">
                            {getCurrencySymbol(currency)}
                            {payload[0].value.toLocaleString('en-IN')}
                        </p>
                    </div>
                );
            }
            return null;
        };
    }, [currentTheme, currency]);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={gradientColors[0]} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={gradientColors[1]} stopOpacity={0.9} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${getCurrencySymbol(currency)}${value}`}
                    dx={-10}
                />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar
                    dataKey="total"
                    fill="url(#colorGradient)"
                    radius={[6, 6, 0, 0]}
                    className="transition-all duration-300 hover:opacity-80"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}