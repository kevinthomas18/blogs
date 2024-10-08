import SignInForm from "./signInForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/profile");
  return <SignInForm />;
}
