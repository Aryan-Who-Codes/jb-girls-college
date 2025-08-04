import { format } from "date-fns";

export const ReceiptTermsPreview: React.FC<
  ReceiptTerms & { onClick?: (step: string) => void }
> = ({ receiptNumber, issueDate, academicYear, onClick }) => {

  return (
    <div
      className="group cursor-pointer relative flex flex-col items-end"
      onClick={() => onClick && onClick("5")}
    >
      <div className="flex items-center gap-2 mb-4 mt-1">
        <p className="text-xl font-bold text-gray-800">Fee Receipt</p>
      </div>

      <div className="text-xs text-neutral-500/80 text-right w-full">
        {receiptNumber ? (
          <p className="mb-1">
            <strong>Receipt No:</strong> {receiptNumber}
          </p>
        ) : (
          <div className="rounded-md bg-neutral-100 h-4 w-3/6 animate-pulse my-2 ml-auto" />
        )}

        {issueDate ? (
          <p className="text-neutral-500/90 text-xs mb-1">
            <strong>Date:</strong> {format(new Date(issueDate), "do MMM yyyy")}
          </p>
        ) : (
          <div className="rounded-md bg-neutral-100 h-4 w-4/6 animate-pulse my-2 ml-auto" />
        )}

        {academicYear && (
          <p className="text-neutral-500/90 text-xs mb-1">
            <strong>Academic Year:</strong> {academicYear}
          </p>
        )}
      </div>
    </div>
  );
};
