"use client";
import * as z from "zod";
import FlexCenterWrapper from "@/components/FlexCenterWrapper";
import { useState, useTransition } from "react";
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
import { registerUser } from "@/server/actions/register";
import FormError from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import Link from "next/link";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof RegisterSchemas>>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchemas),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  // const { isSubmitting, isValid } = form.formState;
  const onSubmit = (values: z.infer<typeof RegisterSchemas>) => {
    const validatedFields = RegisterSchemas.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }
    startTransition(() => {
      registerUser(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
    form.reset();
  };
  return (
    <FlexCenterWrapper className="h-screen sm:-mt-24 -mt-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 sm:w-[600px]"
        >
          <FormField
            control={form.control}
            name="name"
            disabled={isPending}
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
            disabled={isPending}
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
                    disabled={isPending}
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
            size="lg"
          >
            Register
          </Button>
          <Link
            className="text-gray-600 flex items-center justify-center"
            href="/login"
          >
            <Button size='sm' variant="link">Already have an account?</Button>
          </Link>
        </form>
      </Form>
    </FlexCenterWrapper>
  );
}
