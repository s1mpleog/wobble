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
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import FormError from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";
import { LoginUser } from "@/server/actions/login";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // const { isSubmitting, isValid } = form.formState;
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }
    startTransition(() => {
      LoginUser(values).then((data) => {
        form.reset();
        setError(data?.error);
        // setSuccess(data?.success);
      });
    });
  };
  return (
    <FlexCenterWrapper className="h-screen sm:-mt-24 -mt-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 sm:w-[600px]"
        >
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
                <FormDescription>Use at least 6 characters.</FormDescription>
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
            Login
          </Button>
        </form>
      </Form>
    </FlexCenterWrapper>
  );
}
