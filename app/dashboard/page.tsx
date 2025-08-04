/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/hooks/useTheme";
import { DashboardHeader } from "./component/DashboardHeader";
import { StatsCards } from "./component/StatsCards";
import { OverviewChart } from "./component/OverviewChart";
import { RecentPayments } from "./component/RecentPayments";
import { useDashboardData } from "./hooks/useDashboardData";
import { StudentTabsContent } from "./component/StudentTabsContent";
import { useState } from "react";

export default function Dashboard() {
  const { currentTheme } = useTheme();
  const { loading, error, stats, recentPayments, monthlyData, reloadData } = useDashboardData();
  const [activeTab, setActiveTab] = useState(() => {
    // Try to get saved tab from localStorage, fallback to 'overview'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dashboardTab') || 'overview';
    }
    return 'overview';
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('dashboardTab', value);
  };

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} transition-all duration-500`}>
      <div className={`flex-1 space-y-6 p-6 md:p-10 pt-8 relative`}>
        {/* Gradient background */}
        <div className="fixed inset-0 z-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-80`} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <DashboardHeader />

          {loading ? (
            <DashboardLoading theme={currentTheme} />
          ) : error ? (
            <DashboardError error={error} theme={currentTheme} onRetry={reloadData} />
          ) : (
            <DashboardContent
              theme={currentTheme}
              stats={stats}
              monthlyData={monthlyData}
              recentPayments={recentPayments}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardLoading({ theme }: { theme: any }) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className={`${theme.card} p-8 rounded-lg shadow-lg`}>
        <span className="text-lg">Loading dashboard data...</span>
      </div>
    </div>
  );
}

function DashboardError({ error, theme, onRetry }: { error: string; theme: any; onRetry: () => void }) {
  return (
    <Card className={`${theme.card} shadow-lg backdrop-blur-sm border border-white/10`}>
      <CardContent className="p-6">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <Button
            variant="outline"
            className={`mt-4 ${theme.button}`}
            onClick={onRetry}
          >
            Retry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardContent({
  theme,
  stats,
  monthlyData,
  recentPayments,
  activeTab,
  handleTabChange
}: {
  theme: any;
  stats: {
    totalRevenue: number;
    subscriptions: number;
    sales: number;
    activeUsers: number;
  };
  monthlyData: Array<{ name: string; total: number }>;
  recentPayments: Array<{
    _id: string;
    studentId: string;
    studentName: string;
    amount: number;
    date: string;
    method: string;
    email: string;
    currency: string;
  }>;
  activeTab: string;
  handleTabChange: (value: string) => void;
}) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="space-y-6"
    >
      <TabsList className={`grid w-full grid-cols-4 md:w-auto ${theme.card} rounded-xl shadow-md backdrop-blur-sm p-1`}>
        <TabsTrigger value="overview" className="data-[state=active]:bg-white/10 rounded-xl">Overview</TabsTrigger>
        <TabsTrigger value="students" className="data-[state=active]:bg-white/10 rounded-xl">Students</TabsTrigger>
        <TabsTrigger value="payments" className="data-[state=active]:bg-white/10 rounded-xl">Payments</TabsTrigger>
        <TabsTrigger value="terms" className="data-[state=active]:bg-white/10 rounded-xl">Terms</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <StatsCards stats={stats} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className={`col-span-4 ${theme.card} shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow duration-300 rounded-xl border border-white/10`}>
            <CardHeader>
              <CardTitle className={`${theme.text} text-2xl font-bold`}>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <OverviewChart data={monthlyData} />
            </CardContent>
          </Card>

          <Card className={`col-span-3 ${theme.card} shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow duration-300 rounded-xl border border-white/10`}>
            <CardHeader>
              <CardTitle className={`${theme.text} text-2xl font-bold`}>Recent Payments</CardTitle>
              <CardDescription className="text-base opacity-90">
                {recentPayments.length} payments received this term
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentPayments payments={recentPayments} />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="students" className="space-y-6">
        <StudentTabsContent />
      </TabsContent>

      <PlaceholderTabContent
        value="payments"
        title="Payment Records"
        description="Manage all payment transactions"
        theme={theme}
      />
      <PlaceholderTabContent
        value="terms"
        title="Academic Terms"
        description="Configure terms and sessions"
        theme={theme}
      />
    </Tabs>
  );
}

function PlaceholderTabContent({
  value,
  title,
  description,
  theme
}: {
  value: string;
  title: string;
  description: string;
  theme: any
}) {
  return (
    <TabsContent value={value} className="space-y-6">
      <Card className={`${theme.card} shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow duration-300 rounded-xl border border-white/10`}>
        <CardHeader>
          <CardTitle className={`${theme.text} text-2xl font-bold`}>{title}</CardTitle>
          <CardDescription className="text-base opacity-90">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{value} management features coming soon</p>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
