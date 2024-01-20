"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
// import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endPoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endPoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      appearance={{
        button: {
          background: "#000",
          color: "#fff"
        },
        label: {
          color: "#000"
        },
        
      }}
      onUploadError={(error: Error) => {
        // toast.error(`${error?.message}`);
      }}
    />
  );
};
