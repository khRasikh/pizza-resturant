"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearCustomerForm, toastMessages } from "@/components/shared/constants";
import Form from "@/components/customers/form";
import { NoResultFound, Table } from "@/components/shared/table";
import SearchBar from "@/components/shared/Search";

export default function Customers() {
  const t = useTranslations("CustomerPage");
  const [customers, setCustomer] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showForm, setShowForm] = useState(true);


  const fetchData = async () => {
    const getCustomers = await fetch("/api/psql/fetch", { method: "GET", cache: "no-cache" })
    const consumersList = await getCustomers.json()
    if (getCustomers.ok) {
      setCustomer(consumersList.data)
      setIsLoading(false)
    } else {
      setCustomer([])
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [customers]);

  //search & filter
  const [searchTerm, setsearchTerm] = useState("");
  const handleSearch = (value: string) => {
    setsearchTerm(value);
  };
  const filterCustomers = (customer: any): boolean => {
    if (!searchTerm) {
      return true; // No search term provided, return all customers
    }

    const searchTermLowerCase = searchTerm.toString().toLowerCase();

    const matchProperties = [
      'first_name',
      'last_name',
      'address',
      'phone_number',
      'id'
    ];

    for (const prop of matchProperties) {
      if (customer[prop]?.toString().toLowerCase().startsWith(searchTermLowerCase)) {
        return true; // Customer matches the search term in any property
      }
    }
    return false; // No match found in any customer property
  };

  const filteredCustumers = customers.filter(filterCustomers);


  // form
  const [formData, setFormData] = useState(clearCustomerForm);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { Id, First_Name, Phone_Number, Address } = formData;

    if (!Id) {
      return toast.error('Please fill in the ID field', toastMessages.OPTION);
    } else if (!First_Name) {
      return toast.error('Please fill in the First Name field', toastMessages.OPTION);
    } else if (!Phone_Number) {
      return toast.error('Please fill in the Phone Number field', toastMessages.OPTION);
    } else if (!Address) {
      return toast.error('Please fill in the Address field', toastMessages.OPTION);
    }

    // Here, implement your code to send formData to your backend API
    const addCustomer = await fetch('/api/psql/add', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (addCustomer.status == 200) {
      setFormData(clearCustomerForm);
      toast.success('A new customer has been added', toastMessages.OPTION);
      setShowForm(true)
    } else {
      toast.error('Faild to add new record', toastMessages.OPTION);
    }

  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };



  const fields = [
    { name: 'Id', value: formData.Id, placeholder: 'ID#' },
    { name: 'First_Name', value: formData.First_Name, placeholder: 'First Name' },
    { name: 'Last_Name', value: formData.Last_Name, placeholder: 'Last Name' },
    { name: 'Phone_Number', value: formData.Phone_Number, placeholder: 'Phone' },
    { name: 'Address', value: formData.Address, placeholder: 'Address' },
  ];

  return (
    <PageLayout title={t("title")}>
      <ToastContainer />
      <div className="justify-center items-center">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8" >
            <div className="flex flex-col items-center ">
              {showForm ? <div className="flex flex-row"><div><SearchBar searchTerm={searchTerm} onSearch={handleSearch} /></div> <div><button
                className="bg-green-500 hover:bg-green-700 my-2 py-2 text-white font-bold text-md px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                onClick={toggleForm}
              >
                +  New
              </button></div></div> : <div className="bg-slate-200 rounded-md px-8">
                {/* <Form handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} handleClose={toggleForm} /> */}
                <Form
                  formData={formData}
                  fields={fields}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  handleClose={toggleForm}
                />
              </div>}
            </div>
            {filteredCustumers.length > 0 && !isLoading ? (
              <Table data={filteredCustumers} isLoading={isLoading} itemsPerPage={5} />
            ) : (
              <div>
                {filteredCustumers.length === 0 && !isLoading ? <NoResultFound message={"No Customer Found!"} /> : <NoResultFound message={"Loading..."} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}