"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Bg from "@/public/pdfform-banner-picture.png";
import { SignUpButton, useUser } from "@clerk/nextjs";
import Navbar from "./_navbar/navbar";
import Drag from "@/components/Drag";

export default function Home() {
  const { user, isLoaded } = useUser();
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-blue-300 to-indigo-200">
      <Navbar />
      <h1 className="text-5xl font-bold">Chat with Any PDF</h1>
      <p className="mt-4 text-lg">
        Upload your PDF files and start a conversation!
      </p>
      {!user && isLoaded ? (
        <SignUpButton>
          <Button variant="default" size="lg" className="ml-8">
            Get Started
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </SignUpButton>
      ) : (
        <Link href="/chat">
          <Button variant="default" size="lg" className="ml-8">
            Chat Now
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      )}
      <Drag />
    </div>
  );
}
