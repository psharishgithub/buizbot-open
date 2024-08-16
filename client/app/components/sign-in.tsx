import { signIn } from "@/app/auth";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="">
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button
          type="submit"
          className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition-colors"
        >
          <FaGoogle className="mr-2" />
          <span>Sign in with Google</span>
        </button>
      </form>
    </div>
  );
}
