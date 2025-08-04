import { View } from "@react-pdf/renderer";
import { pdfUtils } from "@/lib/pdfStyles";
import { CollegeDetailsPdf } from "./collegeDetails/collegeDetailsPdf";
import { ReceiptTermsPdf } from "./receiptTerms/receiptTermsPdf";
import { StudentDetailsPDF } from "./studentDetails/studentDetailsPdf";
import { FeeDetailsPdf } from "./feeDetails/feeDetailsPdf";
import { PaymentDetailsPdf } from "./paymentDetails/paymentDetailsPdf";

export const PdfDetails = ({
  studentDetails,
  collegeDetails,
  feeDetails,
  paymentDetails,
  receiptTerms,
  countryImageUrl,
  paymentMode,
}: {
  studentDetails: StudentDetails;
  collegeDetails: CollegeDetails;
  feeDetails: FeeItemDetails;
  paymentDetails: PaymentDetails;
  receiptTerms: ReceiptTerms;
  countryImageUrl: string;
  paymentMode: string;
}) => (
  <View>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        ...pdfUtils.borderTop,
        ...pdfUtils.borderBottom,
      }}
    >
      <CollegeDetailsPdf {...collegeDetails} />
      <ReceiptTermsPdf {...receiptTerms} />
    </View>
    <View style={pdfUtils.borderBottom}>
      <StudentDetailsPDF {...studentDetails} />
    </View>
    <View>
      <View style={pdfUtils.borderBottom}>
        <FeeDetailsPdf {...feeDetails} />
      </View>
      <View>
        <PaymentDetailsPdf
          {...paymentDetails}
          countryImageUrl={countryImageUrl}
          paymentMode={paymentMode}
        />
      </View>
    </View>
  </View>
);
