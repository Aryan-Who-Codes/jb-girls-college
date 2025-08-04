import { ChevronDown } from "lucide-react";
import { CollegeDetailsPreview } from "./collegeDetails/collegeDetailsPreview";
import { ReceiptTermsPreview } from "./receiptTerms/receiptTermsPreview";
import { StudentDetailsPreview } from "./studentDetails/studentDetailsPreview";
import { FeeDetailsPreview } from "./feeDetails/feeDetailsPreview";
import { PaymentDetailsPreview } from "./paymentDetails/paymentDetailsPreview";

export const PreviewDetails = ({
  studentDetails,
  collegeDetails,
  feeDetails,
  paymentDetails,
  receiptTerms,
  onClick,
}: {
  studentDetails: StudentDetails;
  collegeDetails: CollegeDetails;
  feeDetails: FeeItemDetails;
  paymentDetails: PaymentDetails;
  receiptTerms: ReceiptTerms;
  onClick?: (step: string) => void;
}) => (
  <div className="overflow-x-auto">
    {/* h-[1142px] */}
    <div className="w-[630px] h-full bg-white rounded-2xl border border-dashed justify-center items-center">
      <div className="border-b  grid grid-cols-2 justify-between border-dashed">
        <div
          className="py-4 px-10 border-r border-dashed cursor-pointer relative group"
          onClick={() => onClick && onClick("1")}
        >
          {!!onClick && (
            <>
              <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
            </>
          )}
          <CollegeDetailsPreview {...collegeDetails} />
        </div>
        <div
          className="py-4 px-10 border-dashed cursor-pointer relative group"
          onClick={() => onClick && onClick("2")}
        >
          {!!onClick && (
            <>
              <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
            </>
          )}
          <ReceiptTermsPreview {...receiptTerms} onClick={onClick} />
        </div>
      </div>
      <div className="border-b border-dashed">
        <StudentDetailsPreview {...studentDetails} onClick={onClick} />
      </div>
      <div className="flex flex-col justify-between">
        <div className="border-b justify-between border-dashed">
          <FeeDetailsPreview {...feeDetails} onClick={onClick} />
        </div>
        <div className="">
          <PaymentDetailsPreview {...paymentDetails} onClick={onClick} />
        </div>
      </div>
    </div>
  </div>
);
