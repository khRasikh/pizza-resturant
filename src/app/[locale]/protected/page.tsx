"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import SearchBar from "@/components/shared/Search";
import { Table } from "@/components/protected/table";

export default function Publishes() {
  const t = useTranslations("ProtectedPage");

  return (
    <PageLayout title={t("title")}>
      <div className="flex flex-col justify-center items-center">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <SearchBar onSearch={function (value: string): void {
              throw new Error("Function not implemented.");
            }} />
            <Table />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}