import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const signupRequest = async (data: RegisterData) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || "Signup failed");
  }
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signupRequest,
  });
};

interface LoginData {
  email: string;
  password: string;
}
const loginRequest = async (data: LoginData) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginRequest,
  });
};
