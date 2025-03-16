import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, useFormContext } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";

export interface Course {
  id: string;
  name: string;
  durationMonths: string;
}

interface ExtraModalProps {
  setIsExtraModalOpen: (value: boolean) => void;
}

const ExtraModal = ({ setIsExtraModalOpen }: ExtraModalProps) => {
  const { setValue, getValues } = useFormContext();
  const extraCourses = getValues("extraCourses") || [];

  const [courses, setCourses] = useState<Course[]>(
    extraCourses.length > 0 ? extraCourses : []
  );

  const [currentCourse, setCurrentCourse] = useState<{
    name: string;
    durationMonths: string;
  }>({
    name: "",
    durationMonths: "",
  });

  const localForm = useForm({
    defaultValues: {
      courses: courses,
    },
  });

  const { handleSubmit: handleSubmitLocal } = localForm;
  const isOpen = true;

  const generateId = () => {
    return `course_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  };

  const addCourse = () => {
    if (!currentCourse.name.trim()) {
      toast("Please enter a course name", {
        description: "Course name cannot be empty",
      });
      return;
    }

    const newCourse: Course = {
      id: generateId(),
      name: currentCourse.name,
      durationMonths: currentCourse.durationMonths,
    };

    setCourses((prevCourses) => [...prevCourses, newCourse]);

    setCurrentCourse({
      name: "",
      durationMonths: "",
    });
  };

  const deleteCourse = (id: string) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== id)
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmitLocal(() => {
      setValue("extraCourses", courses);
      setIsExtraModalOpen(false);

      const message =
        courses.length > 0
          ? "Extra courses saved successfully"
          : "No extra courses added";

      toast(message);
    })();
  };

  const handleClose = () => {
    setIsExtraModalOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-800 text-gray-100 rounded-lg shadow-lg border border-gray-700/30 p-6 max-w-2xl mx-auto">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-100">
            Additional Courses
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="py-4 space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-200 border-b border-gray-700 pb-2">
                Add Courses
              </h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                <div className="sm:col-span-7">
                  <Label htmlFor="courseName" className="text-gray-300">
                    Course Name
                  </Label>
                  <Input
                    id="courseName"
                    className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                    placeholder="Enter course name"
                    value={currentCourse.name}
                    onChange={(e) =>
                      setCurrentCourse((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="sm:col-span-3">
                  <Label htmlFor="duration" className="text-gray-300">
                    Duration (Months)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="120"
                    className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                    placeholder="e.g., 6"
                    value={currentCourse.durationMonths}
                    onChange={(e) =>
                      setCurrentCourse((prev) => ({
                        ...prev,
                        durationMonths: e.target.value || "",
                      }))
                    }
                  />
                </div>

                <div className="sm:col-span-2 flex items-end">
                  <Button
                    type="button"
                    onClick={addCourse}
                    className="bg-blue-600 hover:bg-blue-700 mt-1 w-full"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
              </div>

              {courses.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-200 border-b border-gray-700 pb-2">
                    Added Courses
                  </h4>
                  <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between bg-gray-700/50 p-3 rounded-md border border-gray-600/50"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-200">
                            {course.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            Duration: {course.durationMonths} month
                            {course.durationMonths !== "1" ? "s" : ""}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => deleteCourse(course.id)}
                          className="text-gray-400 hover:text-red-400 hover:bg-gray-700/70"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              Save Courses
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExtraModal;
