import { SignUp } from "@clerk/nextjs";

function page() {
  return (
    <div className="flex justify-center items-center w-full">
      <SignUp></SignUp>
    </div>
  );
}

export default page;
