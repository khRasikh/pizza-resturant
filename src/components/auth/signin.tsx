import { useSession, signIn, signOut } from "next-auth/react";
import LocaleSwitcher from "../shared/LocaleSwitcher";

export default function Component() {
  const { data: session }: any = useSession();

  if (session) {
    return (
      <div className="flex flex-row">
        <span className="m-2 text-sm font-bold text-gray-700">{session.user.email}</span>
        <button
          onClick={() => signOut()}
          type="button"
          className="text-black bg-gradient-to-r focus:ring-4 focus:outline-none font-extrabold text-md px-4 py-2 text-center me-2 mb-2 hover:text-white "
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-row">
      <LocaleSwitcher />
      <button
        onClick={() => signIn()}
        type="button"
        className="text-gray-800 mt-2 focus:ring-4 focus:outline-none font-extrabold text-md px-4 py-2 text-center me-2 mb-2 hover:text-white "
      >
        Sign In
      </button>
    </div>
  );
}
