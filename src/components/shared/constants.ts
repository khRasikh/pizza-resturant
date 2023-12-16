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
  Name: "",
  Tel: "",
  Str: "",
  Ort: "",
  Bemerkung: "",
  Seit: "",
  Mal: undefined,
  DM: "",
  letzte: "",
  Rabatt: undefined,
  Fix: undefined,
};

export const clearMenuForm = {
  Type: "N",
  CompNum: 0,
  IhreNum: "",
  Name: "",
  SinglPreis: 0,
  JumboPreis: 0,
  FamilyPreis: 0,
  PartyPreis: 0,
  MWSt: 0,
  Rabatt: 0,
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

export const MenuColumns = ["Type", "CompNum", "Name", "SinglPreis", "JumboPreis", "FamilyPreis", "PartyPreis", "Actions"];

export const CustomerProperties = ["KNr", "Name", "Tel", "Str", "Ort", "Bemerkung"];

export const CustomerColumns = ["KNr", "Name", "Tel", "Str", "Ort", "Bemerkung"];

export const DefaultPageNumber = 10;

export const OrderColumns = ["Anz", "Nr.", "Bez.", "Pr", "Extra", "Total"];

export const Tables = {
  Article: "article",
  Customers: "customers",
};
