/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Image, Text, View } from "@react-pdf/renderer";
import { currencyList } from "@/lib/currency";
import { pdfTypography, pdfUtils } from "@/lib/pdfStyles";
import { format } from "date-fns";
import { paymentModeList } from "../../ui/paymentModeInput";

interface PaymentDetailsPdfProps extends PaymentDetails {
  countryImageUrl: string;
  paymentMode: string;
}

export const PaymentDetailsPdf: React.FC<PaymentDetailsPdfProps> = ({
  bankName,
  accountNumber,
  accountName,
  transactionID,
  paymentDate,
  ifscCode,
  currency = "INR",
  countryImageUrl,
  paymentMode,
}) => {
  const selectedMode = paymentModeList.find(
    (mode) => mode.value.toLowerCase() === (paymentMode?.toLowerCase() || "cash")
  );

  const currencyDetails = currencyList.find(
    (currencyDetail) =>
      currencyDetail.value.toLowerCase() === currency.toLowerCase()
  )?.details;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          paddingLeft: 40,
          paddingRight: 12,
          paddingVertical: 16,
          flexDirection: "column",
        }}
      >
        <Text style={{ ...pdfTypography.title, marginBottom: 8 }}>Payment Details</Text>
        <View style={{ gap: 4 }}>
          <DetailRow label="Payment Mode" value={selectedMode?.label} />

          {paymentMode === 'netbanking' && (
            <>
              <DetailRow label="Bank Name" value={bankName} />
              <DetailRow label="Account Number" value={accountNumber} />
              <DetailRow label="Account Name" value={accountName} />
              <DetailRow label="Transaction ID" value={transactionID} />
              {ifscCode && <DetailRow label="IFSC Code" value={ifscCode} />}
            </>
          )}
          {paymentDate && <DetailRow label="Payment Date" value={paymentDate
            ? format(new Date(paymentDate), "do MMM yyyy")
            : "-"} />}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingLeft: 40,
          paddingRight: 12,
          paddingVertical: 16,
          flexDirection: "column",
        }}
      >
        <Text style={{ ...pdfTypography.title, paddingBottom: 12 }}>
          Payable in
        </Text>
        {currencyDetails && (
          <View style={{ ...pdfUtils.flexRowItemCenter, gap: 8 }}>
            <Image
              src={countryImageUrl}
              style={{
                width: 30,
                height: 30,
                flexShrink: 0,
                borderRadius: 25,
                objectFit: "cover",
              }}
            />
            <View>
              <Text style={{ fontSize: 14, fontWeight: "medium" }}>
                {currencyDetails.currencyName}
              </Text>
              <Text style={pdfTypography.title}>
                {currencyDetails.currencySymbol}{" "}
                {currencyDetails.currencyShortForm}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <View style={{ ...pdfUtils.flexRowItemCenter, gap: 4 }}>
    <Text style={{ ...pdfTypography.paymentTitle, width: 100, fontSize: 10 }}>{label}</Text>
    <Text style={{ ...pdfTypography.itemDescription, fontSize: 10 }}>{value || '-'}</Text>
  </View>
);