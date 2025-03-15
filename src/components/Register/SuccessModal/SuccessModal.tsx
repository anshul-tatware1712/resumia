import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SuccessModalProps {
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (value: boolean) => void;
  setActive: (active: string) => void;
  registeredUser: { name: string; email: string } | null;
}

const SuccessModal = ({
  isSuccessModalOpen,
  setIsSuccessModalOpen,
  registeredUser,
  setActive,
}: SuccessModalProps) => {
  const handleLoginRedirect = () => {
    console.log("Redirecting to login...");
    setActive("login");
    setIsSuccessModalOpen(false);
  };

  return (
    <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
      <DialogContent className="bg-purple-900/95 text-purple-100 rounded-lg shadow-lg border border-purple-500/30 p-6 max-w-md mx-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
            Registration Successful
          </DialogTitle>
        </DialogHeader>

        {registeredUser && (
          <div className="text-center space-y-3">
            <p className="text-purple-200">
              Welcome,{" "}
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                {registeredUser.name}
              </span>
              !
            </p>
            <div className="bg-purple-900/30 border border-purple-500/30 p-3 rounded-md text-sm">
              <p className="text-purple-200">
                Your account has been created with:
              </p>
              <p className="mt-1 font-mono text-purple-100">
                {registeredUser.email}
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-center mt-4">
          <Button
            onClick={handleLoginRedirect}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-md"
          >
            Proceed to Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
