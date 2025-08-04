"use client";

import { CollegeDetailsForm } from "./collegeDetails/collegeDetailsForm";
import { useGetValue } from "@/hooks/useGetValue";
import { getInitialValue } from "@/lib/getInitialValue";
import { ReceiptTermsForm } from "./receiptTerms/receiptTermsForm";
import { StudentDetailsForm } from "./studentDetails/studentDetailsForm";
import { FeeDetailsForm } from "./feeDetails/feeDetailsForm";
import { PaymentDetailsForm } from "./paymentDetails/paymentDetailsForm";
import { DownloadReceiptButton } from "./downloadReceipt/downloadReceiptButton";
import { useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

export const UserInputForm = () => {
  const searchParams = useSearchParams();
  const { setValue } = useFormContext();
  const step = useGetValue("step", getInitialValue("step", "1"));
  const editId = searchParams.get('edit')

  useEffect(() => {
    if (editId) {
      const storedData = localStorage.getItem('editFormData');
      if (storedData) {
        const formData = JSON.parse(storedData);

        // Pre-fill college details
        Object.entries(formData.student).forEach(([key, value]) => {
          setValue(key, value);
        });

        // Pre-fill fee details
        Object.entries(formData.fee).forEach(([key, value]) => {
          setValue(key, value);
        });

        // Pre-fill payment details
        Object.entries(formData.payment).forEach(([key, value]) => {
          setValue(key, value);
        });

        // Pre-fill receipt terms
        Object.entries(formData.terms).forEach(([key, value]) => {
          setValue(key, value);
        });
      }
    }
  }, [editId, setValue]);


  return (
    <div>
      <div className={step === "1" ? "block" : "hidden"}>
        <CollegeDetailsForm />
      </div>
      <div className={step === "2" ? "block" : "hidden"}>
        <ReceiptTermsForm />
      </div>
      <div className={step === "3" ? "block" : "hidden"}>
        <StudentDetailsForm />
      </div>
      <div className={step === "4" ? "block" : "hidden"}>
        <FeeDetailsForm />
      </div>
      <div className={step === "5" ? "block" : "hidden"}>
        <PaymentDetailsForm />
      </div>
      {step === "6" && <DownloadReceiptButton />}
    </div>
  );
};
