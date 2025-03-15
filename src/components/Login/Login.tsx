import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "@/Api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Spinner from "../Spinner/Spinner";
interface LoginProps {
  setActive: (active: string) => void;
}
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface LoginData {
  email: string;
  password: string;
}
const Login: React.FC<LoginProps> = ({ setActive }) => {
  const form = useForm<LoginData>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: { email: "", password: "" },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const navigate = useNavigate();
  const { mutate, isPending } = useLoginMutation();
  const onSubmit = (data: LoginData) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          console.log("Login successful:", response);
          toast.success("Login Successful", {
            description: "Welcome back!",
          });

          navigate("/form");
        },
        onError: (err) => {
          console.error("Login failed:", err.message);
          toast.error("Login Failed", {
            description: err.message || "Please try again. ",
          });
        },
      }
    );
  };
  return (
    <form
      className="w-full px-8 h-full py-10 flex flex-col justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isPending && <Spinner />}

      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
            Welcome Back
          </h2>

          <p className="text-purple-200 text-sm mt-2">
            Sign in to continue building your perfect resume
          </p>
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="email" className="text-purple-200">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: true })}
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
            {...register("password", { required: true })}
            className="bg-purple-900/30 border-purple-500/30 text-purple-100"
          />
          {errors.password && (
            <span className="text-red-500 text-sm absolute top-15">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>
      <div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 cursor-pointer "
        >
          Sign In
        </Button>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            disabled
            variant="link"
            className="text-sm text-purple-300 hover:text-purple-100 cursor-pointer"
          >
            Forgot Password?
          </Button>
          <Button
            type="button"
            variant="link"
            onClick={() => setActive("register")}
            className="text-sm text-purple-300 hover:text-purple-100 cursor-pointer"
          >
            Create Account
          </Button>
        </div>

        <div className="mt-8">
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

export default Login;
