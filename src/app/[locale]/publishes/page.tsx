"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";

export default function Publishes() {
  const t = useTranslations("PublishesPage");
  return (
    <PageLayout title={t("title")}>
      <div className="max-w-[460px]">
        {t.rich("description", {
          p: (chunks) => <div className="mt-4">{chunks}</div>,
          code: (chunks) => (
            <code className="font-mono text-green-500">{chunks}</code>
          ),
        })}
      </div>
    </PageLayout>
  );
}
