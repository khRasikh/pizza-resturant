import { useSession, signIn, signOut } from "next-auth/react";
import LocaleSwitcher from "../shared/localeSwitcher";
import { useTranslations } from "next-intl";

export default function Header() {
  const { data: session }: any = useSession();
  const t = useTranslations("Navigation")

  if (session) {
    return (
      <div className="flex flex-row">
        <span className="hidden sm:block md:block lg:block mx-2 my-4 text-sm font-bold text-gray-700">
          {session.user.name ? session.user.name : session.user.email}
        </span>
        <LocaleSwitcher />
        <button
          onClick={() => signOut()}
          type="button"
          className="text-black bg-gradient-to-r focus:ring-4 focus:outline-none font-extrabold text-md px-4 py-3 text-center me-2 mb-2 hover:text-red-700 "
        >
          {t("signOut")}
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
        className="text-gray-800 mt-2 focus:ring-4 focus:outline-none font-extrabold text-md px-4 py-2 text-center me-2 mb-2 hover:text-red-700 "
      >
        {t("login")}
      </button>
    </div>
  );
}
