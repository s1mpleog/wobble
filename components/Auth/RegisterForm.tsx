"use client";
import * as z from "zod";
import FlexCenterWrapper from "@/components/FlexCenterWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RegisterSchemas } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useTransition } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchemas>>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchemas),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = (values: z.infer<typeof RegisterSchemas>) => {
    const validatedFields = RegisterSchemas.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }
    axios.post("/api/register", values);
    form.reset();
  };
  return (
    <FlexCenterWrapper className="h-screen -mt-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-[600px]"
        >
          <FormField
            control={form.control}
            name="name"
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    type="text"
                    placeholder="your name"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isSubmitting}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    type="email"
                    placeholder="email"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    {...field}
                    type="password"
                    placeholder="your password"
                  />
                </FormControl>
                <FormDescription>
                  Use letters and numbers and symbols and at least 6 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full"
            size="lg"
          >
            Register
          </Button>
        </form>
      </Form>
    </FlexCenterWrapper>
  );
}
