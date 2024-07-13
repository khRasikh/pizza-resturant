import { useSession } from "next-auth/react";
import { IBody } from "../interface/general";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { getData } from "../shared/psqlCrud";
import { useRouter } from "next/navigation";

export default function Body({ children, title }: Readonly<IBody>) {
  const { data: session }: any = useSession();
  const [users, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const t = useTranslations("Body");

  const router = useRouter();
  const locale = useLocale();

  const handlePressKey = (e: any) => {
    if (e.key === "F10") {
      router.push("/" + locale + "/customers");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getData("users");
      if (usersData.status) {
        setUsers(usersData.body);
        setIsLoading(false); // Update loading state when data is fetched
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    // Loading state while fetching data
    return (
      <div className="bg-blue-900 text-white w-full flex items-center justify-center mt-36">
        <p>Loading...</p>
      </div>
    );
  }

  // Check session and user email existence
  const doesEmailExist = (emailToCheck: any) => {
    return users.some((user: any) => user.email === emailToCheck);
  };

  if (!session) {
    return (
      <div onKeyDown={(e) => handlePressKey(e)} className="bg-blue-900 w-full flex items-center justify-center mt-36">
        <div className="max-w-screen-xl p-4 text-center">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-2xl">
            {t("session.welcome")} {title}
          </h1>
          <div className="mt-6 text-yellow-300 md:text-lg">
            <p>{t("session.unAuthorizedToAccessList")}</p>
          </div>
        </div>
      </div>
    );
  }

  const { user } = session;
  if (session && doesEmailExist(user.email)) {
    return (
      <div className="justify-between">
        <div
          onKeyDown={(e) => handlePressKey(e)}
          className="w-full bg-blue-900 mx-auto max-w-screen-xl p-4 md:flex md:items-start md:justify-start flex items-center justify-center content-center"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-0 top-1 h-[20500px] w-[20500px] -translate-x-[47.5%] rounded-full  from-slate-900 via-cyan-500" />
          </div>
          <div className="relative flex grow flex-col px-4">
            <div className="mt-6 text-black md:text-lg text-left">{children}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        onKeyDown={(e) => handlePressKey(e)}
        className="w-full bg-blue-900 mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-1 h-[20500px] w-[20500px] -translate-x-[47.5%] rounded-full  from-slate-900 via-cyan-500" />
        </div>
        <div className="container relative flex grow flex-col px-4">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-yellow-300 md:text-2xl">
            {t("session.welcome")} {title}
          </h1>
          <div className="mt-6 text-gray-800 md:text-lg">
            <p>
              {t("session.unAuthorizedToPage")}
              secureapp.me@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
