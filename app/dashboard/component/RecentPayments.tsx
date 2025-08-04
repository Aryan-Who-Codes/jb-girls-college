/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/useTheme";
import { getCurrencySymbol } from "@/lib/currency-utils";

interface Payment {
    _id: string;
    studentId: string;
    studentName: string;
    amount: number;
    date: string;
    method: string;
    email: string;
    currency: string;
}

interface RecentPaymentsProps {
    payments: Payment[];
}

export const RecentPayments = memo(function RecentPayments({ payments }: RecentPaymentsProps) {
    const { currentTheme } = useTheme();

    const getInitials = (name: string) => {
        if (!name) return 'U';
        return name.split(' ').map(part => part[0]).join('').toUpperCase();
    };

    if (!payments || !payments.length) {
        return (
            <div className={`flex items-center justify-center h-40 ${currentTheme.card} rounded-lg backdrop-blur-sm`}>
                <p className="text-base opacity-70">No recent payments</p>
            </div>
        );
    }

    return (
        <div className={`space-y-6 ${currentTheme.text}`}>
            {payments.map((payment) => (
                <PaymentItem 
                    key={payment._id} 
                    payment={payment} 
                    getInitials={getInitials} 
                    theme={currentTheme} 
                />
            ))}
        </div>
    );
});

// Extracted sub-component to improve performance
const PaymentItem = memo(function PaymentItem({ 
    payment, 
    getInitials, 
    theme 
}: { 
    payment: Payment; 
    getInitials: (name: string) => string; 
    theme: any;
}) {
    return (
        <div
            className={`
                flex items-center p-3 rounded-lg
                transition-all duration-300
                hover:bg-white/5 backdrop-blur-sm
                cursor-pointer
            `}
        >
            <Avatar className="h-12 w-12 ring-2 ring-white/10">
                <AvatarImage src="/api/placeholder/30/30" alt={payment.studentName} />
                <AvatarFallback className={`bg-gradient-to-br ${theme.accent} text-white`}>
                    {getInitials(payment.studentName)}
                </AvatarFallback>
            </Avatar>

            <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{payment.studentName}</p>
                    <div className={`font-medium text-sm bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                        +{getCurrencySymbol(payment.currency)}
                        {typeof payment.amount === 'number' ? payment.amount.toLocaleString() : '0'}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-1">
                    <p className="text-xs opacity-70">{payment.email}</p>
                    <span className="text-xs opacity-70">
                        {new Date(payment.date).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
});