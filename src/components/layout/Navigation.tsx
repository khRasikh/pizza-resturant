"use client";

import { useTranslations } from "next-intl";
import LocaleSwitcher from "../LocaleSwitcher";
import NavigationLink from "../NavigationLink";

export default function Navigation() {
  const t = useTranslations("Navigation");

  return (
    <div className="bg-green-300">
      <div className="w-full mx-auto max-w-screen-xl px-4 md:flex md:items-center md:justify-between">
        <nav className="container flex justify-between p-2 text-white">
          <div>
            <NavigationLink href="/">{t("home")}</NavigationLink>
            <NavigationLink href="/about">{t("about")}</NavigationLink>
            <NavigationLink href="/publishes">{t("publishes")}</NavigationLink>
          </div>
          <LocaleSwitcher />
        </nav>
      </div>
    </div>
  );
}
