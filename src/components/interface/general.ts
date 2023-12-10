import { ChangeEvent, FormEvent, ReactNode } from "react";

export interface ITable {
  isLoading: boolean;
  items: any[];
  columns: any[];
  deleteRow: (id: string) => void;
}

export interface ITableOrder {
  items: any[];
  columns: any[];
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

export interface IForm {
  formData: any;
  fields: IField[];
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

export interface MENUFORM {
  formData: any;
  fields: IField[];
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}

export interface IFormModal {
  formDataModal: any;
  fields: IField[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  addToOrderList: () => void;
  handlePrint: () => void;
  isSubmitted: boolean;
}

export interface IPrint {
  orderList: any[];
  toggleModal: () => void;
}

export interface IOrderModal {
  toggleModal: () => void;
  customer: { id: string; name: string; last_name: string };
}
