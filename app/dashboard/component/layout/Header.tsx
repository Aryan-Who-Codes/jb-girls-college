'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { Menu, LogOut } from "lucide-react";

export function Header() {
  const { currentTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className={`
      sticky top-0 z-30 
      backdrop-blur-md bg-opacity-80
      border-b border-white/10
      ${currentTheme.card} ${currentTheme.text}
      transition-all duration-300 pl-2 pr-6
    `}>
      <div className="flex h-16 items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className={`
              md:hidden 
              rounded-lg
              hover:bg-white/10
              transition-colors duration-200
            `}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

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
            `}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
