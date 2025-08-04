/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Edit, Trash2, Phone, Mail, FileText, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/hooks/useTheme";
import { DeleteStudentDialog } from "./DeleteStudentDialog";

// Define types based on database models
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

// Search options for the dropdown
const SEARCH_OPTIONS = [
    { value: 'studentName', label: 'Student Name' },
    { value: 'studentSRNo', label: 'SR Number' },
    { value: 'studentPhone', label: 'Phone Number' },
    { value: 'studentEmail', label: 'Email' },
    { value: 'studentFatherName', label: 'Father\'s Name' },
    { value: 'studentCourse', label: 'Course' },
];

export function StudentTabsContent() {
    const router = useRouter();
    const { currentTheme } = useTheme();
    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState('studentName');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTab, setSelectedTab] = useState('all');
    const [totalItems, setTotalItems] = useState(0);
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
    const itemsPerPage = 8;

    // Fetch students data from API
    const fetchStudents = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/students');
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const data = await response.json();
            setStudents(data);
            setFilteredStudents(data);
            setTotalItems(data.length);
            setError(null);
        } catch (err) {
            console.error('Error fetching students:', err);
            setError('Failed to load student data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial data fetch
    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    // Filter students based on search query, field and selected tab
    useEffect(() => {
        let result = [...students];

        // Filter by tab selection
        if (selectedTab !== 'all') {
            result = result.filter(student => student.studentCourse === selectedTab);
        }

        // Apply search if query exists
        if (searchQuery) {
            result = result.filter(student => {
                const fieldValue = student[searchField as keyof Student];
                return fieldValue && fieldValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
            });
        }

        setFilteredStudents(result);
        setTotalItems(result.length);
        setCurrentPage(1); // Reset to first page on filter change
    }, [searchQuery, searchField, students, selectedTab]);

    // Get paginated students - memoized to prevent recalculation on every render
    const paginatedStudents = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredStudents.slice(startIndex, endIndex);
    }, [filteredStudents, currentPage, itemsPerPage]);

    // Get course list for tabs - memoized
    const courseList = useMemo(() =>
        [...new Set(students.map(student => student.studentCourse))],
        [students]
    );

    // Total pages calculation - memoized
    const totalPages = useMemo(() =>
        Math.ceil(totalItems / itemsPerPage),
        [totalItems, itemsPerPage]
    );

    // Generate student initials for avatar
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const handleAddStudent = () => {
        router.push('/students?step=1');
    };

    const handleEditStudent = async (studentId: string) => {
        try {
            // Fetch complete student data including fee, payment and terms
            const response = await fetch(`/api/form/${studentId}`);
            if (!response.ok) throw new Error('Failed to fetch student data');

            const formData = await response.json();

            // Store form data in localStorage before navigation
            localStorage.setItem('editFormData', JSON.stringify(formData));

            // Navigate to form page with edit parameter
            router.push(`/students?step=1&edit=${studentId}`);
        } catch (err) {
            console.error('Error fetching student data:', err);
            setError('Failed to load student data for editing');
        }
    }

    // Delete student handler
    const handleDeleteStudent = (student: Student) => {
        setStudentToDelete(student);
    };

    const confirmDeleteStudent = async (student: Student) => {
        try {
            const response = await fetch(`/api/students/${student._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: student._id }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            // Refresh student list after deletion
            fetchStudents();
            setStudentToDelete(null);
        } catch (err) {
            console.error('Error deleting student:', err);
            setError('Failed to delete student. Please try again.');
            setStudentToDelete(null);
        }
    };

    const closeDeleteDialog = () => {
        setStudentToDelete(null);
    };

    // Format date to readable format
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Calculate page numbers for pagination
    const getPageNumbers = () => {
        const maxVisiblePages = 5;
        const pages: number[] = [];

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages are less than or equal to max visible pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Complex pagination logic for many pages
            let startPage = Math.max(1, currentPage - 2);
            let endPage = startPage + maxVisiblePages - 1;

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    return (
        <div className="space-y-6">
            {/* Header and Search Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className={`text-2xl font-bold ${currentTheme.text}`}>Student Management</h2>
                    <p className="text-base opacity-80 mt-1">
                        {totalItems} student{totalItems !== 1 ? 's' : ''} found
                    </p>
                </div>

                <div className="flex gap-3 items-center">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={`Search by ${SEARCH_OPTIONS.find(opt => opt.value === searchField)?.label}`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`pl-8 w-full md:w-64 ${currentTheme.background}`}
                        />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="default"
                                className={`w-[130px] 
                                bg-gradient-to-r ${currentTheme.accent}
                              text-white font-medium
                                transition-all duration-200
                                transform
                                hover:shadow-lg`}
                            >
                                {SEARCH_OPTIONS.find(opt => opt.value === searchField)?.label}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {SEARCH_OPTIONS.map((option) => (
                                <DropdownMenuItem
                                    key={option.value}
                                    onClick={() => setSearchField(option.value)}
                                >
                                    {option.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        className={`hidden md:flex
                        rounded-lg
                        bg-gradient-to-r ${currentTheme.accent}
                      text-white font-medium
                        transition-all duration-200
                        transform
                        hover:shadow-lg
                        flex items-center gap-2`}
                        onClick={handleAddStudent}
                    >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Student
                    </Button>
                </div>
            </div>

            {/* Mobile Add Button */}
            <div className="md:hidden">
                <Button
                    className={`w-full rounded-lg
                        bg-gradient-to-r ${currentTheme.accent}
                      text-white font-medium
                        transition-all duration-200
                        transform
                        hover:shadow-lg
                        flex items-center gap-2`}
                    onClick={handleAddStudent}
                >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Student
                </Button>
            </div>

            {/* Course Tabs */}
            <Tabs
                defaultValue="all"
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="w-full"
            >
                <TabsList className={`flex flex-wrap gap-1 mb-6 ${currentTheme.card} rounded-xl shadow-md backdrop-blur-sm p-1`}>
                    <TabsTrigger value="all" className="data-[state=active]:bg-white/10 rounded-xl">
                        All Students
                    </TabsTrigger>

                    {courseList.map(course => (
                        <TabsTrigger
                            key={course}
                            value={course}
                            className="data-[state=active]:bg-white/10 rounded-xl"
                        >
                            {course}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value={selectedTab}>
                    {loading ? (
                        <StudentLoading theme={currentTheme} />
                    ) : error ? (
                        <StudentError error={error} theme={currentTheme} onRetry={fetchStudents} />
                    ) : (
                        <Card className={`${currentTheme.card} ${currentTheme.text} shadow-lg backdrop-blur-sm border border-white/10`}>
                            <CardHeader className="pb-2">
                                <CardTitle>Student List</CardTitle>
                                <CardDescription>
                                    Manage student records and information
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                {filteredStudents.length === 0 ? (
                                    <div className="text-center py-10">
                                        <p className="text-lg mb-2">No students found</p>
                                        <p className="text-sm opacity-70">Try adjusting your search criteria</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Student</TableHead>
                                                    <TableHead>SR No.</TableHead>
                                                    <TableHead>Course</TableHead>
                                                    <TableHead>Year</TableHead>
                                                    <TableHead>Contact</TableHead>
                                                    <TableHead>Registered</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {paginatedStudents.map((student) => (
                                                    <TableRow key={student._id}>
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <Avatar>
                                                                    <AvatarImage
                                                                        src={student.studentImage || ''}
                                                                        alt={student.studentName}
                                                                    />
                                                                    <AvatarFallback>
                                                                        {getInitials(student.studentName)}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <div className="font-medium">{student.studentName}</div>
                                                                    <div className="text-sm opacity-70">
                                                                        {student.studentFatherName ? `S/O ${student.studentFatherName}` : ''}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{student.studentSRNo}</TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline">
                                                                <span className={`${currentTheme.text}`}>
                                                                    {student.studentCourse}
                                                                </span>
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>{student.studentYear}</TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-col">
                                                                <div className="flex items-center text-sm">
                                                                    <Phone className="h-3 w-3 mr-1 opacity-70" />
                                                                    {student.studentPhone}
                                                                </div>
                                                                {student.studentEmail && (
                                                                    <div className="flex items-center text-sm">
                                                                        <Mail className="h-3 w-3 mr-1 opacity-70" />
                                                                        {student.studentEmail}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            {formatDate(student.createdAt)}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <Button variant="outline" size="icon" className={`h-8 w-8 
                                                                    bg-gradient-to-r ${currentTheme.accent}
                                                                  text-white font-medium
                                                                    transition-all duration-200
                                                                    transform hover:shadow-lg`}>
                                                                    <FileText className="h-4 w-4" />
                                                                </Button>
                                                                <Button variant="outline" size="icon" className={`h-8 w-8               bg-gradient-to-r ${currentTheme.accent}
                                                              text-white font-medium
                                                                transition-all duration-200
                                                                transform hover:shadow-lg`} onClick={() => handleEditStudent(student._id)}>
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-red-500"
                                                                    onClick={() => handleDeleteStudent(student)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter>
                                {totalItems > itemsPerPage && (
                                    <Pagination className="w-full flex justify-center">
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                                />
                                            </PaginationItem>

                                            {getPageNumbers().map(pageNum => (
                                                <PaginationItem key={pageNum}>
                                                    <PaginationLink
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        isActive={currentPage === pageNum}
                                                    >
                                                        {pageNum}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}

                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() => setCurrentPage(prev =>
                                                        Math.min(totalPages, prev + 1)
                                                    )}
                                                    className={
                                                        currentPage === totalPages
                                                            ? 'pointer-events-none opacity-50'
                                                            : ''
                                                    }
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                )}
                            </CardFooter>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>

            {/* Delete Confirmation Dialog */}
            <DeleteStudentDialog
                student={studentToDelete}
                onClose={closeDeleteDialog}
                onDelete={confirmDeleteStudent}
            />
        </div>
    );
}

function StudentLoading({ theme }: { theme: any }) {
    return (
        <div className="flex justify-center items-center h-64">
            <div className={`${theme.card} p-8 rounded-lg shadow-lg`}>
                <span className="text-lg">Loading student data...</span>
            </div>
        </div>
    );
}

function StudentError({ error, theme, onRetry }: { error: string; theme: any; onRetry: () => void }) {
    return (
        <Card className={`${theme.card} shadow-lg backdrop-blur-sm border border-white/10`}>
            <CardContent className="p-6">
                <div className="text-center text-red-500">
                    <p>{error}</p>
                    <Button
                        variant="outline"
                        className={`mt-4 ${theme.button}`}
                        onClick={onRetry}
                    >
                        Retry
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}