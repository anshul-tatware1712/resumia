import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, useFormContext } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { useState, useEffect } from "react";
import { getSpecializations, majorCourses } from "../Education.config";

interface GraduationModalProps {
  setIsGradModalOpen: (value: boolean) => void;
}

const GraduationModal = ({ setIsGradModalOpen }: GraduationModalProps) => {
  const { setValue, getValues } = useFormContext();
  const graduationEducation = getValues("graduationEducation") || {};

  const [selectedCourse, setSelectedCourse] = useState<string>(
    graduationEducation.course || ""
  );
  const [isCurrentlyStudying, setIsCurrentlyStudying] = useState<boolean>(
    graduationEducation.isCurrentlyStudying || false
  );

  const localForm = useForm({
    defaultValues: {
      collegeName: graduationEducation.collegeName || "",
      universityName: graduationEducation.universityName || "",
      course: graduationEducation.course || "",
      specialization: graduationEducation.specialization || "",
      marks: graduationEducation.marks || "",
      markSystem: graduationEducation.markSystem || "CGPA",
      startYear: graduationEducation.startYear || new Date().getFullYear() - 4,
      endYear: graduationEducation.endYear || new Date().getFullYear(),
      isCurrentlyStudying: graduationEducation.isCurrentlyStudying || false,
    },
  });

  const {
    handleSubmit: handleSubmitLocal,
    setValue: setLocalValue,
    register: localRegister,
    watch,
  } = localForm;

  const isOpen = true;
  const watchCourse = watch("course");
  const watchIsCurrentlyStudying = watch("isCurrentlyStudying");

  useEffect(() => {
    if (watchCourse && watchCourse !== selectedCourse) {
      setSelectedCourse(watchCourse);
      setLocalValue("specialization", "");
    }
  }, [watchCourse, selectedCourse, setLocalValue]);

  useEffect(() => {
    setIsCurrentlyStudying(watchIsCurrentlyStudying);
  }, [watchIsCurrentlyStudying]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmitLocal((formData) => {
      setValue("graduationEducation", {
        added: true,
        ...formData,
      });
      setIsGradModalOpen(false);
      toast("Graduation details saved successfully");
    })();
  };

  const handleClose = () => {
    setIsGradModalOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-800 text-gray-100 rounded-lg shadow-lg border border-gray-700/30 p-6 max-w-2xl mx-auto">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-100">
            Graduation Education Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="py-4 space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-200 border-b border-gray-700 pb-2">
                College/University Information
              </h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="collegeName" className="text-gray-300">
                    College Name
                  </Label>
                  <Input
                    id="collegeName"
                    className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                    placeholder="Enter college name"
                    {...localRegister("collegeName")}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="universityName" className="text-gray-300">
                    University Name
                  </Label>
                  <Input
                    id="universityName"
                    className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                    placeholder="Enter university name"
                    {...localRegister("universityName")}
                    required
                  />
                </div>
              </div>

              <h4 className="text-lg font-medium text-gray-200 border-b border-gray-700 pb-2 mt-6">
                Course Information
              </h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="course" className="text-gray-300">
                    Course
                  </Label>
                  <Select
                    defaultValue={graduationEducation.course || ""}
                    onValueChange={(value) => setLocalValue("course", value)}
                  >
                    <SelectTrigger
                      id="course"
                      className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500 mt-1"
                    >
                      <div className="flex items-center">
                        <SelectValue placeholder="Select Course" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-100 max-h-60 overflow-y-auto">
                      <SelectGroup>
                        <SelectLabel className="text-gray-400">
                          Select Course
                        </SelectLabel>
                        {majorCourses.map((course) => (
                          <SelectItem
                            key={course.id}
                            value={course.name}
                            className="focus:bg-gray-700"
                          >
                            {course.fullName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="specialization" className="text-gray-300">
                    Specialization
                  </Label>
                  <Select
                    defaultValue={graduationEducation.specialization || ""}
                    onValueChange={(value) =>
                      setLocalValue("specialization", value)
                    }
                    disabled={!selectedCourse}
                  >
                    <SelectTrigger
                      id="specialization"
                      className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500 mt-1"
                    >
                      <div className="flex items-center">
                        <SelectValue placeholder="Select Specialization" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-100 max-h-60 overflow-y-auto">
                      <SelectGroup>
                        <SelectLabel className="text-gray-400">
                          Select Specialization
                        </SelectLabel>
                        {getSpecializations(selectedCourse).map((spec) => (
                          <SelectItem
                            key={spec.id}
                            value={spec.name}
                            className="focus:bg-gray-700"
                          >
                            {spec.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cgpa" className="text-gray-300">
                    CGPA/Percentage
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="cgpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max={
                        localForm.getValues("markSystem") === "CGPA"
                          ? "10"
                          : "100"
                      }
                      className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      placeholder={
                        localForm.getValues("markSystem") === "CGPA"
                          ? "e.g.. 8.5"
                          : "e.g.. 85.5"
                      }
                      {...localRegister("marks")}
                      required
                    />
                    <Select
                      defaultValue={graduationEducation.markSystem || "CGPA"}
                      onValueChange={(value) =>
                        setLocalValue("markSystem", value)
                      }
                    >
                      <SelectTrigger
                        id="markSystem"
                        className="w-24 bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      >
                        <SelectValue></SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                        <SelectItem value="CGPA">CGPA</SelectItem>
                        <SelectItem value="Percentage">%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-medium text-gray-200 border-b border-gray-700 pb-2 mt-6">
                Duration
              </h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="startYear" className="text-gray-300">
                    Start Year
                  </Label>
                  <Input
                    id="startYear"
                    type="number"
                    min="1900"
                    max="2099"
                    className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                    placeholder="e.g., 2018"
                    {...localRegister("startYear")}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="endYear" className="text-gray-300">
                    End Year
                  </Label>
                  <Input
                    id="endYear"
                    type="number"
                    min="1900"
                    max="2099"
                    className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                    placeholder="e.g., 2022"
                    {...localRegister("endYear")}
                    disabled={isCurrentlyStudying}
                    required={!isCurrentlyStudying}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="isCurrentlyStudying"
                  checked={isCurrentlyStudying}
                  onCheckedChange={(checked) => {
                    setLocalValue("isCurrentlyStudying", checked === true);
                  }}
                />
                <Label
                  htmlFor="isCurrentlyStudying"
                  className="text-gray-300 cursor-pointer"
                >
                  I am currently studying
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-gray-700 pt-4 flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-gray-600 text-gray-300 hover:text-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Save Details
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GraduationModal;
