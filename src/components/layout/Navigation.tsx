"use client";

import { useTranslations } from "next-intl";
import { SessionProvider } from "next-auth/react";
import Component from "../auth/signin";
import NavigationLink from "../shared/NavigationLink";

export default function Navigation() {
  const t = useTranslations("Navigation");

  return (
    <SessionProvider>
      <div className="bg-green-300">
        <div className="w-full mx-auto max-w-screen-xl px-4 md:flex md:items-center md:justify-between">
          <nav className="container flex justify-between p-2 text-white">
            <div>
              <NavigationLink href="/">{t("home")}</NavigationLink>
              <NavigationLink href="/about">{t("about")}</NavigationLink>
              <NavigationLink href="/publishes">{t("publishes")}</NavigationLink>
              <NavigationLink href="/authorized">{t("authorized")}</NavigationLink>
              <NavigationLink href="/protected">{t("protected")}</NavigationLink>
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
