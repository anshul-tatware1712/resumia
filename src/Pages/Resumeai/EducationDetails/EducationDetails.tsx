import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import TenthGradeModal from "./TenthGradeModal/TenthGradeModal";
import TwelfthGradeModal from "./TwelfthGradeModal/TwelfthGradeModal";
import GraduationModal from "./GraduationModal/GraduationModal";
import ExtraModal from "./ExtraModal/ExtraModal";
import {
  GraduationCap,
  ChevronRight,
  BookOpen,
  Award,
  FileCheck,
  Plus,
} from "lucide-react";

interface EducationDetailsProps {
  setStep: (step: number) => void;
  step: number;
}

const EducationDetails = ({ setStep, step }: EducationDetailsProps) => {
  const [is10ModalOpen, setIs10ModalOpen] = useState(false);
  const [is12ModalOpen, setIs12ModalOpen] = useState(false);
  const [isGraduationModalOpen, setIsGraduationModalOpen] = useState(false);
  const [isExtraModalOpen, setIsExtraModalOpen] = useState(false);
  const { handleSubmit } = useFormContext();

  const onsubmit = () => {
    console.log("submit");
    setStep(step + 1);
    console.log("after submission", step);
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
        <div className="space-y-4">
          <div className="border-b border-gray-700 pb-4">
            <h2 className="text-2xl font-semibold text-gray-200 flex items-center">
              <GraduationCap className="mr-2 h-6 w-6 text-blue-400" />
              Education Details
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-y-4">
            <div className="bg-gray-700 rounded-md shadow-sm p-4 border border-gray-600">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-400 mr-3" />
                  <span className="text-gray-200 font-medium">
                    Secondary Education (10th Grade)
                  </span>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    onClick={() => setIs10ModalOpen(true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Details
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-md shadow-sm p-4 border border-gray-600">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-blue-400 mr-3" />
                  <span className="text-gray-200 font-medium">
                    Higher Secondary Education (12th Grade)
                  </span>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    onClick={() => setIs12ModalOpen(true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Details
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-md shadow-sm p-4 border border-gray-600">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 text-blue-400 mr-3" />
                  <span className="text-gray-200 font-medium">
                    Undergraduate/Graduate Degree
                  </span>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    onClick={() => setIsGraduationModalOpen(true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Details
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-md shadow-sm p-4 border border-gray-600">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileCheck className="h-5 w-5 text-blue-400 mr-3" />
                  <span className="text-gray-200 font-medium">
                    Additional Certifications & Courses
                  </span>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="button"
                    onClick={() => setIsExtraModalOpen(true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Details
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
              >
                Next Step
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </form>

      {is10ModalOpen && <TenthGradeModal setIs10ModalOpen={setIs10ModalOpen} />}
      {is12ModalOpen && (
        <TwelfthGradeModal setIs12ModalOpen={setIs12ModalOpen} />
      )}
      {isGraduationModalOpen && (
        <GraduationModal setIsGradModalOpen={setIsGraduationModalOpen} />
      )}
      {isExtraModalOpen && (
        <ExtraModal setIsExtraModalOpen={setIsExtraModalOpen} />
      )}
    </>
  );
};

export default EducationDetails;
