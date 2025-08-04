"use client";
import { PreviewDetails } from "@/app/component/form/previewDetails";
import { useData } from "@/hooks/useData";
import { useFormContext } from "react-hook-form";

export const StudentDataPreview = () => {
  const {
    collegeDetails,
    feeDetails,
    receiptTerms,
    paymentDetails,
    studentDetails,
  } = useData();
  const { setValue } = useFormContext();

  const onClick = (step: string) => {
    setValue("step", step);
    localStorage.setItem("step", step);
  };

  return (
    <PreviewDetails
      onClick={onClick}
      collegeDetails={collegeDetails}
      feeDetails={{
        ...feeDetails,
        studentSRNo: '',
        _id: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      }}
      receiptTerms={{
        ...receiptTerms,
        studentSRNo: '',
        _id: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      }}
      paymentDetails={{
        ...paymentDetails,
        studentSRNo: '',
        _id: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      }}
      studentDetails={{
        ...studentDetails,
        _id: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0
      }}
    />
  );
};