"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomerColumns, DefaultPageNumber, toastMessages } from "@/components/shared/constants";
import { NoResultFound, PaginationCustomized, Table } from "@/components/shared/table";
import SearchBar from "@/components/shared/search";
import { filterData } from "@/components/lib/filter";
import {  deleteDataFromTextFile, readDataFromTextFile } from "@/app/fileCrud";
import { ICustomers } from "@/components/interface/general";

export default function Orders() {
  const t = useTranslations("CustomerPage");
  const t1 = useTranslations("Body");
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomers = async () => {
    const customerList: { headers: any, body: any[] } = await readDataFromTextFile()

    if (customerList.body) {
      const sortedCustomers = customerList.body.sort((a, b) => parseInt(b.KNr) - parseInt(a.KNr))
      setCustomers(sortedCustomers);
      setCustomers(customerList.body);
      setIsLoading(false);
    } else {
      setCustomers([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [customers]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPageNumber(1);
  };
  //search & filter
  const filteredCustumers = filterData(customers, searchTerm);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<ICustomers[]>([]);
  const [pageItemsSize, setPageItemsSize] = useState<number>(DefaultPageNumber);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const indexOfLastItem = currentPage * pageItemsSize;
    const indexOfFirstItem = indexOfLastItem - pageItemsSize;
    const updatedCurrentItems = filteredCustumers.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(updatedCurrentItems);
    setCurrentPage(pageNumber);
  }, [customers, pageItemsSize]);

  //delete
  const deleteCustomer = async (consumerId: string) => {
    try {
      const response = await deleteDataFromTextFile(JSON.parse(consumerId), "customers")

      if (response.status) {
        toast.success(t1("Form.successMessage"), toastMessages.OPTION);
      } else {
        toast.error(t1("Form.errorMessage"), toastMessages.OPTION);
      }
    } catch (error) {
      toast.error(t1("Form.errorMessage"), toastMessages.OPTION);
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <PageLayout title={t("title")}>
      {showForm ? (
        <div className="flex flex-col items-center">
          <div className="flex flex-row">
            <div>
              <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
            </div>
            <div>
              <button
                onClick={toggleForm}
                type="button"
                className="flex rounded-md hover:text-black hover:font-bold
                  bg-slate-50-200 hover:white pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                  leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                  focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-2 mt-2">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                  className="w-6 h-5 font-bold hover:text-green-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg></span>
                {t1("Button.addCustomer")}
              </button>

            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-200 rounded-md px-8">

        
        </div>
      )}

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8  h-screen">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">

          {currentItems.length > 0 && !isLoading ? (
            <div>
              <Table
                isLoading={isLoading}
                items={currentItems}
                deleteRow={deleteCustomer}
                columns={CustomerColumns}
              />
              <PaginationCustomized
                pageItemsSize={pageItemsSize}
                totalItems={filteredCustumers.length}
                pageNumber={pageNumber}
                setPageItemsSize={setPageItemsSize}
                setPageNumber={setPageNumber}
              />
            </div>
          ) : (
            <div>
              {filteredCustumers.length === 0 && !isLoading ? (
                <NoResultFound message={t1("notFound")} />
              ) : (
                <NoResultFound message={t1("loading")} />
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
