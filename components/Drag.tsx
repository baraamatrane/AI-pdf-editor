"use client";
import { useDropzone } from "react-dropzone";

function Drag() {
  const onDrop = (acceptedFiles: File[]) => {
    // Handle the dropped files here
    console.log(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  console.log(getRootProps, getInputProps, isDragActive);
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
        <p className="text-gray-600">Drag & Drop PDF files to upload</p>
      </div>
    </div>
  );
}

export default Drag;
