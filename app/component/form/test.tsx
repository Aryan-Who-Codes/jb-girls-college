// import { CompanyDetailsPreview } from "@/app/component/form/companyDetails/companyDetailsPreview";
// import { InvoiceDetailsPreview } from "@/app/component/form/invoiceDetails/invoiceDetailsPreview";
// import { PaymentDetailsPreview } from "@/app/component/form/paymentDetails/paymentDetailsPreview";
// import { YourDetailsPreview } from "@/app/component/form/yourDetails/yourDetailsPreview";
import { ChevronDown } from "lucide-react";
import { CollegeDetailsPreview } from "./collegeDetails/collegeDetailsPreview";

export const PreviewDetails = ({
  // yourDetails,
  collegeDetails,
  // invoiceDetails,
  // paymentDetails,
  // receiptTerms,
  onClick,
}: {
  // yourDetails: YourDetails;
  collegeDetails: CollegeDetails;
  feeDetails: FeeItemDetails;
  paymentDetails: PaymentDetails;
  receiptTerms: ReceiptTerms;
  onClick?: (step: string) => void;
}) => (
  <div className="overflow-x-auto">
    <div className="w-[595px] h-[842px] bg-white rounded-2xl border border-dashed justify-center items-center">
      {/* <InvoiceTermsPreview {...invoiceTerms} onClick={onClick} /> */}
      <div className="border-b  grid grid-cols-2 justify-between border-dashed">
        <div
          className="py-4 px-10 border-r border-dashed cursor-pointer relative group"
          onClick={() => onClick && onClick("1")}
        >
          {!!onClick && (
            <>
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
            </>
          )}
          {/* <YourDetailsPreview {...yourDetails} /> */}
        </div>
        <div
          className="py-4 px-10 border-dashed cursor-pointer relative group"
          onClick={() => onClick && onClick("2")}
        >
          {!!onClick && (
            <>
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
            </>
          )}
          <CollegeDetailsPreview {...collegeDetails} />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="border-b justify-between border-dashed">
          {/* <InvoiceDetailsPreview {...invoiceDetails} onClick={onClick} /> */}
        </div>
        <div className="">
          {/* <PaymentDetailsPreview {...paymentDetails} onClick={onClick} /> */}
        </div>
      </div>
    </div>
  </div>
);
