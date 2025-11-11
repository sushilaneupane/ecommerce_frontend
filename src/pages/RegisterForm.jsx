import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser.js";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().nonempty("First name is required").min(2),
  lastName: z.string().nonempty("Last name is required").min(2),
  email: z.string().nonempty("Email is required").email("Enter a valid email"),
  password: z.string().nonempty("Password is required").min(6),
  phone: z.string().nonempty("Phone number is required").regex(/^[0-9]{10}$/, "10-digit phone required"),
});

export default function RegisterForm() {
  const navigate = useNavigate();
  const { create: createUser } = useUser();
  const { mutate: registerUser, isLoading: isPending } = createUser;

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", phone: "" },
  });

  const onSubmit = (values) => {
    registerUser({ ...values, role: "USER" }, {
      onSuccess: () => {
        toast.success("Account created successfully!");
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to create account");
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Loop through fields */}
            {["firstName", "lastName", "email", "password", "phone"].map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field}
                render={({ field: f }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-sm font-medium capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Input
                          {...f}
                          type={
                            field === "password"
                              ? (showPassword ? "text" : "password")
                              : field === "email"
                              ? "email"
                              : "text"
                          }
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1) + " *"}
                        />

                        {field === "password" && (
                          <span
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </span>
                        )}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" className="w-full py-2" disabled={isPending}>
              {isPending ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
