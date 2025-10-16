import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser.js";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email."),
  password: z
    .string()
    .nonempty("Password is required")
    .min(3, "Password must be at least 3 characters"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth(); // auth context
  const { login } = useUser(); // useUser hook
  const { mutate:   , isLoading: isPending } = login; // destructure mutation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    loginUser(data, {
      onSuccess: (response) => {
        const token = response?.data?.token;
        const user = response?.data?.user;

        if (token && user) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("user", JSON.stringify(user));
          loginContext(token); // update auth context
          toast.success("Logged in successfully!");
          navigate("/");
        }
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.error ||
            "Invalid email or password. Please try again."
        );
      },
    });
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-2xl bg-gray-100">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold mt-5">
            Login
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-base">
            Enter your credentials to sign in
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-sm text-center text-gray-600 mb-5">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline ml-1">
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
