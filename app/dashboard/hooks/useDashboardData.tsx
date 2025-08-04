import { useState, useEffect, useCallback } from 'react';

type Student = {
  studentSRNo: string;
  studentName: string;
  studentEmail: string;
};

type Fee = {
  studentSRNo: string;
  items: Array<{
    amount: number | string;
    qty?: number;
  }>;
  createdAt: string;
};

type Payment = {
  _id: string;
  studentSRNo: string;
  paymentMode: string;
  paymentDate?: string;
  currency?: string;
};

type Stats = {
  totalRevenue: number;
  subscriptions: number;
  sales: number;
  activeUsers: number;
};

type RecentPayment = {
  _id: string;
  studentId: string;
  studentName: string;
  amount: number;
  date: string;
  method: string;
  email: string;
  currency: string;
};

/**
 * Custom hook to fetch and manage all dashboard data
 */
export function useDashboardData() {
  // State for API data
  const [students, setStudents] = useState<Student[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    subscriptions: 0,
    sales: 0,
    activeUsers: 0,
  });

  // Data processing functions
  const calculateStats = useCallback((
    studentsData: Student[], 
    feesData: Fee[]
  ): Stats => {
    const totalRevenue = feesData.reduce((sum, fee) => {
      // Calculate total for each fee record
      const feeTotal = Array.isArray(fee.items) 
        ? fee.items.reduce((itemSum, item) => {
            const itemAmount = typeof item.amount === 'number' ? item.amount : 0;
            const quantity = typeof item.qty === 'number' ? item.qty : 1;
            return itemSum + (itemAmount * quantity);
          }, 0)
        : 0;

      return sum + feeTotal;
    }, 0);

    return {
      totalRevenue,
      subscriptions: studentsData.length,
      sales: feesData.length,
      activeUsers: studentsData.length,
    };
  }, []);

  const generateMonthlyData = useCallback((feesData: Fee[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map(name => ({ name, total: 0 }));

    feesData.forEach(fee => {
      if (!fee.createdAt) return;
      
      const feeDate = new Date(fee.createdAt);
      const monthIndex = feeDate.getMonth();

      let feeTotal = 0;
      if (fee.items && Array.isArray(fee.items)) {
        feeTotal = fee.items.reduce((sum, item) => {
          const amount = Number(item.amount);
          const quantity = Number(item.qty || 1);
          return sum + (amount * quantity);
        }, 0);
      }

      if (!isNaN(feeTotal) && monthIndex >= 0 && monthIndex < 12) {
        monthlyData[monthIndex].total += feeTotal;
      }
    });

    return monthlyData;
  }, []);

  const getRecentPayments = useCallback((
    paymentsData: Payment[], 
    studentsData: Student[], 
    feesData: Fee[]
  ): RecentPayment[] => {
    if (!paymentsData.length) return [];

    return [...paymentsData]
      .sort((a, b) => {
        const dateA = a.paymentDate ? new Date(a.paymentDate).getTime() : 0;
        const dateB = b.paymentDate ? new Date(b.paymentDate).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 5)
      .map(payment => {
        const feeRecord = feesData.find(fee => fee.studentSRNo === payment.studentSRNo);
        const feeAmount = feeRecord?.items.reduce((sum, item) =>
          sum + (Number(item.amount) * (Number(item.qty) || 1)), 0) || 0;

        const studentRecord = studentsData.find(student =>
          student.studentSRNo === payment.studentSRNo);

        return {
          _id: payment._id,
          studentId: payment.studentSRNo,
          studentName: studentRecord?.studentName || 'Unknown Student',
          amount: feeAmount,
          date: payment.paymentDate ? new Date(payment.paymentDate).toISOString() : new Date().toISOString(),
          method: payment.paymentMode,
          email: studentRecord?.studentEmail || '',
          currency: payment.currency || 'INR'
        };
      });
  }, []);

  // Fetch data function that can be called to reload
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all data in parallel
      const [studentsRes, feesRes, paymentsRes] = await Promise.all([
        fetch('/api/students'),
        fetch('/api/fees'),
        fetch('/api/payments')
      ]);

      // Handle error responses
      if (!studentsRes.ok || !feesRes.ok || !paymentsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      // Parse JSON responses
      const studentsData = await studentsRes.json();
      const feesData = await feesRes.json();
      const paymentsData = await paymentsRes.json();

      // Update state with fetched data
      setStudents(studentsData);
      setFees(feesData);
      setPayments(paymentsData);

      // Calculate derived data
      setStats(calculateStats(studentsData, feesData));
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [calculateStats]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derived data
  const monthlyData = generateMonthlyData(fees);
  const recentPayments = getRecentPayments(payments, students, fees);

  return {
    loading,
    error,
    stats,
    monthlyData,
    recentPayments,
    reloadData: fetchData
  };
}