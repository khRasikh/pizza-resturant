"use client";
import { useTranslations } from "next-intl";

export default function UnAuthorized() {
  const t = useTranslations("Error");

  return (
    <div className="flex flex-row text-center  bg-primary  items-center justify-center">
      <div className="max-w-lg mx-auto rounded-md mt-18 p-10">
        <h2 className="text-error-800 font-bold text-2xl text-center mb-2">
          {t("unAuthorized")}
        </h2>
        <div className="bg-green-500 text-green rounded-md p-2 mb-2 text-center">
          <p className="text-lg font-bold">{t("requestAdmin")}</p>
        </div>
        <button onClick={() => window.location.reload()} className="bg-primary hover:bg-primary-500 hover:border-0 text-primary font-bold py-2 px-4 border border-blue-700 rounded">
          {t("returnBack")}
        </button>
      </div>
    </div>
  );
}
