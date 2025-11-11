import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import contactus from "@/assets/contactus.jpg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(5, "Name must be at least 5 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  message: z
    .string()
    .nonempty("Message is required")
    .min(10, "Message must be at least 10 characters"),
});

function Contact() {
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values) {
    console.log("Contact form submitted:", values);
    alert("Your message has been sent!");
    form.reset();
  }

  return (
    <section className="container mx-auto px-4 py-10 mt-10">
      <h2 className="text-3xl font-bold mb-10 text-center">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div className="w-full h-full">
          <img
            src={contactus}
            alt="Contact"
            className="rounded-xl shadow-lg w-full h-full object-cover"
          />
        </div>

   
        <div className="bg-white shadow-md rounded-xl p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

           
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea rows="4" placeholder="Write your message..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
