"use client";

import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { ErrorBoundary } from "react-error-boundary";

function fallback({ error, resetErrorBoundary }: any) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}


const logError = (error: Error, info: { componentStack: string }) => {
  // Do something with the error, e.g. log to an external API
  console.log("test Do something with the error, e.g. log to an external API")
};



export default function IndexPage() {
  const t = useTranslations("IndexPage");

  return (
    <ErrorBoundary FallbackComponent={fallback} onError={logError} >
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
    </ErrorBoundary>

  );
} 