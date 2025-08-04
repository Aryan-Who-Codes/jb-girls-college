import { Schema, model, models, Document } from 'mongoose';

export interface ISettings extends Document {
  instituteName: string;
  instituteAddress: string;
  institutePhone: string;
  instituteEmail: string;
  receiptPrefix: string;
  autoIncrementReceipt: boolean;
  showReceiptLogo: boolean;
  theme: string;
  dateFormat: string;
  currencySymbol: string;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    instituteName: { type: String, default: "JB Girls College" },
    instituteAddress: { type: String, default: "" },
    institutePhone: { type: String, default: "" },
    instituteEmail: { type: String, default: "" },
    receiptPrefix: { type: String, default: "JB-" },
    autoIncrementReceipt: { type: Boolean, default: true },
    showReceiptLogo: { type: Boolean, default: true },
    theme: { type: String, default: "system" },
    dateFormat: { type: String, default: "DD/MM/YYYY" },
    currencySymbol: { type: String, default: "₹" },
  },
  { timestamps: true }
);

const Settings = models.Settings || model<ISettings>('Settings', SettingsSchema);

export default Settings;
