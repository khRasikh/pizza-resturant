"use client";

import PageLayout from "@/components/PageLayout";
import { fallback, logError } from "@/components/shared/customError";
import { useTranslations } from "next-intl";
import { ErrorBoundary } from "react-error-boundary";

export const fetchCache = "force-no-store";

export default function IndexPage() {
  const t = useTranslations("IndexPage");

  return (
    <ErrorBoundary FallbackComponent={fallback} onError={logError}>
      <PageLayout title={t("title")}>
        <p className="max-w-[590px]">
          {t.rich("description", {
            p: (chunks) => <p className="mt-4">{chunks}</p>,
            code: (chunks) => <code className="font-mono text-green-500">{chunks}</code>,
          })}
        </p>
      </PageLayout>
    </ErrorBoundary>
  );
}
