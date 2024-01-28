import { ChangeEvent, FormEvent, ReactNode } from "react";

export interface ITable {
  isLoading: boolean;
  items: any[];
  columns: any[];
  deleteRow: (id: string) => void;
}

export interface ITableOrder {
  items: IOrder[];
  columns: any[];
  deleteRow: (id: string) => void;
}

export type IBody = {
  children?: ReactNode;
  title: ReactNode;
};

export type IPageLayout = {
  children?: ReactNode;
  title: ReactNode;
};

export interface ISearchBar {
  onSearch: (value: string) => void;
  placeholderValue?: string;
  searchTerm?: string;
}

export type NoResultFoundProps = {
  message: string;
};

export interface IField {
  name: string;
  value: string | object;
  placeholder: string;
}

export interface IFieldCustomer {
  name: string;
  value: string | object | number;
  placeholder: string;
}

export interface IForm {
  formData: any;
  fields: IFieldCustomer[];
  filteredStr?: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleClose: () => void;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  changePage: (pageNumber: number) => void;
  rowCount: number;
}
export interface IMenuForm {
  formData: any;
  fields: IField[];
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}
export interface IArticlesForm {
  formData: any;
  fields: IField[];
  handleChange: (e: any) => void;
  toggleForm: (e: any) => void;
  handleSubmit: (e: any) => void;
}

export interface IFormModal {
  formDataModal: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmitFormOrder: (e: FormEvent<HTMLFormElement>) => void;
  addToOrderList: () => void;
  handlePrint: () => void;
  isSubmitted: boolean;
}

export interface IOrder {
  id: string;
  customer_id: number;
  name: string;
  price: string;
  count: number;
  extra: { id: number; name: string; price: number };
  discount: number;
  total: string;
  order_date: string;
}
export interface IPrint {
  orderList: IOrder[];
  toggleModal: () => void;
  customer: ICustomers;
}
export interface IConsumerInOrder {
  KNr: number;
  Name: string;
  Tel: string;
}

export interface ICustomerFormLastData {
  inputFields: any[];
  change: (e: any) => void;
  filteredStr: any;
}

export interface IOrderModal {
  toggleModal: () => void;
  customer: ICustomers;
  customerFormLastData?: ICustomerFormLastData;
}

//Files Interfaces
export interface IArticles {
  Type: string;
  CompNum: number;
  IhreNum: string;
  Name: string;
  SinglPreis: number;
  JumboPreis: number;
  FamilyPreis: number;
  PartyPreis?: number;
  MWSt?: number;
  Rabatt?: number;
}

export interface ICustomers {
  KNr?: number;
  Name: string;
  Tel: string;
  Str?: string;
  Ort?: string;
  Seit?: string;
  Mal?: number;
  DM?: string;
  letzte?: string;
  Rabatt?: number;
  Fix?: number;
  Bemerkung?: string;
}
