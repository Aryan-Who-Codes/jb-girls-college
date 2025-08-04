export type Theme = "light" | "dark" | "forest" | "ocean" | "sunset";

export interface ThemeConfig {
  background: string;
  text: string;
  accent: string;
  gradient: string;
  emoji: string;
  button: string;
  card: string;
  stats: string;
}

export const themes: Record<Theme, ThemeConfig> = {
  light: {
    background: "bg-gray-50",
    text: "text-gray-900",
    accent: "from-violet-500 to-indigo-500",
    gradient: "from-violet-100/50 via-indigo-100/50 to-purple-100/50",
    emoji: "🌞",
    button: "hover:bg-violet-600 bg-violet-500",
    card: "bg-white/80 hover:bg-white/90",
    stats: "bg-white/90",
  },
  dark: {
    background: "bg-gray-950",
    text: "text-gray-50",
    accent: "from-violet-400 to-indigo-400",
    gradient: "from-violet-950/50 via-indigo-950/50 to-purple-950/50",
    emoji: "🌙",
    button: "hover:bg-violet-400 bg-violet-500",
    card: "bg-gray-900/50 hover:bg-gray-900/70",
    stats: "bg-gray-900/60",
  },
  forest: {
    background: "bg-emerald-950",
    text: "text-emerald-50",
    accent: "from-emerald-400 to-teal-400",
    gradient: "from-emerald-950/50 via-teal-950/50 to-green-950/50",
    emoji: "🌲",
    button: "hover:bg-emerald-400 bg-emerald-500",
    card: "bg-emerald-900/50 hover:bg-emerald-900/70",
    stats: "bg-emerald-900/60",
  },
  ocean: {
    background: "bg-blue-950",
    text: "text-blue-50",
    accent: "from-blue-400 to-cyan-400",
    gradient: "from-blue-950/50 via-cyan-950/50 to-teal-950/50",
    emoji: "🌊",
    button: "hover:bg-blue-400 bg-blue-500",
    card: "bg-blue-900/50 hover:bg-blue-900/70",
    stats: "bg-blue-900/60",
  },
  sunset: {
    background: "bg-orange-950",
    text: "text-orange-50",
    accent: "from-orange-400 to-red-400",
    gradient: "from-orange-950/50 via-red-950/50 to-rose-950/50",
    emoji: "🌅",
    button: "hover:bg-orange-400 bg-orange-500",
    card: "bg-orange-900/50 hover:bg-orange-900/70",
    stats: "bg-orange-900/60",
  },
};
