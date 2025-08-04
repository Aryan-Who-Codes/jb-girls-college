import { Suspense } from "react";
import { NewStudentForm } from "./component/NewStudentForm";

const Page = () => (
  <div className="min-h-screen overflow-y-auto h-full flex items-center md:flex-row flex-col-reverse">
    <Suspense>
      <NewStudentForm />
    </Suspense>
  </div>
);

export default Page;
