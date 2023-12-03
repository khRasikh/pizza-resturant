import { CustomerProperties } from "../shared/constants";

export const filterData = (data: any[], searchTerm: string)=>{
  const filterCustomers = (customer: any): boolean => {
    if (!searchTerm) {
      return true; // No search term provided, return all customers
    }
  
    const searchTermLowerCase = searchTerm.toString().toLowerCase();
  
    for (const prop of CustomerProperties) {
      if (customer[prop]?.toString().toLowerCase().startsWith(searchTermLowerCase)) {
        return true; // Customer matches the search term in any property
      }
    }
    return false; // No match found in any customer property
  };
  return data.filter(filterCustomers);
}