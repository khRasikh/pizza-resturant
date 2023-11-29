"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import SearchBar from "@/components/shared/Search";
import { Table } from "@/components/protected/table";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from "@/components/protected/form";
import { clearCustomerForm, toastMessages } from "@/components/shared/constants";

export default function Publishes() {
  const t = useTranslations("ProtectedPage");
  const [customers, setCustomer] = useState<any[]>([{}]);
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

    console.log("test te", addCustomer.status)
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
    setShowForm(!showForm); // Toggle form visibility
  };
  return (
    <PageLayout title={t("title")}>
      <ToastContainer />
      <div className="justify-center items-center">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
            <div className="flex flex-col items-center">
              {showForm ? <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                onClick={toggleForm}
              >
                New Customer
              </button> : <Form handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />}
            </div>
            {filteredCustumers.length > 0 ? <Table data={filteredCustumers} isLoading={isLoading} itemsPerPage={10} /> :
              <div className="text-black my-2 py-2 justify-center items-center">
                <div className="whitespace-nowrap px-6 py-4">Loading ...</div>
              </div>}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}