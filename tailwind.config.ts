import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./types/**/*.{js,ts,jsx,tsx,mdx}", // Add this to include your theme.ts file
  ],
  safelist: [
    // Existing classes
    "bg-gray-50",
    "bg-gray-950",
    "text-gray-900",
    "text-gray-50",
    "bg-emerald-950",
    "text-emerald-50",
    "bg-blue-950",
    "text-blue-50",
    "bg-orange-950",
    "text-orange-50",
    "from-violet-500",
    "to-indigo-500",
    "from-emerald-400",
    "to-teal-400",
    "from-blue-400",
    "to-cyan-400",
    "from-orange-400",
    "to-red-400",
    // Add classes for any new themes
    "bg-purple-950",
    "text-purple-50",
    "from-purple-400",
    "to-fuchsia-400",
    // Add animation-related classes
    "bg-transparent",
    "bg-white/10",
    "bg-white/80",
    "bg-white/90",
    "bg-gray-900/50",
    "bg-gray-900/70",
    "bg-gray-900/60",
    // Add any other classes used in your themes
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        xs: "11px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        xxs: "11px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 10s ease-in-out infinite",
      },
      colors: {
        // Professional color system
        gray: {
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
        },
        neutral: {
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
        },
        college: {
          maroon: "#800020",
          gold: "#FFD700",
          navy: "#000080",
        },
        // Theme-specific colors
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          hover: "rgb(var(--primary-hover) / <alpha-value>)",
        },
        background: "rgb(var(--background) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        action: {
          DEFAULT: "#3B82F6", // Blue 500
          hover: "#2563EB",
        },
        error: {
          DEFAULT: "#EF4444", // Red 500
          hover: "#DC2626",
        },
      },
      spacing: {
        container: "2rem",
      },
      maxWidth: {
        container: "1400px",
      },
      transitionDuration: {
        slow: "var(--transition-slow)",
        medium: "var(--transition-medium)",
        fast: "var(--transition-fast)",
      },
    },
  },
  // Remove the variants section as it's not properly implemented
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-animate"),
    // Uncomment if you're using forms
    // require('@tailwindcss/forms'),
  ],
} satisfies Config;

export default config;
