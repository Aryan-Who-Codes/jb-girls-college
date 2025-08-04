import CustomTextInput from "@/app/component/ui/customTextInput";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import ImageInput from "@/app/component/ui/imageInput";

export const StudentDetailsForm = () => (
  <div className="pt-24">
    <p className="text-2xl font-semibold pb-3">Student Details</p>
    <p className="pb-2 text-sm font-medium text-neutral-500">Personal details</p>
    <CustomTextInput
      label="Student Name"
      placeholder="Aakash Sharma"
      variableName="studentName"
    />
    <CustomTextInput
      label="Father's Name"
      placeholder="Bharat Sharma"
      variableName="studentFatherName"
    />
    <CustomTextInput
      label="Mother's Name"
      placeholder="Rekha Sharma"
      variableName="studentMotherName"
    />
    <CustomTextInput
      label="Address"
      placeholder="Dev Gav Road, Toonga"
      variableName="studentAddress"
    />
    <CustomTextInput
      label="City"
      placeholder="Jaipur"
      variableName="studentCity"
    />
    <CustomTextInput
      label="State"
      placeholder="Rajasthan"
      variableName="studentState"
    />
    <CustomNumberInput
      label="Zip"
      placeholder="303302"
      variableName="studentZip"
    />
    <CustomTextInput
      label="Country"
      placeholder="India"
      variableName="studentCountry"
    />
    <CustomTextInput
      label="Contact No."
      placeholder="+91 9876543210"
      variableName="studentPhone"
    />
    <p className="pb-2 pt-5 text-sm font-medium text-neutral-500">Academic details</p>
    <ImageInput label="Student Image" variableName="studentImage" />
    <CustomTextInput
      label="SR No."
      placeholder="SR123456"
      variableName="studentSRNo"
    />
    <CustomTextInput
      label="Course"
      placeholder="B.Tech Computer Science"
      variableName="studentCourse"
    />
    <CustomTextInput
      label="Year"
      placeholder="2nd Year"
      variableName="studentYear"
    />
    <CustomTextInput
      label="Email"
      placeholder="e.g. Aakash03@gmail.com"
      variableName="studentEmail"
    />
    <p className="pb-10 pt-3 text-xs font-medium text-neutral-500">
      Please provide a valid email address for official communication and updates.
    </p>
  </div>
);
