import { useForm, FormProvider } from "react-hook-form";

import { motion } from "framer-motion";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import { useState } from "react";
import EducationDetails from "./EducationDetails/EducationDetails";
import { Course } from "./EducationDetails/ExtraModal/ExtraModal";

export interface FormInputs {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  phoneCode?: string;
  state?: string;
  city?: string;
  pinCode?: string;
  tenthEducation?: {
    added: boolean;
    board: string;
    schoolName: string;
    yearOfPassing: string;
    percentage: string;
    markingSystem: "Percentage" | "CGPA";
  };
  twelfthEducation?: {
    added: boolean;
    board: string;
    schoolName: string;
    yearOfPassing: string;
    percentage: string;
    markingSystem: "Percentage" | "CGPA";
  };
  graduationEducation?: {
    added: boolean;
    collegeName: string;
    universityName: string;
    course: string;
    specialization: string;
    marks: string;
    markSystem: "CGPA" | "Percentage";
    startYear: string;
    endYear: string;
    isCurrentlyStudying: boolean;
  };
  extraCourses?: Course[];
}

const Resumeia = () => {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      phoneCode: "",
      state: "",
      city: "",
      pinCode: "",
      tenthEducation: {
        added: false,
        board: "",
        schoolName: "",
        yearOfPassing: "",
        percentage: "",
        markingSystem: "Percentage",
      },
      twelfthEducation: {
        added: false,
        board: "",
        schoolName: "",
        yearOfPassing: "",
        percentage: "",
        markingSystem: "Percentage",
      },
      graduationEducation: {
        added: false,
        collegeName: "",
        universityName: "",
        course: "",
        specialization: "",
        cgpa: "",
        markSystem: "CGPA",
        startYear: "",
        endYear: "",
        isCurrentlyStudying: false,
      },
      extraCourses: [],
    },
  });
  console.log(methods.watch());

  const [step, setStep] = useState(1);

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent"
            >
              Resumeia
            </motion.h1>
            <p className="mt-3 text-md text-gray-400">
              Create an ATS-friendly resume in minutes! AI tailors it for any
              job—just fill in your details once!
            </p>

            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-md">
                <div className="relative">
                  <div className="overflow-hidden h-2 flex rounded bg-gray-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${step * 25}%` }}
                      transition={{ duration: 0.8 }}
                      className="bg-gradient-to-r from-purple-500 to-blue-500"
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Step {step} of 4:{" "}
                    {step === 1
                      ? "Personal Information"
                      : step === 2
                      ? "Education Details"
                      : step === 3
                      ? "Experience"
                      : "Skills"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              {step === 1 && <PersonalDetails setStep={setStep} step={step} />}
              {step === 2 && <EducationDetails setStep={setStep} step={step} />}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </FormProvider>
  );
};

export default Resumeia;
