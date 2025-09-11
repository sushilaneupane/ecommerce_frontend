import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import homeImage4 from "@/assets/homeImage4.jpg";
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

import { useLoginUser } from "@/hooks/useUser.js"; 


const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Please enter a valid email."),
  password: z.string().nonempty("Password is required").min(3, "Password must be at least 3 characters"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const { mutate: loginUser, isPending } = useLoginUser();
   const { login } = useAuth(); 

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
     
        if (response?.data?.token) {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
       
        navigate("/");
      },
      onError: (error) => {
        console.error("Login failed:", error?.message || error);
      },
    });
  };

  return (
    <section className="relative h-screen w-full">
     
      <img
        src={homeImage4}
        alt="Hero Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

     
      <div className="relative z-10 flex items-center justify-start h-full px-4 sm:px-10 md:px-20 lg:px-40">
        <Card className="w-full max-w-md bg-white/90 shadow-xl rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
              Login
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-base">
              Enter your credentials to sign in
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            
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

             
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
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

              
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline ml-1">
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
