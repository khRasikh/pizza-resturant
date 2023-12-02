import { ChangeEvent, FormEvent, ReactNode } from "react";

export interface ITable {
  data: any[];
  isLoading: boolean;
  itemsPerPage: number;
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
  value: string;
  placeholder: string;
}

export interface IForm {
  formData: any;
  fields: IField[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleClose: () => void
}
