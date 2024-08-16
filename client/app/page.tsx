
import { redirect } from "next/navigation";
import { auth } from "./auth";
import SignIn from "./components/sign-in";

export default async function Home() {
  const session = await auth()
  if(session){
    redirect("/landing")
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-[100px] font-bold mb-2">BuizBot</p>
      <SignIn />
    </div>
  );
}
