import { currencyList } from "@/lib/currency";

/**
 * Get currency symbol for the provided currency code
 * @param currencyCode - The currency code (e.g. 'INR', 'USD')
 * @returns The currency symbol (e.g. '₹', '$')
 */
export function getCurrencySymbol(currencyCode: string = 'INR'): string {
    return currencyList.find(
        (currency) => currency.value.toLowerCase() === currencyCode.toLowerCase()
    )?.details?.currencySymbol || '₹';
}

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currencyCode - The currency code
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currencyCode: string = 'INR'): string {
    const symbol = getCurrencySymbol(currencyCode);
    return `${symbol}${amount.toLocaleString('en-IN')}`;
}

/**
 * Calculate the total amount from an array of items
 * @param items - Array of items with amount and quantity
 * @returns The total amount
 */
export function calculateItemsTotal(items: Array<{ amount: number | string; qty?: number }>): number {
    if (!items || !Array.isArray(items)) return 0;
    
    return items.reduce((total, item) => {
        const amount = typeof item.amount === 'number' ? item.amount : Number(item.amount) || 0;
        const quantity = typeof item.qty === 'number' ? item.qty : Number(item.qty) || 1;
        return total + (amount * quantity);
    }, 0);
}