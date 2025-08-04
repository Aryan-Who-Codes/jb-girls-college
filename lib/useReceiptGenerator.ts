/* eslint-disable @typescript-eslint/no-explicit-any */
import { useData } from "@/hooks/useData";
import { useState } from "react";

export const useReceiptGenerator = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { receiptData } = useData(); // Now this will work with your existing useData

  const createReceipt = async () => {
    setIsCreating(true);
    setError(null);

    try {
      // Validate required data
      if (!receiptData.studentDetails.studentSRNo) {
        throw new Error("Student SR No is required");
      }
      if (!receiptData.feeDetails.items.length) {
        throw new Error("Fee items are required");
      }
      if (!receiptData.paymentDetails.paymentMode) {
        throw new Error("Payment mode is required");
      }

      // Transform your existing form data to match the API
      const payload = {
        studentData: {
          studentName: receiptData.studentDetails.studentName || "",
          studentFatherName: receiptData.studentDetails.studentFatherName || "",
          studentMotherName: receiptData.studentDetails.studentMotherName || "",
          studentSRNo: receiptData.studentDetails.studentSRNo || "",
          studentCourse: receiptData.studentDetails.studentCourse || "",
          studentYear: receiptData.studentDetails.studentYear || "",
          studentAddress: receiptData.studentDetails.studentAddress || "",
          studentCity: receiptData.studentDetails.studentCity || "",
          studentState: receiptData.studentDetails.studentState || "",
          studentCountry: receiptData.studentDetails.studentCountry || "",
          studentEmail: receiptData.studentDetails.studentEmail || "",
          studentPhone: receiptData.studentDetails.studentPhone || "",
          studentZip: receiptData.studentDetails.studentZip || "",
          studentImage: receiptData.studentDetails.studentImage || "",
        },
        feeData: {
          note: receiptData.feeDetails.note || "",
          discount: receiptData.feeDetails.discount || "",
          taxRate: receiptData.feeDetails.taxRate || "",
          items: receiptData.feeDetails.items || [],
          currency: receiptData.feeDetails.currency || "INR",
        },
        paymentData: {
          paymentMode: receiptData.paymentDetails.paymentMode || "",
          bankName: receiptData.paymentDetails.bankName || "",
          accountNumber: receiptData.paymentDetails.accountNumber || "",
          accountName: receiptData.paymentDetails.accountName || "",
          transactionID: receiptData.paymentDetails.transactionID || "",
          paymentDate: receiptData.paymentDetails.paymentDate
            ? new Date(receiptData.paymentDetails.paymentDate)
            : new Date(),
          ifscCode: receiptData.paymentDetails.ifscCode || "",
          currency: receiptData.paymentDetails.currency || "INR",
        },
        termsData: {
          receiptNumber: receiptData.receiptTerms.receiptNumber || "",
          issueDate:
            receiptData.receiptTerms.issueDate || new Date().toISOString(),
          academicYear: receiptData.receiptTerms.academicYear || "",
        },
      };

      const response = await fetch("/api/receipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create receipt");
      }

      const result = await response.json();

      // Update localStorage with the generated receipt number
      localStorage.setItem("receiptNo", result.data.receiptNumber);

      return result.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  const updateReceipt = async (receiptNumber: string, updateData: any) => {
    setIsCreating(true);
    setError(null);

    try {
      const response = await fetch("/api/receipts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiptNumber,
          ...updateData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update receipt");
      }

      const result = await response.json();

      // Update localStorage with the new receipt number
      localStorage.setItem("receiptNo", result.data.receiptNumber);

      return result.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createReceipt,
    updateReceipt,
    isCreating,
    error,
  };
};
