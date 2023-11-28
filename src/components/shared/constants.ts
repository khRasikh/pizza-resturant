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
  Id: "",
  First_Name: "",
  Last_Name: "",
  Phone_Number: "",
  Address: "",
};

export const toastMessages = {
  ERROR_CONTENT: "Failed to delete customer",
  SUCCESS_CONTENT: "Customer deleted successfully",
  OPTION: {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
  },
};
