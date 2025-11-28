"use client";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";

function Navbar() {
  const { user } = useUser();
  return (
    <div className="flex w-full justify-between px-8 py-4 ">
      <div></div>
      {user ? (
        <div>
          <span className="self-center mr-3">Hello, {user.firstName}</span>
          <SignOutButton>
            <Button variant="default" size="sm" className="mt-8">
              Sign out
            </Button>
          </SignOutButton>
        </div>
      ) : (
        <div className="flex gap-2">
          <SignUpButton>
            <Button variant="default" size="sm" className="mt-8">
              Sign up
            </Button>
          </SignUpButton>
          <SignInButton>
            <Button variant="ghost" size="sm" className="mt-8">
              Sign in
            </Button>
          </SignInButton>{" "}
        </div>
      )}
    </div>
  );
}

export default Navbar;
