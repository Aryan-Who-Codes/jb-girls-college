import { useGetValue, useItemParams } from "@/hooks/useGetValue";

export const useData = () => {
  const studentEmail = useGetValue("studentEmail");
  const studentName = useGetValue("studentName");
  const studentFatherName = useGetValue("studentFatherName");
  const studentMotherName = useGetValue("studentMotherName");
  const studentSRNo = useGetValue("studentSRNo");
  const studentCourse = useGetValue("studentCourse");
  const studentYear = useGetValue("studentYear");
  const studentAddress = useGetValue("studentAddress");
  const studentCity = useGetValue("studentCity");
  const studentState = useGetValue("studentState");
  const studentCountry = useGetValue("studentCountry");
  const studentImage = useGetValue("studentImage");
  const studentPhone = useGetValue("studentPhone");
  const studentZip = useGetValue("studentZip");

  const email = useGetValue("email");
  const collegeName = useGetValue("collegeName");
  const collegeAddress = useGetValue("collegeAddress");
  const collegeCity = useGetValue("collegeCity");
  const collegeState = useGetValue("collegeState");
  const collegeCountry = useGetValue("collegeCountry");
  const collegeLogo = useGetValue("collegeLogo");
  const collegePhone = useGetValue("collegePhone");
  const collegeZip = useGetValue("collegeZip");

  const note = useGetValue("note");
  const discount = useGetValue("discount");
  const taxRate = useGetValue("tax");
  const items = useItemParams();

  const paymentMode = useGetValue("paymentMode");
  const bankName = useGetValue("bankName");
  const accountNumber = useGetValue("accountNumber");
  const accountName = useGetValue("accountName");
  const transactionID = useGetValue("transactionID");
  const paymentDate = useGetValue("paymentDate");
  const ifscCode = useGetValue("ifscCode");

  const receiptNumber = useGetValue("receiptNo");
  const issueDate = useGetValue("issueDate");
  const academicYear = useGetValue("academicYear");

  const currency = useGetValue("currency") || "INR";

  const receiptTerms = {
    receiptNumber,
    issueDate,
    academicYear,
  };

  const feeDetails = {
    note,
    discount,
    taxRate,
    items,
    currency,
  };

  const paymentDetails = {
    paymentMode: paymentMode,
    bankName: bankName,
    accountNumber: accountNumber,
    accountName: accountName,
    transactionID: transactionID,
    paymentDate: paymentDate,
    ifscCode: ifscCode,
    currency,
  };

  const studentDetails = {
    studentName,
    studentFatherName,
    studentMotherName,
    studentSRNo,
    studentCourse,
    studentYear,
    studentAddress,
    studentCity,
    studentState,
    studentCountry,
    studentImage,
    studentEmail,
    studentPhone,
    studentZip,
  };

  const collegeDetails = {
    collegeName,
    collegeAddress,
    collegeCity,
    collegeState,
    collegeCountry,
    collegeLogo,
    collegePhone,
    collegeZip,
    email,
  };

  // Combined receipt data
  const receiptData = {
    collegeDetails,
    studentDetails,
    paymentDetails,
    receiptTerms,
    feeDetails,
  };

  return {
    collegeDetails,
    studentDetails,
    paymentDetails,
    receiptTerms,
    feeDetails,
    receiptData, // Add this combined object
  };
};
