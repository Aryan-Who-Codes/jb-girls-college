/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import DateInput from "@/app/component/ui/dateInput";
import { useData } from "@/hooks/useData";
import CustomTextInput from "../../ui/customTextInput";
import CustomReceiptInput from "../../ui/customReceiptInput";

export const ReceiptTermsForm = () => {
  const { setValue, watch } = useFormContext();
  const { receiptTerms } = useData();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");

  const existingReceiptNo = watch("receiptNo");
  const academicYear = watch("academicYear");

  useEffect(() => {
    // Set default issue date to today
    setValue("issueDate", new Date());

    // Set default academic year if not set
    if (!academicYear) {
      const currentYear = new Date().getFullYear();
      const defaultAcademicYear = `${currentYear}-${currentYear + 1}`;
      setValue("academicYear", defaultAcademicYear);
    }

    // Auto-generate receipt number if it doesn't exist or is temporary
    if (!existingReceiptNo || existingReceiptNo.includes('TEMP')) {
      handleGenerateReceiptNumber();
    }
  }, [setValue, academicYear]);

  const handleGenerateReceiptNumber = async () => {
    setIsGenerating(true);
    setError("");

    try {
      const issueDate = watch("issueDate");

      const response = await fetch('/api/receipt-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: issueDate || new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setValue("receiptNo", data.receiptNumber);
        localStorage.setItem("receiptNo", data.receiptNumber);
        console.log("Generated receipt number:", data.receiptNumber);
      } else {
        throw new Error(data.error || 'Failed to generate receipt number');
      }

    } catch (err) {
      setError("Failed to generate receipt number. Please try again.");
      console.error("Receipt generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="pt-24">
      <p className="text-2xl font-semibold pb-3">Receipt terms</p>

      <CustomTextInput
        label="Academic Year"
        placeholder="2024-2025"
        variableName="academicYear"
      />

      <div className="mb-4">
        <CustomReceiptInput
          label="Receipt number"
          placeholder="RCPT-20250102-000001"
          variableName="receiptNo"
          disabled={isGenerating}
        />

        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={handleGenerateReceiptNumber}
            disabled={isGenerating}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? "Generating..." : "Generate New Receipt Number"}
          </button>

          {existingReceiptNo && existingReceiptNo.includes('TEMP') && (
            <button
              type="button"
              onClick={handleGenerateReceiptNumber}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Replace Temporary Number
            </button>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}

        {existingReceiptNo && !existingReceiptNo.includes('TEMP') && (
          <p className="text-green-600 text-sm mt-1">
            ✓ Receipt number: {existingReceiptNo}
          </p>
        )}

        {existingReceiptNo && existingReceiptNo.includes('TEMP') && (
          <p className="text-orange-600 text-sm mt-1">
            ⚠️ Temporary receipt number: {existingReceiptNo}
          </p>
        )}
      </div>

      <DateInput label="Issue date" variableName="issueDate" />
    </div>
  );
};
