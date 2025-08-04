import { currencyList } from "@/lib/currency";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { paymentModeList } from "../../ui/paymentModeInput";
import { useFormContext } from "react-hook-form";

export const PaymentDetailsPreview: React.FC<
  PaymentDetails & { onClick?: (step: string) => void, paymentMode?: string }
> = ({
  bankName,
  accountNumber,
  accountName,
  transactionID,
  paymentDate,
  ifscCode,
  currency = "INR",
  onClick,
}) => {
    const { watch } = useFormContext();
    const paymentMode = watch('paymentMode');

    const currencyDetails = currencyList.find(
      (currencyDetails) =>
        currencyDetails.value.toLowerCase() === currency.toLowerCase()
    )?.details;

    const selectedMode = paymentModeList.find(
      (mode) => mode.value.toLowerCase() === (paymentMode?.toLowerCase() || "cash")
    );

    return (
      <div
        className="grid grid-cols-2 group cursor-pointer relative"
        onClick={() => onClick && onClick("5")}
      >
        {!!onClick && (
          <>
            <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
            <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
            <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
            <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
          </>
        )}
        <div className="py-4 pl-10 pr-3">
          <p className="text-[11px] text-neutral-400 font-medium uppercase mb-3">
            Payment Details
          </p>
          <div className="space-y-1">
            <div className="grid grid-cols-2 items-center">
              <p className="truncate text-xs font-medium text-gray-500">
                Payment Mode
              </p>
              <p className="flex truncate text-xs font-medium text-gray-600">
                {selectedMode?.label}
              </p>
            </div>

            {paymentMode === 'netbanking' && (
              <>
                <div className="grid grid-cols-2 items-center">
                  <p className="truncate text-xs font-medium text-gray-500">
                    Bank Name
                  </p>
                  {bankName ? (
                    <p className="flex truncate text-xs font-medium text-gray-600">
                      {bankName}
                    </p>
                  ) : (
                    <div className="rounded-[3.5px] bg-neutral-100 h-4 w-full animate-pulse" />
                  )}
                </div>
                <div className="mb-2 grid grid-cols-2 items-center">
                  <p className="truncate text-xs font-medium text-gray-500">
                    Account Number
                  </p>
                  {accountNumber ? (
                    <p className="flex truncate text-xs font-medium text-gray-600">
                      {accountNumber}
                    </p>
                  ) : (
                    <div className="rounded-[3.5px] bg-neutral-100 h-4 w-full animate-pulse" />
                  )}
                </div>
                <div className="mb-2 grid grid-cols-2 items-center">
                  <p className="truncate text-xs font-medium text-gray-500">
                    Account Name
                  </p>
                  {accountName ? (
                    <p className="flex truncate text-xs font-medium text-gray-600">
                      {accountName}
                    </p>
                  ) : (
                    <div className="rounded-[3.5px] bg-neutral-100 h-4 w-full animate-pulse" />
                  )}
                </div>
                <div className="mb-2 grid grid-cols-2 items-center">
                  <p className="truncate text-xs font-medium text-gray-500">
                    Transaction ID
                  </p>
                  {transactionID ? (
                    <p className="flex truncate text-xs font-medium text-gray-600">
                      {transactionID}
                    </p>
                  ) : (
                    <div className="rounded-[3.5px] bg-neutral-100 h-4 w-full animate-pulse" />
                  )}
                </div>
                {ifscCode && (
                  <div className="mb-2 grid grid-cols-2 items-center">
                    <p className="truncate text-xs font-medium text-gray-500">
                      IFSC Code
                    </p>
                    <p className="flex truncate text-xs font-medium text-gray-600">
                      {ifscCode}
                    </p>
                  </div>
                )}
              </>
            )}
            {paymentDate && (
              <div className="mb-2 grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-gray-500">
                  Payment Date
                </p>
                <p className="flex truncate text-xs font-medium text-gray-600">
                  {format(paymentDate, "do MMM yyyy")}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="py-4 px-10">
          <p className="text-[11px] text-neutral-400 font-medium uppercase mb-3">
            Payable in
          </p>
          {currencyDetails && (
            <div className="flex gap-2 justify-between items-center w-full">
              <div className="flex gap-3 items-center">
                <currencyDetails.icon className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-medium text-sm">
                    {currencyDetails.currencyName}
                  </p>
                  <p className="text-xxs text-neutral-400">
                    {currencyDetails.currencySymbol}{" "}
                    {currencyDetails.currencyShortForm}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
