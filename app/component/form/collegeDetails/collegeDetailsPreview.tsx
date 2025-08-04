/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

export const CollegeDetailsPreview: React.FC<CollegeDetails> = ({
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
  <div>
    <div className="flex items-center gap-2 mb-3">
      {collegeLogo ? (
        <img
          src={collegeLogo}
          alt="College Logo"
          className="h-10 w-10 object-contain flex-shrink-0"
        />
      ) : (
        <div className="rounded-full bg-neutral-100 h-10 w-10 animate-pulse" />
      )}

      {collegeName ? (
        <p className="text-xl font-bold text-gray-800">{collegeName}</p>
      ) : (
        <div className="rounded-md bg-neutral-100 h-5 w-5/6 animate-pulse" />
      )}
    </div>

    <div className="text-xs text-neutral-500/80">
      {collegeAddress || collegeCity || collegeZip ? (
        <p><strong>Address:</strong> {collegeAddress}, {collegeCity} - {collegeZip}</p>
      ) : (
        <div className="rounded-md bg-neutral-100 h-4 w-3/6 animate-pulse my-2" />
      )}
      {collegeState || collegeCountry ? (
        <p className="mb-1">
          {collegeState}, {collegeCountry}
        </p>
      ) : (
        <div className="rounded-md bg-neutral-100 h-4 w-4/6 animate-pulse my-3" />
      )}

      {email ? (
        <p className="text-neutral-500/90 text-xs mb-1"><strong>Email:</strong> {email}</p>
      ) : (
        <div className="rounded-md bg-neutral-100 h-4 w-4/6 animate-pulse my-2" />
      )}

      {collegePhone ? (
        <p className="text-neutral-500/90 text-xs mb-1"><strong>Contact No. :</strong> {collegePhone}</p>
      ) : (
        <div className="rounded-md bg-neutral-100 h-4 w-4/6 animate-pulse my-2" />
      )}
    </div>
  </div>
);