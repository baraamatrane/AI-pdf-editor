import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-fuchsia-200 to-rose-300">
      <h1 className="text-5xl font-bold">Chat with Your PDFs</h1>
      <p className="mt-4 text-lg">
        Upload your PDF files and start a conversation!
      </p>
    </div>
  );
}
