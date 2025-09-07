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

import { useCreateUser } from "@/hooks/useUser.js";

const formSchema = z.object({
    firstName: z.string().nonempty("First name is required").min(2, "First name must be at least 2 characters."),
    lastName: z.string().nonempty("Last name is required").min(2, "Last name must be at least 2 characters."),
    email: z.string().nonempty("Email is required").email("Please enter a valid email."),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters."),
    phone: z.string().nonempty("Phone number is required").regex(/^[0-9]{10}$/, "Phone number must be 10 digits."),
});

function RegisterForm() {
    const navigate = useNavigate();
    const { mutate: registerUser, isPending } = useCreateUser();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
        },
    });

    const onSubmit = (values) => {
        registerUser(
            { ...values, role: "USER" },
            {
                onSuccess: () => {
                    console.log("✅ User created successfully!");
                    setTimeout(() => navigate("/login"), 500);
                },
                onError: (error) => {
                    console.error("❌ Failed to create account:", error?.message || error);
                },
            }
        );
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Create Account
                </h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* First Name */}
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Name *" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Last Name */}
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last Name *" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Email *"
                                            autoComplete="username" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        {/* Phone */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="Phone (977) *" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit */}
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default RegisterForm;
