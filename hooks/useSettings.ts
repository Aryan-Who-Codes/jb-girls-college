"use client";

import { useEffect, useState } from "react";
import { AppSettings, settingsService } from "@/lib/settingsService";

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(
    settingsService.getSettings()
  );

  useEffect(() => {
    // Subscribe to settings changes
    const unsubscribe = settingsService.subscribe((newSettings) => {
      setSettings(newSettings);
    });

    // Unsubscribe on cleanup
    return unsubscribe;
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    settingsService.updateSettings(newSettings);
  };

  const getSetting = <K extends keyof AppSettings>(key: K): AppSettings[K] => {
    return settings[key];
  };

  const setSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    settingsService.setSetting(key, value);
  };

  const resetToDefaults = () => {
    settingsService.resetToDefaults();
  };

  return {
    settings,
    updateSettings,
    getSetting,
    setSetting,
    resetToDefaults,
  };
}
