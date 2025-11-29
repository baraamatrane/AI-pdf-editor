import { SignIn } from "@clerk/nextjs";

function page() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <SignIn></SignIn>
    </div>
  );
}

export default page;
