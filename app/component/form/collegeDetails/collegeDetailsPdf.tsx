/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { pdfContainers, pdfTypography, pdfUtils } from "@/lib/pdfStyles";

export const CollegeDetailsPdf: React.FC<CollegeDetails> = ({
  email,
  collegeName,
  collegeAddress,
  collegeCity,
  collegeState,
  collegeCountry,
  collegeLogo,
  collegePhone,
  collegeZip,
}) => (
  <View style={pdfContainers.CollegeDetails}>
    <View style={{ ...pdfUtils.flexColBetween, alignItems: 'flex-start' }}>
      <View style={{ ...pdfUtils.flexRowItemCenter, marginBottom: 12 }}>
        {collegeLogo && (
          <Image
            src={collegeLogo}
            style={{ height: 40, width: 40, objectFit: 'contain', marginRight: 8 }}
          />
        )}
        {collegeName && (
          <Text style={{ ...pdfTypography.text2xl, flexWrap: "wrap" }}>
            {collegeName}
          </Text>
        )}
      </View>

      <View>
        {(collegeAddress || collegeCity || collegeZip) && (
          <Text style={pdfTypography.description}>
            <Text style={{ fontWeight: 'medium' }}>Address: </Text>
            {collegeAddress}, {collegeCity} - {collegeZip}
          </Text>
        )}
        
        {(collegeState || collegeCountry) && (
          <Text style={{ ...pdfTypography.description, marginTop: 4 }}>
            {collegeState}, {collegeCountry}
          </Text>
        )}

        {email && (
          <Text style={{ ...pdfTypography.description, marginTop: 4 }}>
            <Text style={{ fontWeight: 'medium' }}>Email: </Text>
            {email}
          </Text>
        )}

        {collegePhone && (
          <Text style={{ ...pdfTypography.description, marginTop: 4 }}>
            <Text style={{ fontWeight: 'medium' }}>Contact No.: </Text>
            {collegePhone}
          </Text>
        )}
      </View>
    </View>
  </View>
);
