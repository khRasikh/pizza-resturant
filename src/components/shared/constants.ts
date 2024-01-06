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
  Seit: "",
  Mal: 0,
  DM: "",
  letzte: "",
  Rabatt: 0,
  Fix: 0,
  Bemerkung: "",
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
  MWSt: 0.7,
  Rabatt: 0,
};

export const clearOrderFields = {
  id: "",
  customer_id: 0,
  name: "",
  price: "",
  count: 0,
  extra: "",
  discount: 0,
  total: "",
  order_date: new Date().toString(),
};

export const toastMessages = {
  ERROR_CONTENT: "Failed to delete Record",
  SUCCESS_CONTENT: "Record deleted successfully",
  OPTION: {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
  },
};

export const MenuColumns = ["Type", "CompNum", "Name", "SinglPreis", "JumboPreis", "FamilyPreis", "PartyPreis", "Actions"];

export const CustomerProperties = ["KNr", "Name", "Tel", "Str", "Ort", "Bemerkung"];

export const CustomerColumns = ["KNr", "Name", "Tel", "Str", "Ort", "Bemerkung"]; //"Rabatt",

export const DefaultPageNumber = 10;

export const OrderColumns = ["Anz", "Nr.", "Bez.", "Pr", "Extra", "Rabatt", "Total", "Datum"];

export const Tables = {
  Article: "article",
  Customers: "customers",
};

export const formatNumber = (value: number): string => {
  const parsedValue = parseFloat(value.toString());
  if (!isNaN(parsedValue)) {
    return parsedValue.toFixed(2);
  }
  // Return the original value if parsing fails
  return value.toString();
};

export const extaListStatic = [
  { id: 1, name: "Ananas", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 2, name: "Artischocken", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 3, name: "Ausbergine", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 4, name: "Basilikum", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 5, name: "Broccoli", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 6, name: "Champignon", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 7, name: "Chili", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 8, name: "Ei", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 9, name: "Erbsen", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 10, name: "Gorgonzola", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 11, name: "Hackfleisch", SinglPreis: 1.5, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 12, name: "Kapern", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 13, name: "Käse", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 14, name: "Knoblauch", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 3.3, PartyPreis: 3.0 },
  { id: 15, name: "Lachs", SinglPreis: 2.5, JumboPreis: 3.5, FamilyPreis: 2.0, PartyPreis: 6.9 },
  { id: 16, name: "Mais", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 3.3, PartyPreis: 3.0 },
  { id: 17, name: "Meeresfrüchte", SinglPreis: 1.5, JumboPreis: 2.5, FamilyPreis: 2.0, PartyPreis: 5.2 },
  { id: 18, name: "Mozzarella", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 4.9, PartyPreis: 5.2 },
  { id: 19, name: "Muschel", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 2.0, PartyPreis: 5.2 },
  { id: 20, name: "Oliven", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 3.3, PartyPreis: 3.0 },
  { id: 21, name: "Paprika", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 3.3, PartyPreis: 3.0 },
  { id: 22, name: "Parmaschinken", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 23, name: "Parmesan", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 24, name: "Peperoni", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 25, name: "Salami", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 26, name: "Sardellen", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 27, name: "Schafskäse", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 28, name: "Scharf", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 29, name: "Schinken", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 30, name: "Schneiden", SinglPreis: 0, JumboPreis: 0, FamilyPreis: 0, PartyPreis: 0 },
  { id: 31, name: "Shrimps", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 32, name: "Speck", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 33, name: "Spinat", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 34, name: "Thunfisch", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 35, name: "Tomaten", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 36, name: "Zucchini", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 37, name: "Zwiebeln", SinglPreis: 1.0, JumboPreis: 1.5, FamilyPreis: 2.0, PartyPreis: 3.0 },
  { id: 38, name: "Dressing", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 39, name: "Dönerfleisch", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 40, name: "Ayran", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 41, name: "Sucuk", SinglPreis: 1.5, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 42, name: "Früchte", SinglPreis: 1.5, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 43, name: "Sahne", SinglPreis: 1.5, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 44, name: "Rucola", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 45, name: "Ketchup", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 46, name: "Mayonnaise", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 47, name: "Jalapenos", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
  { id: 48, name: "Chicken", SinglPreis: 1.9, JumboPreis: 2.5, FamilyPreis: 3.3, PartyPreis: 5.2 },
];

export const defaultCustomer = {
  KNr: 542,
  Name: "abholen",
  Tel: "01676431281",
  Str: "abholen",
  Ort: "Pizza Resturant",
  Seit: "0",
  Mal: 0,
  DM: "1",
  letzte: "1",
  Rabatt: 0,
  Fix: 0,
  Bemerkung: "no",
};
