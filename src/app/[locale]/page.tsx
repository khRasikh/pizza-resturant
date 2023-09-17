"use client";

import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";

export default function IndexPage() {
  const t = useTranslations("IndexPage");

  return (
    <PageLayout title={t("title")}>
      <p className="max-w-[590px]">
        {t.rich("description", {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          code: (chunks) => (
            <code className="font-mono text-green-500">{chunks}</code>
          ),
        })}
      </p>
    </PageLayout>
  );
}
