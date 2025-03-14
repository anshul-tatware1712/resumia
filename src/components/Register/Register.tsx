"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignupMutation } from "@/Api/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

interface RegisterProps {
  setActive: (active: string) => void;
}

const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted?: boolean;
}

const Register: React.FC<RegisterProps> = ({ setActive }) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const form = useForm<RegisterData>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const { mutate } = useSignupMutation();

  const onSubmit = (data: RegisterData) => {
    mutate(
      { name: data.name, email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          console.log("Signup successful:", response);
          setRegisteredUser({ name: data.name, email: data.email });
          setIsSuccessModalOpen(true);
          reset();
        },
        onError: (err) => {
          console.error("Signup failed:", err.message);
          toast.error("Registration Failed", {
            description:
              err.message ||
              "There was an error creating your account. Please try again. ",
          });
          reset();
        },
      }
    );
  };

  const handleLoginRedirect = () => {
    setIsSuccessModalOpen(false);
    setActive("login");
  };

  return (
    <>
      <form
        className="w-full px-8 h-full py-10 flex flex-col justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
              Create Account
            </h2>
            <p className="text-purple-200 text-sm mt-2">
              Join today and start building your professional resume
            </p>
          </div>

          <div className="mt-6 space-y-5">
            <div className="space-y-2 relative">
              <Label htmlFor="name" className="text-purple-200">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                className="bg-purple-900/30 border-purple-500/30 text-purple-100 placeholder:text-purple-300/40"
              />
              {errors.name && (
                <span className="text-red-500 text-sm absolute top-15">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="email" className="text-purple-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-purple-900/30 border-purple-500/30 text-purple-100 placeholder:text-purple-300/40"
              />
              {errors.email && (
                <span className="text-red-500 text-sm absolute top-15">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="password" className="text-purple-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="bg-purple-900/30 border-purple-500/30 text-purple-100"
              />
              {errors.password && (
                <span className="text-red-500 text-sm absolute top-15">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="space-y-2 relative mb-6">
              <Label htmlFor="confirmPassword" className="text-purple-200">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className="bg-purple-900/30 border-purple-500/30 text-purple-100"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm absolute top-15">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 ">
              <Checkbox
                id="termsAccepted"
                {...register("termsAccepted")}
                onClick={() =>
                  form.setValue(
                    "termsAccepted",
                    !form.getValues("termsAccepted")
                  )
                }
                className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
              />
              <label
                htmlFor="termsAccepted"
                className="text-sm font-medium leading-none text-purple-200"
              >
                I accept the{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  terms and conditions
                </a>
              </label>
            </div>
          </div>
        </div>
        <div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 cursor-pointer mt-4"
          >
            Create Account
          </Button>

          <div className="flex justify-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setActive("login")}
              className="text-sm text-purple-300 hover:text-purple-100 cursor-pointer"
            >
              Already have an account? Sign in
            </Button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-500/30"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-purple-900/30 text-purple-200">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                disabled
                className="bg-purple-900/50 hover:bg-purple-800/50 text-purple-100 border border-purple-500/30"
              >
                <IconBrandGoogle size={18} className="mr-2" />
                Google
              </Button>
              <Button
                type="button"
                disabled
                className="bg-purple-900/50 hover:bg-purple-800/50 text-purple-100 border border-purple-500/30"
              >
                <IconBrandFacebook size={18} className="mr-2" />
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </form>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="bg-purple-950 border border-purple-500/50 text-purple-100 rounded-lg shadow-xl max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-2">
              Registration Successful!
            </DialogTitle>
            <DialogDescription className="text-purple-200">
              {registeredUser && (
                <div className="space-y-3 py-2">
                  <p className="text-lg font-medium">
                    Welcome aboard,{" "}
                    <span className="text-pink-300">{registeredUser.name}</span>
                    !
                  </p>
                  <div className="bg-purple-900/40 p-3 rounded-md border border-purple-500/20 text-sm">
                    <p>Your account has been created successfully with:</p>
                    <p className="mt-2 font-mono bg-purple-900/70 p-2 rounded text-purple-100 overflow-x-auto">
                      {registeredUser.email}
                    </p>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-4"></div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-center pt-2">
            <Button
              onClick={handleLoginRedirect}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span className="mr-2">Proceed to Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
