"use client";

import { Button } from "@/components/ui/button";
import { Document, Font, Page } from "@react-pdf/renderer";
import { Check, CheckCircle2, Download, LoaderIcon, Trash2 } from "lucide-react";
import { PdfDetails } from "../pdfDetails";
import { useData } from "@/hooks/useData";
import { pdfContainers } from "@/lib/pdfStyles";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { svgToDataUri } from "@/lib/svgToDataUri";
import { useEffect, useState } from "react";
import { currencyList } from "@/lib/currency";
import { useFormContext } from "react-hook-form";
import { useReceiptGenerator } from "@/lib/useReceiptGenerator";
import { receiptGenerator } from "@/lib/receiptNumberGenerator";

export const DownloadReceiptButton = () => {
  const [status, setStatus] = useState<
    "downloaded" | "downloading" | "not-downloaded"
  >("not-downloaded");
  
  const [saveStatus, setSaveStatus] = useState<
    "saved" | "saving" | "not-saved"
  >("not-saved");

  const { receiptData } = useData(); // Use the combined receiptData
  const { createReceipt, updateReceipt, isCreating, error } = useReceiptGenerator();
  const { watch } = useFormContext();
  const paymentMode = watch('paymentMode');

  useEffect(() => {
    if (status === "downloaded") {
      setTimeout(() => {
        setStatus("not-downloaded");
      }, 2000);
    }
  }, [status]);

  useEffect(() => {
    if (saveStatus === "saved") {
      setTimeout(() => {
        setSaveStatus("not-saved");
      }, 2000);
    }
  }, [saveStatus]);

  const handleSaveToDatabase = async () => {
    try {
      setSaveStatus("saving");

      // Validate required data
      if (!receiptData.studentDetails.studentSRNo) {
        throw new Error('Student SR No is required');
      }
      if (!receiptData.feeDetails.items.length) {
        throw new Error('Fee items are required');
      }
      if (!receiptData.paymentDetails.paymentMode) {
        throw new Error('Payment mode is required');
      }

      let finalReceiptNumber = receiptData.receiptTerms.receiptNumber;

      // Generate receipt number if not exists or is temporary
      if (!finalReceiptNumber || finalReceiptNumber.includes('TEMP')) {
        const issueDate = receiptData.receiptTerms.issueDate 
          ? new Date(receiptData.receiptTerms.issueDate) 
          : new Date();
        finalReceiptNumber = await receiptGenerator.generateReceiptNumber(issueDate);
        
        // Update localStorage with the new receipt number
        localStorage.setItem("receiptNo", finalReceiptNumber);
      }

      // Check if receipt already exists
      const existingReceiptCheck = await fetch(`/api/receipt?receiptNumber=${finalReceiptNumber}`);
      
      if (existingReceiptCheck.ok) {
        // Receipt exists, update it
        await updateReceipt(finalReceiptNumber, {
          studentData: {
            studentName: receiptData.studentDetails.studentName || '',
            studentFatherName: receiptData.studentDetails.studentFatherName || '',
            studentMotherName: receiptData.studentDetails.studentMotherName || '',
            studentSRNo: receiptData.studentDetails.studentSRNo || '',
            studentCourse: receiptData.studentDetails.studentCourse || '',
            studentYear: receiptData.studentDetails.studentYear || '',
            studentAddress: receiptData.studentDetails.studentAddress || '',
            studentCity: receiptData.studentDetails.studentCity || '',
            studentState: receiptData.studentDetails.studentState || '',
            studentCountry: receiptData.studentDetails.studentCountry || '',
            studentEmail: receiptData.studentDetails.studentEmail || '',
            studentPhone: receiptData.studentDetails.studentPhone || '',
            studentZip: receiptData.studentDetails.studentZip || '',
            studentImage: receiptData.studentDetails.studentImage || '',
          },
          feeData: {
            note: receiptData.feeDetails.note || '',
            discount: receiptData.feeDetails.discount || '',
            taxRate: receiptData.feeDetails.taxRate || '',
            items: receiptData.feeDetails.items || [],
            currency: receiptData.feeDetails.currency || 'INR',
          },
          paymentData: {
            paymentMode: receiptData.paymentDetails.paymentMode || '',
            bankName: receiptData.paymentDetails.bankName || '',
            accountNumber: receiptData.paymentDetails.accountNumber || '',
            accountName: receiptData.paymentDetails.accountName || '',
            transactionID: receiptData.paymentDetails.transactionID || '',
            paymentDate: receiptData.paymentDetails.paymentDate 
              ? new Date(receiptData.paymentDetails.paymentDate) 
              : new Date(),
            ifscCode: receiptData.paymentDetails.ifscCode || '',
            currency: receiptData.paymentDetails.currency || 'INR',
          },
          termsData: {
            receiptNumber: finalReceiptNumber,
            issueDate: receiptData.receiptTerms.issueDate || new Date().toISOString(),
            academicYear: receiptData.receiptTerms.academicYear || '',
          },
        });
      } else {
        // Receipt doesn't exist, create new one
        await createReceipt();
      }

      setSaveStatus("saved");
      
      // Clear some localStorage items but keep important ones
      const keysToKeep = ['receiptNo', 'studentSRNo', 'collegeName', 'collegeDetails'];
      const allKeys = Object.keys(localStorage);
      allKeys.forEach(key => {
        if (!keysToKeep.some(keepKey => key.includes(keepKey))) {
          localStorage.removeItem(key);
        }
      });

    } catch (error) {
      console.error('Error saving to database:', error);
      setSaveStatus("not-saved");
      alert(`Error saving receipt: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setStatus("downloading");
      
      // Validate required data
      if (!receiptData.studentDetails.studentSRNo) {
        alert('Student SR No is required');
        setStatus("not-downloaded");
        return;
      }
      if (!receiptData.feeDetails.items.length) {
        alert('Fee items are required');
        setStatus("not-downloaded");
        return;
      }

      const currencyDetails = currencyList.find(
        (currencyDetail) =>
          currencyDetail.value.toLowerCase() ===
          (receiptData.feeDetails.currency || 'INR').toLowerCase()
      )?.details;

      const defaultCurrency = currencyList.find(
        (currencyDetail) =>
          currencyDetail.value.toLowerCase() === "INR".toLowerCase()
      )?.details;

      const data = await fetch(
        `/flag/1x1/${currencyDetails?.iconName || defaultCurrency?.iconName}.svg`
      );
      const svgFlag = await data.text();
      const countryImageUrl = await svgToDataUri(svgFlag);
      
      if (countryImageUrl) {
        const blob = await pdf(
          <Document>
            <Page size="A4" style={pdfContainers.page}>
              <PdfDetails
                collegeDetails={receiptData.collegeDetails}
                feeDetails={{
                  ...receiptData.feeDetails,
                  studentSRNo: receiptData.studentDetails.studentSRNo
                } as FeeItemDetails}
                receiptTerms={{
                  ...receiptData.receiptTerms,
                  studentSRNo: receiptData.studentDetails.studentSRNo
                } as ReceiptTerms}
                paymentDetails={{
                  ...receiptData.paymentDetails,
                  studentSRNo: receiptData.studentDetails.studentSRNo
                } as PaymentDetails}
                studentDetails={receiptData.studentDetails as StudentDetails}
                countryImageUrl={countryImageUrl}
                paymentMode={paymentMode}
              />
            </Page>
          </Document>
        ).toBlob();
        
        const fileName = `receipt-${receiptData.receiptTerms.receiptNumber || 'draft'}.pdf`;
        saveAs(blob, fileName);
        setStatus("downloaded");
      } else {
        setStatus("not-downloaded");
        alert('Failed to load currency flag');
      }
    } catch (e) {
      console.error('Error generating PDF:', e);
      setStatus("not-downloaded");
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all form data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">Your receipt is ready</h1>
          <p className="text-neutral-500 text-lg md:text-xl">
            Please review the details carefully before downloading your receipt.
          </p>
        </div>
        
        {/* Receipt Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Student:</strong> {receiptData.studentDetails.studentName || 'Not specified'}</p>
            <p><strong>SR No:</strong> {receiptData.studentDetails.studentSRNo || 'Not specified'}</p>
            <p><strong>Receipt No:</strong> {receiptData.receiptTerms.receiptNumber || 'Will be generated'}</p>
            <p><strong>Items:</strong> {receiptData.feeDetails.items.length} item(s)</p>
            {receiptData.receiptTerms.academicYear && (
              <p><strong>Academic Year:</strong> {receiptData.receiptTerms.academicYear}</p>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Download PDF Button */}
          <Button
            disabled={status === "downloading"}
            onClick={handleDownloadPDF}
            type="button"
            className="w-full h-14 rounded-lg text-base font-medium bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            {status === "not-downloaded" && (
              <>
                <Download className="mr-2 h-6 w-6" /> Download Receipt PDF
              </>
            )}
            {status === "downloading" && (
              <>
                <LoaderIcon className="mr-2 h-6 w-6 animate-spin" />
                Generating PDF...
              </>
            )}
            {status === "downloaded" && (
              <>
                <CheckCircle2 className="mr-2 h-6 w-6" /> PDF Downloaded
              </>
            )}
          </Button>

          {/* Save to Database Button */}
          <Button
            type="button"
            disabled={isCreating || saveStatus === "saving"}
            className="w-full h-14 rounded-lg text-base font-medium bg-white text-gray-900 border-2 border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={handleSaveToDatabase}
          >
            {saveStatus === "not-saved" && !isCreating && (
              <>
                <Check className="mr-2 h-6 w-6" /> Save to Database
              </>
            )}
            {(saveStatus === "saving" || isCreating) && (
              <>
                <LoaderIcon className="mr-2 h-6 w-6 animate-spin" />
                Saving...
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <CheckCircle2 className="mr-2 h-6 w-6" /> Saved Successfully
              </>
            )}
          </Button>

          {/* Clear All Data Button - Now properly positioned */}
          <Button
            type="button"
            onClick={handleClearAllData}
            variant="outline"
            className="w-full h-12 rounded-lg text-base font-medium bg-white text-red-600 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors"
          >
            <Trash2 className="mr-2 h-5 w-5" />
            Clear All Data
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-gray-500 pt-4">
          <p>Make sure to save your receipt before clearing the data.</p>
        </div>
      </div>
    </div>
  );
};

// Font registration (keep your existing font setup)
Font.register({
  family: "Geist",
  fonts: [
    {
      src: "/font/Geist-Thin.ttf",
      fontWeight: "thin",
    },
    {
      src: "/font/Geist-Ultralight.ttf",
      fontWeight: "ultralight",
    },
    {
      src: "/font/Geist-Light.ttf",
      fontWeight: "light",
    },
    {
      src: "/font/Geist-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/font/Geist-Medium.ttf",
      fontWeight: "medium",
    },
    {
      src: "/font/Geist-SemiBold.ttf",
      fontWeight: "semibold",
    },
    {
      src: "/font/Geist-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/font/Geist-UltraBlack.ttf",
      fontWeight: "ultrabold",
    },
  ],
});
