"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IArticles, IArticlesForm, ICustomers, IForm, IFormModal } from "../interface/general";
import { useTranslations } from "next-intl";
import { clearOrderFields, extaListStatic, formatNumber } from "../shared/constants";
import { getMenusFromMongoDB } from "../shared/mongodbCrud";
import clsx from "clsx";
import { AddICon, PrintIcon } from "../shared/icons";
import { TableSummary } from "../shared/table";

export const FormCreateOrder = ({
  formDataModal,
  handleChange,
  handleSubmitFormOrder,
  addToOrderList,
  handlePrint,
  isSubmitted,
  orderList,
  lastOrders,
}: IFormModal) => {
  const t = useTranslations("Body");
  const sizes = ["SinglPreis", "JumboPreis", "FamilyPreis", "PartyPreis"] as const;
  const [selectedPrice, setSelectedPrice] = useState<string>();
  const [priceOptions, setPriceOptions] = useState<any[]>();
  const [count, setCount] = useState<number>(0);
  const [extra, setExtra] = useState<{ id: number; name: string; price: number }>({ id: 0, name: "", price: 0 });
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [menu, setMenu] = useState<IArticles[]>([]);
  const [category, setCategory] = useState<string>("SinglPreis");
  const [compNum, setCumpNum] = useState<number>(0);

  const handleChangeCompNum = (e: any) => {
    const value = e.target.value;
    // Find the price associated with the selected CompNum
    const selectedMenu = menu.length > 0 && menu.find((item) => item.CompNum.toString() === value.toString());

    if (selectedMenu) {
      setSelectedPrice(selectedMenu.SinglPreis.toString()); // selected by default
      const priceDetails = sizes.map((priceKey) => ({
        name: priceKey,
        price: selectedMenu[priceKey],
      }));
      setPriceOptions(priceDetails);
      formDataModal["id"] = value;
      formDataModal["name"] = selectedMenu.Name;
      formDataModal["price"] = "0";
      formDataModal["extra"] = { id: 0, name: "", price: 0 };
      calculateTotal(count, extra.price, discount);
    }
    // else {
    //     setSelectedPrice('');
    // }
  };

  const handleChangePrice = (e: any) => {
    const priceValue = e.target.value.trim();

    if (priceValue.toString().toLowerCase() === "s" && priceOptions) {
      setCategory(priceOptions[0].name);
      setSelectedPrice(priceOptions[0].price);
      formDataModal["price"] = formatNumber(parseFloat(priceOptions[0].price));
    } else if (priceValue !== "" && priceValue === "j" && priceOptions) {
      setCategory(priceOptions[1].name);
      setSelectedPrice(priceOptions[1].price);
      formDataModal["price"] = formatNumber(parseFloat(priceOptions[1].price));
    } else if (priceValue !== "" && priceValue === "f" && priceOptions) {
      setCategory(priceOptions[2].name);
      setSelectedPrice(priceOptions[2].price);
      formDataModal["price"] = formatNumber(parseFloat(priceOptions[2].price));
    } else if (priceValue !== "" && priceValue === "p" && priceOptions) {
      setCategory(priceOptions[3].name);
      setSelectedPrice(priceOptions[3].price);
      formDataModal["price"] = formatNumber(parseFloat(priceOptions[3].price));
    }
    calculateTotal(count, extra.price, discount);
  };

  // Handler for count change
  const handleCountChange = (e: ChangeEvent<any>) => {
    const countValue = e.target.value.trim();
    if (countValue !== "" && /^\d+$/.test(countValue)) {
      const newCount = parseInt(e.target.value);
      setCount(newCount);
      formDataModal["count"] = newCount;
      calculateTotal(newCount, extra.price > 0 ? extra.price : 0, discount);
    }
  };

  const handleExtraChangeV2 = (e: ChangeEvent<any>) => {
    const extraValue = e.target.value;
    const extraNumber = Math.abs(parseInt(extraValue));
    if (extaListStatic.length > 0 && !isNaN(extraNumber) && parseInt(extraValue) >= -48 && parseInt(extraValue) <= 48) {
      const getExtraObject = extaListStatic.filter((i) => i.id === extraNumber);
      let newExtrafromObject = 0;
      if (category === "SinglPreis" && extraValue !== "0") {
        // console.log("test SinglPreis", getExtraObject[0]["SinglPreis"])
        newExtrafromObject = Number(getExtraObject[0]["SinglPreis"]);
      } else if (category === "JumboPreis" && extraValue !== "0") {
        // console.log("test JumboPreis", getExtraObject[0]["JumboPreis"])
        newExtrafromObject = Number(getExtraObject[0]["JumboPreis"]);
      } else if (category === "FamilyPreis" && extraValue !== "0") {
        // console.log("test FamilyPreis", getExtraObject[0]["FamilyPreis"])
        newExtrafromObject = Number(getExtraObject[0]["FamilyPreis"]);
      } else if (category === "PartyPreis" && extraValue !== "0") {
        // console.log("test PartyPreis", getExtraObject[0]["PartyPreis"])
        newExtrafromObject = Number(getExtraObject[0]["PartyPreis"]);
      }

      if (extraValue > "0" && extraValue !== "0") {
        setExtra({ id: extraNumber, name: getExtraObject[0].name, price: newExtrafromObject });
        formDataModal["extra"] = { id: extraNumber, name: getExtraObject[0].name, price: newExtrafromObject };
        calculateTotal(count, newExtrafromObject, discount);
      } else if (extraValue === "0") {
        setExtra({ id: 0, name: getExtraObject[0].name, price: 0 });
        formDataModal["extra"] = { id: 0, name: "", price: 0 };
        calculateTotal(count, 0, discount);
      } else {
        setExtra({ id: extraNumber, name: getExtraObject[0].name, price: 0 });
        formDataModal["extra"] = { id: extraNumber, name: getExtraObject[0].name, price: 0 };
        calculateTotal(count, extra.price, discount);
      }
    }
  };

  // Handler for discount change
  const handleDiscountChange = (e: ChangeEvent<any>) => {
    const discountValue = e.target.value.trim();
    if (discountValue !== "" && /^\d+$/.test(discountValue)) {
      const newDiscount = parseInt(discountValue, 10);
      setDiscount(newDiscount);
      formDataModal["discount"] = newDiscount;
      calculateTotal(count, extra.price, newDiscount);
    }
  };

  // Function to calculate the total with discount
  const calculateTotal = (newCount: number, newExtra: number, newDiscount: number) => {
    const c = newCount === 0 ? formDataModal["count"] : newCount;
    if (selectedPrice) {
      // console.log("test newCount, newExtra, newDiscount, selectedPrice", newCount, newExtra, newDiscount, formDataModal["price"])
      let discountedTotal = c * parseFloat(formDataModal["price"]) + newExtra;
      // Calculate the discount amount
      const discountAmount = (discountedTotal * newDiscount) / 100;
      // Apply the discount to the total
      discountedTotal -= discountAmount;

      formDataModal["total"] = discountedTotal;
      // Format the total to two decimal places using formatNumber function if needed
      setTotal(Number(formatNumber(discountedTotal)));
    }
  };

  const kasset = sessionStorage.getItem("kasset") ? sessionStorage.getItem("kasset")?.toString() : "1"; //TODO: Kassets

  useEffect(() => {
    const fetchMenus = async () => {
      // const menus = await getMenusFromFile()
      const getMenus = await getMenusFromMongoDB("menus");
      if (kasset === "1" && getMenus.data) {
        setMenu(getMenus.data);
      } else if (kasset === "2" && getMenus.data) {
        const newPrices = updatePrices(getMenus.data);
        setMenu(newPrices);
      }
    };
    fetchMenus();
  }, []);

  const updatePrices = (menu: IArticles[]) => {
    const updatedList = menu.map((item, index) => {
      if (index >= 1 && index <= 29) {
        return {
          ...item,
          SinglPreis: Number(5.9),
          JumboPreis: Number(8.9),
        };
      } else if ((index >= 37 && index <= 49) || (index >= 79 && index <= 88)) {
        return {
          ...item,
          SinglPreis: Number(5.9),
        };
      }
      return item; // For items outside the specified range, return the original item
    });
    return updatedList;
  };

  const handlePrintAsync = () => {
    return handlePrint();
  };

  const firstInputRef = useRef<HTMLInputElement>(null); // Initialize useRef with proper type

  const handleSubmit = async (e: any) => {
    try {
      await handleSubmitFormOrder(e);
      console.log("Test Form order submitted successfully", selectedPrice, priceOptions, count, extra);
      // Reset form fields and other necessary operations
      formDataModal["count"] = 0;
      formDataModal["id"] = "0";
      formDataModal["price"] = "0";
      formDataModal["category"] = "";
      formDataModal["total"] = "0";
      formDataModal["extra"] = { id: 0, name: "", price: 0 };
      //clear display data in inputs
      setCount(0);
      setCategory("");
      setCumpNum(0);
      setDiscount(0);
      setTotal(0);
      setExtra({ id: 0, name: "", price: 0 });
      // Check if firstInputRef is not null or undefined before accessing its properties
      if (firstInputRef.current !== null && firstInputRef.current !== undefined) {
        firstInputRef.current.focus(); // Focus the input element
      }
    } catch (error) {
      console.error("Test Error submitting form order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-hidden bg-blue-900 text-yellow-300 font-extrabold text-2xl">
        <div className="w-full">
          <table className="min-w-full text-left text-sm font-light items-center justify-center bg-blue-900">
            <tbody>
              <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-1">
                <td className={`${"pl-1 py-1  text-yellow-300 font-extrabold"}`}>
                  <input
                    autoFocus
                    ref={firstInputRef}
                    type="number"
                    // value={formDataModal["count"] > 0 ? formDataModal["count"] : ""}
                    value={count === 0 ? "" : count}
                    name="count"
                    onChange={handleCountChange}
                    onKeyUp={handleCountChange}
                    className="w-full p-2 border-blue-500 disabled bg-blue-900 placeholder-white"
                    // placeholder={t("Form.count")}
                  />
                </td>
                <td className={`${"pl-1 py-1 bg-blue-900 font-bold"} font-extrabold`}>
                  <input
                    type="number"
                    // value={formDataModal["CompNum"] === 0 ? "" : formDataModal["CompNum"]}
                    // value={formDataModal["id"] === "0" ? "" : formDataModal["id"]}
                    name="CompNum"
                    onChange={handleChangeCompNum}
                    onKeyDown={handleChangeCompNum}
                    onKeyUp={handleChangeCompNum}
                    className="w-full p-2 border-blue-500 disabled bg-blue-900 placeholder-white"
                    // placeholder={t("Form.CompNum")}
                  />
                </td>

                <td className={`${"pl-1 py-1 bg-blue-900 font-bold"}`}>
                  <div
                    className="w-full p-2 border-blue-500 disabled bg-blue-900 placeholder-white uppercase"
                    placeholder={t("Form.name")}
                  >
                    {formDataModal["name"]}
                  </div>
                </td>

                <td className={`${"pl-1 py-1 bg-blue-900 font-bold"}`}>
                  <input
                    type="text"
                    // value={formDataModal["category"] === "" ? "" : formDataModal["category"]}
                    name="category"
                    onChange={handleChangePrice}
                    onKeyDown={handleChangePrice}
                    onKeyUp={handleChangePrice}
                    className="w-full p-2 border-blue-500 disabled bg-blue-900 placeholder-white uppercase"
                    placeholder={t("Form.category")}
                  />
                </td>

                <td className={`${"pl-1 py-1 bg-blue-900 text-yellow-300 font-extrabold"}`}>
                  <input
                    type="number"
                    name="extra"
                    // value={formDataModal["extra"] === 0 ? "" : formDataModal["extra"]}
                    // value={extra.price === 0 ? "" : extra.price}
                    onChange={handleExtraChangeV2}
                    onKeyUp={handleExtraChangeV2}
                    onKeyDown={handleExtraChangeV2}
                    className="w-full p-2 border-blue-500 bg-blue-900 placeholder-white disabled"
                    placeholder={`${t("Form.extra")}(€)`}
                  />
                </td>

                <td className={`${"pl-1 py-1 bg-blue-900 text-yellow-300 font-extrabold"}`}>
                  <input
                    type="text"
                    name="price"
                    value={
                      formDataModal["price"].toString() === "0" || formDataModal["price"].toString() === "0.00"
                        ? ""
                        : formatNumber(formDataModal["price"])
                    }
                    className="w-full p-2 border-blue-500 bg-blue-900 placeholder-white disabled"
                    placeholder={`${t("Form.price")}(€)`}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="justify-between items-between text-between flex flex-row mx-12 mt-12">
        <div className={`${"pl-1 py-2 bg-blue-900 text-yellow-300 font-extrabold"}`}>
          <p className="my-2">Fahr:</p>
        </div>
        <div className={`${"pl-1 py-2 bg-blue-900 text-yellow-300 font-extrabold flex"}`}>
          <p className="my-2 mx-6">Rabbat(%):</p>
          <input
            type="number"
            name="rabatt"
            onChange={handleDiscountChange}
            onKeyUp={handleDiscountChange}
            // value={formDataModal["discount"] === 0 ? "" : formDataModal["discount"]}
            value={discount > 0 ? discount : 0}
            className="w-16 mx-2 p-2 border-blue-500 bg-blue-900 placeholder-white"
            // placeholder={`${t("Form.Rabatt")} (%)`}
          />
          <p className="text-red-600 my-2">(€-{lastOrders?.length!})</p>
        </div>
        {<TableSummary list={orderList} />}
      </div>

      <td hidden>
        <div className="flex">
          {/* {!isSubmitted && <button className='mx-1 mt-2 py-2 flex' type='button' onClick={addToOrderList}>
                                          <SaveIcon />
                                          <p className='text-black hover:text-green-700 font-bold px-1 text-xs'>{t("Button.save")}</p>
                                      </button>} */}
          <button type="submit" className={clsx(`my-4 pb-4 flex px-1`)} onClick={() => handleSubmitFormOrder}>
            <AddICon />
            {/* <p className="text-yellow-300 font-bold px-1 text-xs">{t("Button.add")}</p> */}
          </button>
          <button type="button" className="my-3 pt-1 py-1 flex px-2" onClick={handlePrintAsync}>
            <PrintIcon />
            {/* <p className="text-yellow-300 font-bold px-1 text-md">{t("Button.print")}</p> */}
          </button>
        </div>
      </td>
    </form>
  );
};

const Form = ({ formData, fields, handleChange, handleSubmit, handleClose, filteredStr }: IForm) => {
  const t = useTranslations("Body");
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (value: ICustomers) => {
    setShowOptions(false);
    formData["Str"] = value.Str;
    formData["Ort"] = value.Ort;
  };

  useEffect(() => {
    setShowOptions(filteredStr.length > 0); // Show options only if there are items in the filtered list
  }, [filteredStr]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="w-full">
          <table className="min-w-full text-left text-sm font-light items-between justify-between">
            <tbody>
              <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 font-bold ">
                {fields.map((field, index) => {
                  return (
                    <td key={field.name} className={`${"pl-1 py-4 border-gray-500"}`}>
                      <div className="flex flex-row w-full">
                        <input
                          autoFocus={field.placeholder === "Name"}
                          type="text"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md"
                          placeholder={field.placeholder}
                        />
                        {showOptions && field.placeholder === "Str" && (
                          <span className="options-list absolute mt-10 h-44 w-fit px-6 overflow-x-hidden overflow-y-scroll bg-white  border rounded-md">
                            {filteredStr.map((obj: any, index = 1) => (
                              <button
                                autoFocus={index === 0 ? true : false}
                                type="button"
                                key={Number(index)}
                                className="option block w-full p-2 text-left focus:bg-slate-500 focus:text-white hover:bg-slate-500 hover:text-white"
                                onClick={() => handleOptionClick(obj)}
                              >
                                {obj.Str}
                              </button>
                            ))}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="whitespace-nowrap px-2 py-4 flex justify-center items-center">
                  <button
                    type="submit"
                    className="flex rounded-md hover:text-black hover:font-bold
                                        bg-green-700 hover:white pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                                        leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                                        focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-2"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-5 font-bold hover:text-green-700"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                    {t("Button.submit")}
                  </button>
                  <button
                    onClick={handleClose}
                    type="button"
                    className="flex rounded-md  hover:font-bold
                                        bg-red-700 text-white hover:text-black pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                                        leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                                        focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-5 font-bold hover:text-green-700"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    {t("Button.close")}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
};

export const FormMenu = ({ formData, fields, handleChange, toggleForm, handleSubmit }: IArticlesForm) => {
  const t = useTranslations("Body");
  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="w-full">
          <table className="min-w-full text-left text-sm font-light items-between justify-between">
            <tbody>
              <tr className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2 font-bold ">
                {fields.map((field, index) => {
                  return (
                    <td key={field.name} className={`lg:col-span-2 pl-1 py-4 border-gray-500" `}>
                      <input
                        type={field.placeholder === "Discount" ? `${"number"}` : `${"text"}`}
                        name={field.name}
                        value={formData[field.name] === 0 ? "" : formData[field.name]}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        placeholder={field.placeholder}
                      />
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="col-span-4 px-1 py-4 flex items-center justify-center lg:justify-center">
                  <button
                    type="submit"
                    className="flex rounded-md hover:font-bold
                                        bg-green-700 hover:text-white hover:white pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                                        leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                                        focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-2"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-5 font-bold hover:text-green-700"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </span>
                    {t("Button.addMenu")}
                  </button>
                  <button
                    onClick={toggleForm}
                    type="button"
                    className="flex rounded-md  hover:font-bold
                                        bg-red-700 text-white hover:text-black pr-4 pl-2 pb-2 pt-2 text-sm font-medium 
                                        leading-normal text-primary hover:text-primary-600 focus:text-primary-600
                                        focus:outline-none focus:ring-0 active:text-primary-700 shadow-md mx-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-5 font-bold hover:text-green-700"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    {t("Button.close")}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
};

export default Form;
