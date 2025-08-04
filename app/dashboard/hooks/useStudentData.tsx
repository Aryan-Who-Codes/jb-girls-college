import { useCallback, useEffect, useState } from "react";

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

export function useStudentData() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/students');
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const data = await response.json();
            setStudents(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching students:', err);
            setError('Failed to load student data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteStudent = useCallback(async (id: string) => {
        try {
            const response = await fetch(`/api/students/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            // Return success
            return true;
        } catch (err) {
            console.error('Error deleting student:', err);
            throw new Error('Failed to delete student. Please try again.');
        }
    }, []);

    // Initial data fetch
    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    return {
        students,
        loading,
        error,
        fetchStudents,
        deleteStudent
    };
}