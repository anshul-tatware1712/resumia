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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { boards } from "../Education.config";
import { toast } from "sonner";

interface TenthGradeModalProps {
  setIs10ModalOpen: (value: boolean) => void;
}

const TenthGradeModal = ({ setIs10ModalOpen }: TenthGradeModalProps) => {
  const { setValue, getValues } = useFormContext();

  const tenthEducation = getValues("tenthEducation") || {};

  const localForm = useForm({
    defaultValues: {
      board: tenthEducation.board,
      schoolName: tenthEducation.schoolName,
      passingYear: tenthEducation.passingYear || new Date().getFullYear(),
      percentage: tenthEducation.percentage,
      markSystem: tenthEducation.markSystem || "percentage",
    },
  });
  const {
    handleSubmit: handleSubmitLocal,
    setValue: setLocalValue,
    register: localRegister,
  } = localForm;

  const isOpen = true;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitLocal((formData) => {
      setValue("tenthEducation", {
        added: true,
        ...formData,
      });
      setIs10ModalOpen(false);
      toast("10th grade details saved successfully");
    })();
  };

  const handleClose = () => {
    setIs10ModalOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-800 text-gray-100 rounded-lg shadow-lg border border-gray-700/30 p-6 max-w-2xl mx-auto">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-100">
            10<sup>th</sup> Grade Education Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="py-4 space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-200 border-b border-gray-700 pb-2">
                School Information
              </h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="schoolName" className="text-gray-300">
                    School Name
                  </Label>
                  <Input
                    id="schoolName"
                    className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                    placeholder="Enter school name"
                    {...localRegister("schoolName")}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="board" className="text-gray-300">
                    Board
                  </Label>
                  <Select
                    defaultValue={tenthEducation.board || ""}
                    onValueChange={(value) => setLocalValue("board", value)}
                  >
                    <SelectTrigger
                      id="board"
                      className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500 mt-1"
                    >
                      <div className="flex items-center">
                        <SelectValue placeholder="Select Board" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-100 max-h-60 overflow-y-auto">
                      <SelectGroup>
                        <SelectLabel className="text-gray-400">
                          Select Board
                        </SelectLabel>
                        {boards.map((board) => (
                          <SelectItem
                            key={board.id}
                            value={board.name}
                            className="focus:bg-gray-700"
                          >
                            {board.code}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="passingYear" className="text-gray-300">
                    Year of Passing
                  </Label>
                  <Input
                    id="passingYear"
                    type="number"
                    min="1900"
                    max="2099"
                    className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                    placeholder="e.g., 2020"
                    {...localRegister("passingYear")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="percentage" className="text-gray-300">
                    Percentage/CGPA
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="percentage"
                      type="number"
                      className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      placeholder="e.g., 85.5 or 9.2"
                      {...localRegister("percentage")}
                      required
                    />
                    <Select
                      defaultValue={tenthEducation.markSystem || "percentage"}
                      onValueChange={(value) =>
                        setLocalValue("markSystem", value)
                      }
                    >
                      <SelectTrigger
                        id="markSystem"
                        className="w-24 bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                        <SelectItem value="percentage">%</SelectItem>
                        <SelectItem value="cgpa">CGPA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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

export default TenthGradeModal;
