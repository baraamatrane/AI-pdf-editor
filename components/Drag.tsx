"use client";
import { Archive, ArchiveRestore, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";

function Drag({ user }: { user: any }) {
  const router = useRouter();
  const onDrop = (acceptedFiles: File[]) => {
    console.log("user:", user);
    if (!user) {
      router.push("/sign-up");
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 10485760,
    onDrop,
  });
  return (
    <div>
      <h2 className="mt-10 text-2xl font-semibold">
        Drag and Drop Your PDFs Here
      </h2>
      <div
        {...getRootProps()}
        className="mt-6 w-96 h-48 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-white bg-opacity-50 hover:border-blue-500 transition-colors"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          {isDragActive ? (
            <>
              <ArchiveRestore className="w-10 h-10 text-blue-500" />
              <p className="text-gray-600">Drop the files here ...</p>
            </>
          ) : (
            <>
              <Archive className="w-10 h-10 text-blue-500" />
              <p className="text-gray-600">Drag & Drop PDF file to upload</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Drag;
