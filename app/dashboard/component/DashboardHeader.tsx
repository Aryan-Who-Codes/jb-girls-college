import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { Download, BarChart } from "lucide-react";

export function DashboardHeader() {
    const { currentTheme } = useTheme();
    
    const handleDownload = () => {
        alert('Downloading dashboard report...');
    };

    return (
        <div className={`
            flex flex-col sm:flex-row items-start sm:items-center 
            justify-between gap-4 sm:gap-8
            p-6 rounded-xl
            ${currentTheme.card}
            backdrop-blur-md
            border border-white/10
            shadow-lg mb-7
        `}>
            <div className="flex items-center gap-4">
                <div className={`
                    p-3 rounded-lg
                    bg-gradient-to-br ${currentTheme.accent}
                    shadow-lg
                `}>
                    <BarChart className="h-6 w-6 text-white" />
                </div>
                
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-sm opacity-70 mt-1">Welcome to your analytics overview</p>
                </div>
            </div>

            <Button 
                onClick={handleDownload} 
                className={`
                    ${currentTheme.button}
                    rounded-lg
                    shadow-lg
                    transition-all duration-200
                    hover:scale-105
                    flex items-center gap-2
                `}
            >
                <Download className="h-4 w-4" />
                <span>Download Report</span>
            </Button>
        </div>
    );
}
