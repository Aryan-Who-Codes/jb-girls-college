/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ChevronDown } from "lucide-react";

export const StudentDetailsPreview: React.FC<StudentDetails & { onClick?: (step: string) => void }> = ({
  studentEmail,
  studentName,
  studentFatherName,
  studentMotherName,
  studentSRNo,
  studentCourse,
  studentYear,
  studentAddress,
  studentCity,
  studentState,
  studentCountry,
  studentImage,
  studentPhone,
  studentZip,
  onClick,
}) => (
  <div
    className="relative px-8 py-6 group cursor-pointer"
    onClick={() => onClick && onClick("3")}
  >
    {!!onClick && (
      <>
        <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
        <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
        <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
        <ChevronDown className="animate-pulse w-5 h-5 text-indigo-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
      </>
    )}

    {/* Profile Section */}
    <div className="flex items-center gap-6 mb-8">
      {studentImage ? (
        <img
          src={studentImage}
          alt={studentName || "student Image"}
          className="h-20 w-20 rounded-md object-cover ring-4 ring-gray-50 flex-shrink-0"
        />
      ) : (
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center ring-4 ring-gray-50 flex-shrink-0">
          <span className="text-indigo-600 text-xl font-bold">
            {studentName ? studentName.charAt(0).toUpperCase() : "S"}
          </span>
        </div>
      )}

      {studentName ? (
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-xl font-bold text-gray-800">{studentName}</h2>
          <p className="text-sm text-indigo-600 font-medium">{studentCourse} • {studentYear}</p>
        </div>) : (
        <div className="rounded-md bg-neutral-100 h-12 w-5/6 animate-pulse" />
      )}

      <div className="text-right min-w-[120px]">
        <div className="text-sm font-medium text-neutral-500/90">Student ID</div>
        {studentSRNo ? (
          <div className="text-lg font-bold text-gray-800">{studentSRNo}</div>
        ) : (
          <div className="rounded-md bg-neutral-100 h-7 w-full animate-pulse" />
        )}
      </div>
    </div>

    {/* Details Section */}
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm w-full">
      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        {/* Left Side */}
        <div className="space-y-4">
          <div className="min-w-[240px]">
            <label className="text-sm font-medium text-neutral-500/90">Email Address</label>
            <div className="text-sm text-gray-800 mt-1 min-h-[20px]">{studentEmail || <div className="rounded-md bg-neutral-200 h-5 w-5/6 animate-pulse" />}</div>
          </div>
          <div className="min-w-[240px]">
            <label className="text-sm font-medium text-neutral-500/90">Father&apos;s Name</label>
            <div className="text-sm text-gray-800 mt-1 min-h-[20px]">{studentFatherName || <div className="rounded-md bg-neutral-200 h-5 w-5/6 animate-pulse" />}</div>
          </div>
          <div className="min-w-[240px]">
            <label className="text-sm font-medium text-neutral-500/90">Mother&apos;s Name</label>
            <div className="text-sm text-gray-800 mt-1 min-h-[20px]">{studentMotherName || <div className="rounded-md bg-neutral-200 h-5 w-5/6 animate-pulse" />}</div>
          </div>
        </div>

        {/* Right Side */}
        <div className="ml-4 space-y-4">
          <div className="min-w-[240px]">
            <label className="text-sm font-medium text-neutral-500/90">Contact Number</label>
            <div className="text-sm text-gray-800 mt-1 min-h-[20px]">{studentPhone || <div className="rounded-md bg-neutral-200 h-5 w-5/6 animate-pulse" />}</div>
          </div>
          <div className="min-w-[240px]">
            <label className="text-sm font-medium text-neutral-500/90">Current Address</label>
            <div className="text-sm text-gray-800 mt-1 min-h-[20px]">
              {[studentAddress, studentCity, studentState, studentZip, studentCountry].filter(Boolean).join(", ") ||
                <div className="rounded-md bg-neutral-200 h-12 w-5/6 animate-pulse" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
