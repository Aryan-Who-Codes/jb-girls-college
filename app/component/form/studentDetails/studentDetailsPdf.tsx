/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
import { Image, Text, View } from "@react-pdf/renderer";
import { pdfContainers, pdfTypography, pdfUtils } from "@/lib/pdfStyles";

export const StudentDetailsPDF: React.FC<StudentDetails> = ({
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
}) => (
  <View style={{ ...pdfContainers.StudentDetails, flexDirection: 'column' }}>
    {/* Profile Section - Reduced vertical spacing */}
    <View style={{ ...pdfUtils.flexRowBetween, marginBottom: 16, width: '100%' }}>
      <View style={{ ...pdfUtils.flexRowItemCenter, gap: 12 }}>
        {studentImage ? (
          <Image
            src={studentImage}
            style={{
              width: 50,
              height: 50,
              borderRadius: 4,
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        ) : (
          <View style={{ width: 50, height: 50, borderRadius: 4, backgroundColor: '#F3F4F6' }}>
            <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 12 }}>
              {studentName?.charAt(0).toUpperCase() || 'S'}
            </Text>
          </View>
        )}

        <View>
          <Text style={{ ...pdfTypography.text2xl, fontSize: 20 }}>{studentName}</Text>
          <Text style={{ ...pdfTypography.description, color: '#4F46E5' }}>
            {studentCourse} • {studentYear}
          </Text>
        </View>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ ...pdfTypography.description }}>Student ID</Text>
        <Text style={{ ...pdfTypography.text2xl, fontSize: 16 }}>{studentSRNo}</Text>
      </View>
    </View>

    {/* Details Grid - Reduced padding and gap */}
    <View style={{
      backgroundColor: '#F9FAFB',
      padding: 16,
      borderRadius: 8,
      width: '100%'
    }}>
      <View style={{ ...pdfUtils.flexRowBetween, gap: 32 }}>
        <View style={{ flex: 1, gap: 12 }}>
          <DetailItem label="Email Address" value={studentEmail} />
          <DetailItem label="Father's Name" value={studentFatherName} />
          <DetailItem label="Mother's Name" value={studentMotherName} />
        </View>

        <View style={{ flex: 1, gap: 12 }}>
          <DetailItem label="Contact Number" value={studentPhone} />
          <DetailItem
            label="Current Address"
            value={[studentAddress, studentCity, studentState, studentZip, studentCountry]
              .filter(Boolean)
              .join(", ")}
          />
        </View>
      </View>
    </View>
  </View>
);

const DetailItem = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <View>
    <Text style={{ ...pdfTypography.description, fontWeight: 'medium', marginBottom: 2 }}>
      {label}
    </Text>
    <Text style={pdfTypography.description}>{value || ''}</Text>
  </View>
);
