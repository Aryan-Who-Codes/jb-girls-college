import CustomTextInput from "@/app/component/ui/customTextInput";
import PaymentModeInput from "@/app/component/ui/paymentModeInput";
import { useFormContext } from "react-hook-form";
import DateInput from "../../ui/dateInput";

export const PaymentDetailsForm = () => {
  const { watch } = useFormContext();
  const paymentMode = watch('paymentMode');

  return (
    <div className="pt-24">
      <p className="text-2xl font-semibold pb-3">Payment Details</p>
      <PaymentModeInput />

      {paymentMode === 'netbanking' && (
        <>
          <CustomTextInput
            label="Bank name"
            placeholder="HDFC"
            variableName="bankName"
          />
          <CustomTextInput
            label="Account number"
            placeholder="8920804195"
            variableName="accountNumber"
          />
          <CustomTextInput
            label="Account Name"
            placeholder="Aakash"
            variableName="accountName"
          />
          <CustomTextInput
            label="IFSC code"
            placeholder="HDFC0560002"
            variableName="ifscCode"
          />
          <CustomTextInput
            label="Transaction ID"
            placeholder="0804189592"
            variableName="transactionID"
          />
          <DateInput label="Payment Date" variableName="paymentDate" />
        </>
      )}
    </div>
  );
};
