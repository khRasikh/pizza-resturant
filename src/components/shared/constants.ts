import { toast } from "react-toastify";

export const dateTimeFormat: Record<string, string | number> = {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

export const timeZone = {
  deutch: "de-DE",
  USA: "en-US",
};

export const clearCustomerForm = {
  id: "",
  first_name: "",
  last_name: "",
  home_number: "",
  street_name: "",
  postal_code: "",
  phone_number: "",
  description: "",
};

export const clearMenuForm = {
  id: "",
  name: "",
  category: "",
  description: "",
  extra: {},
  price: "",
  currency: "",
  shift: "",
};

export const clearOrderFields = {
  id: "",
  name: "",
  price: "",
  count: "",
  extra: "",
  total: "",
  created_at: "",
};

export const toastMessages = {
  ERROR_CONTENT: "Failed to delete customer",
  SUCCESS_CONTENT: "Customer deleted successfully",
  OPTION: {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
  },
};

export const CustomerColumns = ["ID#", "Name", "Last Name", "Phone Number", "Address", "Description", "Actions"];

export const CustomerProperties = ["first_name", "last_name", "address", "phone_number", "id"];

export const MenuColumns = ["ID#", "Name", "Category", "Description", "Extra", "Price", "Actions"];

export const DefaultPageNumber = 10;

export const OrderColumns = ["Anz", "Nr.", "Bez.", "Pr", "Extra", "Total"];

