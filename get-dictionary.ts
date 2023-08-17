"use server";
import { Locale } from "./i18n-config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  de: () => import("./dictionaries/de.json").then((module) => module.default),
  cs: () => import("./dictionaries/cs.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (dictionaries.hasOwnProperty(locale)) {
    return dictionaries[locale]();
  } else {
    // Fallback to Default Languate(English) if the requested language is not available
    return dictionaries.en();
  }
};
