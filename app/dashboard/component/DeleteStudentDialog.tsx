import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define types based on your database models
interface Student {
    _id: string;
    studentName: string;
    studentFatherName: string;
    studentMotherName: string;
    studentSRNo: string;
    studentCourse: string;
    studentYear: string;
    studentAddress: string;
    studentCity: string;
    studentState: string;
    studentCountry: string;
    studentImage?: string;
    studentEmail?: string;
    studentPhone: string;
    studentZip: string;
    createdAt: string;
}


interface DeleteStudentDialogProps {
    student: Student | null;
    onClose: () => void;
    onDelete: (student: Student) => void;
}

export function DeleteStudentDialog({ student, onClose, onDelete }: DeleteStudentDialogProps) {
    return (
        <AlertDialog open={!!student} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Student Record</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will permanently delete {student?.studentName}&apos;s record and all associated data including fees, payments, and terms. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => student && onDelete(student)}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
