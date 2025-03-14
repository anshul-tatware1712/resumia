import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignupMutation } from "@/Api/api";
import { useNavigate } from "react-router-dom";

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
  } = form;
  const navigate = useNavigate();

  const { mutate } = useSignupMutation();

  const onSubmit = (data: RegisterData) => {
    mutate(
      { name: data.name, email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          console.log("Signup successful:", response);
          navigate("/register");
        },
        onError: (err) => {
          console.error("Signup failed:", err.message);
        },
      }
    );
  };

  return (
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
                form.setValue("termsAccepted", !form.getValues("termsAccepted"))
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
  );
};

export default Register;
