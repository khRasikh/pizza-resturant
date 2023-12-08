"use client";

import { useTranslations } from "next-intl";
import { SessionProvider } from "next-auth/react";
import Component from "../auth/signin";
import NavigationLink from "../shared/navigationLink";

export default function Navigation() {
  const t = useTranslations("Navigation");

  return (
    <SessionProvider>
      <div className="bg-red-400">
        <div className="w-full mx-auto max-w-screen-xl px-4 md:flex md:items-center md:justify-between">
          <nav className="container font-extrabold flex justify-between p-2 text-black">
            <div>
              <NavigationLink href="/about">{t("about")}</NavigationLink>
              <NavigationLink href="/menu">{t("menu")}</NavigationLink>
              <NavigationLink href="/customers">{t("customers")}</NavigationLink>
            </div>
            <div>
              <Component />
            </div>
          </nav>
        </div>
      </div>
    </SessionProvider>
  );
}
