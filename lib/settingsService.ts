export interface AppSettings {
  // General settings
  instituteName: string;
  instituteAddress: string;
  institutePhone: string;
  instituteEmail: string;

  // Receipt settings
  receiptPrefix: string;
  autoIncrementReceipt: boolean;
  showReceiptLogo: boolean;

  // Other settings
  theme: "light" | "dark" | "system";
  dateFormat: string;
  currencySymbol: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  instituteName: "JB Girls College",
  instituteAddress: "",
  institutePhone: "",
  instituteEmail: "",

  receiptPrefix: "JB-",
  autoIncrementReceipt: true,
  showReceiptLogo: true,

  theme: "system",
  dateFormat: "DD/MM/YYYY",
  currencySymbol: "₹",
};

export class SettingsService {
  private static instance: SettingsService;
  private settings: AppSettings;
  private listeners: Array<(settings: AppSettings) => void> = [];

  private constructor() {
    this.settings = this.loadSettings();
  }

  public static getInstance(): SettingsService {
    if (!SettingsService.instance) {
      SettingsService.instance = new SettingsService();
    }
    return SettingsService.instance;
  }

  private loadSettings(): AppSettings {
    if (typeof window === "undefined") {
      return DEFAULT_SETTINGS;
    }

    const savedSettings = localStorage.getItem("appSettings");
    if (!savedSettings) {
      return DEFAULT_SETTINGS;
    }

    try {
      const parsedSettings = JSON.parse(savedSettings) as Partial<AppSettings>;
      return { ...DEFAULT_SETTINGS, ...parsedSettings };
    } catch (error) {
      console.error("Failed to parse settings:", error);
      return DEFAULT_SETTINGS;
    }
  }

  private saveSettings(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("appSettings", JSON.stringify(this.settings));
      this.notifyListeners();
    }
  }

  public getSettings(): AppSettings {
    return { ...this.settings };
  }

  public updateSettings(newSettings: Partial<AppSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
  }

  public getSetting<K extends keyof AppSettings>(key: K): AppSettings[K] {
    return this.settings[key];
  }

  public setSetting<K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ): void {
    this.settings[key] = value;
    this.saveSettings();
  }

  public subscribe(listener: (settings: AppSettings) => void): () => void {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(): void {
    const settingsCopy = { ...this.settings };
    this.listeners.forEach((listener) => listener(settingsCopy));
  }

  public resetToDefaults(): void {
    this.settings = { ...DEFAULT_SETTINGS };
    this.saveSettings();
  }
}

export const settingsService = SettingsService.getInstance();
