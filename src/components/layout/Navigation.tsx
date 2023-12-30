"use client";

import { useTranslations } from "next-intl";
import { SessionProvider, useSession } from "next-auth/react";
import Header from "../auth/signin";
import NavigationLink from "../shared/navigationLink";
import Kasset from "../shared/kasset";
import type { FC } from 'react';

export default function Navigation() {

  return (
    <SessionProvider>
      <div className="bg-slate-200">
        <div className="w-full mx-auto max-w-screen-xl px-4 md:flex md:items-center md:justify-between">
          <AuthenticatedNavigation />
        </div>
      </div>
    </SessionProvider>
  );
}


interface AuthenticatedNavigationProps { }

const AuthenticatedNavigation: FC<AuthenticatedNavigationProps> = () => {
  const t = useTranslations("IndexPage");
  const t1 = useTranslations("Navigation");

  const { data: session } = useSession()

  if (!session) {
    return <nav className="container font-extrabold flex justify-between p-2 text-black">
      <div>
        <NavigationLink href="/">{t("title")}</NavigationLink>
      </div>
      <div>
        <Header />
      </div>
    </nav>
  }
  return (
    <nav className="container font-extrabold flex justify-between p-2 text-black">
      <div>
        <NavigationLink href="/menu">{t1("menu")}</NavigationLink>
        <NavigationLink href="/customers">{t1("customers")}</NavigationLink>
        <NavigationLink href="/orders">{t1("orders")}</NavigationLink>
        <Kasset />
      </div>
      <div>
        <Header />
      </div>
    </nav>
  );
}
