import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";
import { pdfTypography, pdfContainers, pdfUtils } from "@/lib/pdfStyles";

export const ReceiptTermsPdf: React.FC<ReceiptTerms> = ({
  receiptNumber,
  issueDate,
}) => (
  <View style={{ ...pdfContainers.receiptTerms, alignItems: 'flex-end', marginLeft: 25 }}>
    <View>
      <View style={{ ...pdfUtils.flexRowItemCenter, marginBottom: 12 }}>
        <Text style={pdfTypography.text2xl}>Fee Receipt</Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        {receiptNumber && (
          <Text style={{ ...pdfTypography.description, marginBottom: 4, marginTop: 10 }}>
            <Text style={{ fontWeight: 'medium' }}>Receipt No: </Text>
            {receiptNumber}
          </Text>
        )}

        {issueDate && (
          <Text style={{ ...pdfTypography.description, marginBottom: 43.3 }}>
            <Text style={{ fontWeight: 'medium' }}>Date: </Text>
            {format(issueDate, "do MMM yyyy")}
          </Text>
        )}
      </View>
    </View>
  </View>
);
