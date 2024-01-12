"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomerColumns, DefaultPageNumber, Tables, clearCustomerForm, defaultCustomer, toastMessages } from "@/components/shared/constants";
import Form from "@/components/customers/form";
import { NoResultFound, PaginationCustomized, Table } from "@/components/shared/table";
import SearchBar from "@/components/shared/search";
import { filterData } from "@/components/lib/filter";
import { ICustomers } from "@/components/interface/general";
import { addDataToMongoDB, deleteCustomerFromMongoDB, getCustomersFromMongoDB } from "@/components/shared/mongodbCrud";
import { getCustomersFromFile } from "@/app/fileCrud";
import { OrderModal } from "@/components/customers/modal";

export default function Customers() {
  const t = useTranslations("CustomerPage");
  const t1 = useTranslations("Body");
  const [customers, setCustomers] = useState<ICustomers[]>([clearCustomerForm]);
  const [customer, setCustomer] = useState<ICustomers>(defaultCustomer);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const mergeCustomerLists = (list1: any, list2: any) => {
    // Assuming both lists have a unique identifier like 'KNr'
    const merged: any = new Map();

    list1.forEach((customer: { KNr: any; }) => {
      merged.set(customer.KNr, customer);
    });

    list2.forEach((customer: { KNr: any; }) => {
      merged.set(customer.KNr, customer);
    });

    return Array.from(merged.values());
  };

  const fetchCustomers = async () => {
    // const customerListLocal: { headers: any, body: any[] } = await readDataFromTextFile("customers")
    const customerListLocal: { data: ICustomers[], status: boolean } = await getCustomersFromFile("customers")

    const customerList: { data: any[], status: boolean } = await getCustomersFromMongoDB("customers");
    if (customerList.status || customerListLocal.status) {
      const mergedCustomers: any = mergeCustomerLists(customerListLocal.data, customerList.data);
      const sortedCustomers = mergedCustomers.sort((a: { KNr: string; }, b: { KNr: string; }) => parseInt(b.KNr) - parseInt(a.KNr));
      setCustomers(sortedCustomers);
      setIsLoading(false);
    } else {
      setCustomers([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [customers]);

  const [pickup, setPickup] = useState<boolean>(false)

  const handleSearch = (value: string) => {
    if (value === "SUMBMITTED0") {
      setPickup(true)
    }
    setSearchTerm(value);
    setPageNumber(1);
  };
  //search & filter
  const filteredCustumers = filterData(customers, searchTerm);

  // form
  const [formData, setFormData] = useState(clearCustomerForm);

  const submit = async (e: any) => {
    e.preventDefault();

    const { Name, Tel, Str }: ICustomers = formData;

    if (!Name || !Tel || !Str) {
      return toast.error(t1("Form.inCompleteMessage"), toastMessages.OPTION);
    }

    // const addCustomer = await addDataToTextFile<ICustomers>(formData, Tables.Customers)
    const addCustomer = await addDataToMongoDB(formData, Tables.Customers)

    if (addCustomer.status) {
      setFormData(clearCustomerForm);
      toast.success(t1("Form.successMessage"), toastMessages.OPTION);
      setShowForm(true);
    } else {
      toast.error(t1("Form.errorMessage"), toastMessages.OPTION);
    }
  };


  // filter str input textbox
  const [filteredStr, setFilteredStr] = useState<any>([])
  const change = (e: any) => {
    const { name, value } = e.target;

    if (name === "Str") {
      // Grouping by Postal Codes (Ort)
      const matchingObjects = customers.length > 0 && customers.filter((obj: any) => obj.Str.includes(value));
      if (Array.isArray(matchingObjects) && value.length > 0) {
        setFilteredStr(matchingObjects)
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const inputFields = [
    { name: "Name", value: formData.Name, placeholder: t1("Form.name") },
    { name: "Tel", value: formData.Tel, placeholder: t1("Form.Tel") },
    { name: "Str", value: formData.Str, placeholder: t1("Form.Str") },
    { name: "Ort", value: formData.Ort, placeholder: t1("Form.Ort") },
    { name: "Seit", value: formData.Seit, placeholder: t1("Form.Seit") },
    // { name: "Mal", value: formData.Mal ? formData.Mal : '', placeholder: t1("Form.Mal") },
    // { name: "DM", value: formData.DM || '', placeholder: t1("Form.DM") },
    { name: "letzte", value: formData.letzte || '', placeholder: t1("Form.letzte") },
    { name: "Rabatt", value: formData.Rabatt ? formData.Rabatt : '', placeholder: t1("Form.Rabatt") },
    { name: "Bemerkung", value: formData.Bemerkung || '', placeholder: t1("Form.Bemerkung") },
    // { name: "Fix", value: formData.Fix ? formData.Fix : '', placeholder: t1("Form.fixed") },
  ];

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<ICustomers[]>([]);
  const [pageItemsSize, setPageItemsSize] = useState<number>(DefaultPageNumber);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const fetchUpdatedConsumers = () => {
      const indexOfLastItem = currentPage * pageItemsSize;
      const indexOfFirstItem = indexOfLastItem - pageItemsSize;
      const updatedCurrentItems = filteredCustumers.slice(indexOfFirstItem, indexOfLastItem);
      if (updatedCurrentItems.length === 1) {
        setCustomer(updatedCurrentItems[0])
        setPickup(true)
      }
      setCurrentItems(updatedCurrentItems);
      setCurrentPage(pageNumber);
    }
    fetchUpdatedConsumers()
  }, [customers, pageItemsSize]);

  //delete
  const deleteCustomer = async (consumerId: string) => {
    try {
      // const response = await deleteDataFromTextFile(JSON.parse(consumerId), "customers")
      const response = await deleteCustomerFromMongoDB(JSON.parse(consumerId), "customers")

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

  const toggleForm = () => {
    setShowForm(!showForm);
    setFormData(clearCustomerForm)
    setFilteredStr([])
  };

  const handleToggelModal = () => {
    handleSearch("")
    setSearchTerm("")
    setPickup(false)
    setCustomer(defaultCustomer)
  }
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

          <Form
            formData={formData}
            fields={inputFields}
            handleChange={change}
            handleSubmit={submit}
            handleClose={toggleForm}
            filteredStr={filteredStr}
          />
        </div>
      )}

      {pickup && customer && <OrderModal customer={customer} toggleModal={handleToggelModal} />}
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
