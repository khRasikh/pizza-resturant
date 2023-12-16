"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomerColumns, DefaultPageNumber, Tables, clearCustomerForm, toastMessages } from "@/components/shared/constants";
import Form from "@/components/customers/form";
import { NoResultFound, PaginationCustomized, Table } from "@/components/shared/table";
import SearchBar from "@/components/shared/search";
import { filterData } from "@/components/lib/filter";
import { addDataToTextFile, deleteDataFromTextFile, readDataFromTextFile } from "@/app/fileCrud";
import { ICustomers } from "@/components/interface/general";

export default function Customers() {
  const t = useTranslations("CustomerPage");
  const t1 = useTranslations("Body");
  const [customers, setCustomers] = useState<ICustomers[]>([clearCustomerForm]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomers = async () => {
    const customerList: { headers: any, body: any[] } = await readDataFromTextFile()

    if (customerList.body) {
      setCustomers(customerList.body.sort((a, b) => parseInt(b.KNr) - parseInt(a.KNr)));
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
    console.log("test search", value, customers.length)
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

    const addCustomer = await addDataToTextFile<ICustomers>(formData, Tables.Customers)

    if (addCustomer.status) {
      setFormData(clearCustomerForm);
      toast.success(t1("Form.successMessage").replace("record", "Customer"), toastMessages.OPTION);
      setShowForm(true);
    } else {
      toast.error(t1("Form.errorMessage").replace("record", "Customer"), toastMessages.OPTION);
    }
  };

  const change = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const inputFields = [
    { name: "Name", value: formData.Name, placeholder: t1("Form.name") },
    { name: "Tel", value: formData.Tel, placeholder: t1("Form.Tel") },
    { name: "Str", value: formData.Str, placeholder: t1("Form.Str") },
    { name: "Ort", value: formData.Ort, placeholder: t1("Form.Ort") },
    { name: "Bemerkung", value: formData.Bemerkung || '', placeholder: t1("Form.Bemerkung") },
    { name: "Seit", value: formData.Seit, placeholder: t1("Form.Seit") },
    { name: "Mal", value: formData.Mal ? formData.Mal : '', placeholder: t1("Form.Mal") },
    { name: "DM", value: formData.DM || '', placeholder: t1("Form.DM") },
    { name: "letzte", value: formData.letzte || '', placeholder: t1("Form.letzte") },
    { name: "Rabatt", value: formData.Rabatt ? formData.Rabatt : '', placeholder: t1("Form.Rabatt") },
    // { name: "Fix", value: formData.Fix ? formData.Fix : '', placeholder: t1("Form.fixed") },
  ];

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
            </div>{" "}
            <div>
              <button
                className="bg-green-500 hover:bg-green-700 my-2 py-2 text-white font-bold text-md px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                onClick={toggleForm}
              >
                {t1("Button.add").replace("Record", "Customer")}
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
          />
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
