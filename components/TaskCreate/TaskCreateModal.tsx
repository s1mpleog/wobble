"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { taskCreateSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, PlusIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileUpload } from "../FileUpload";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Image from "next/image";
import { createTask } from "@/server/actions/task-create";
import FormError from "../FormError";
import { useRouter } from "next/navigation";

export default function TaskCreateModal() {
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [uploadImage, setUploadImage] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const onOpen = () => {
    setImagePreview("");
    setUploadImage(!uploadImage);
  };
  const form = useForm<z.infer<typeof taskCreateSchema>>({
    resolver: zodResolver(taskCreateSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      description: "",
      category: "",
    },
  });
  const handleImageUpload = (url: string) => {
    setImagePreview(url);
    form.setValue("imageUrl", url);
    setUploadImage(!uploadImage);
  };
  const handleSubmit = (values: z.infer<typeof taskCreateSchema>) => {
    const validateFields = taskCreateSchema.safeParse(values);
    if (!validateFields.success) return { error: "Invalid Fields" };
    setError("");
    startTransition(() => {
      createTask(values).then((data) => {
        form.reset();
        router.refresh();
        setModalOpen(false);
        setError(data?.error);
      });
    });
    const modalOpen = () => {
      setModalOpen(!modalOpen);
    };
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        <Plus className="w-5 h-5 mr-5" />
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create Your Note</DialogTitle>
          <DialogDescription>Your can change this later.</DialogDescription>
          <div className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <div
                  onClick={onOpen}
                  className="ml-auto cursor-pointer gap-1 flex items-end justify-end"
                >
                  <PlusIcon className="w-4 h-4" />
                  <p className="text-xs font-medium text-gray-700">image</p>
                </div>
                {imagePreview && (
                  <div className="flex items-center justify-center">
                    <Image
                      className="object-cover rounded-md"
                      src={imagePreview}
                      width={400}
                      height={100}
                      alt="preview"
                    />
                  </div>
                )}
                {uploadImage && (
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FileUpload
                            endPoint="taskImage"
                            onChange={(url) => {
                              handleImageUpload(url as string);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="e.g.coding on sunday"
                        />
                      </FormControl>
                      <FormDescription>
                        This is your note title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="e.g.about coding"
                        />
                      </FormControl>
                      <FormDescription>
                        Choose the category that best describes your task (e.g.,
                        Work, Personal, Study).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-28"
                          disabled={isPending}
                          {...field}
                          placeholder="e.g.about coding"
                        />
                      </FormControl>
                      <FormDescription>
                        This is your note description.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormError message={error} />
                <Button
                  disabled={isPending}
                  className="w-full"
                  size="lg"
                  type="submit"
                >
                  Create
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
