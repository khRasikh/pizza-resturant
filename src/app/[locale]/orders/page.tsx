"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DefaultPageNumber, OrderColumns, toastMessages } from "@/components/shared/constants";
import { NoResultFound, PaginationCustomized, TableAllOrder, TableSummary } from "@/components/shared/table";
import { filterData } from "@/components/lib/filter";
import { IOrder , OrdersResponse } from "@/components/interface/general";
import { deleteOrderFromMongoDB, getOrdersFromMongoDB } from "@/components/shared/mongodbCrud";

export default function Orders() {
  const t = useTranslations("OrderPage");
  const t1 = useTranslations("Body");

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);
  const [pageItemsSize, setPageItemsSize] = useState<number>(DefaultPageNumber);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const fetchOrders = async (pageN = 0, pageS = DefaultPageNumber) => {
    setIsLoading(true)
    const orderList: OrdersResponse = await getOrdersFromMongoDB("orders", pageN, pageS);
    if (orderList.status) {
      const sortedOrders = orderList.data.sort(
        (a, b) => Number(new Date(b.order_date!).getTime()) - Number(new Date(a.order_date!).getTime())
      );
      setOrders(sortedOrders);
      setCount(orderList.totalItems)
      setIsLoading(false);
      setPageNumber(orderList.page)
    } else {
      setOrders([]);
      setCount(0)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(pageNumber, pageItemsSize);
  }, [pageNumber, pageItemsSize]);

  // const handleSearch = (value: string) => {
  //   setSearchTerm(value);
  //   setPageNumber(1);
  // };
  //search & filter
  const filteredOrders = filterData(orders, searchTerm);


  //delete
  const deleteOrder = async (orderId: string) => {
    try {
      // const response = await deleteDataFromTextFile(JSON.parse(orderId), "orders")
      const response = await deleteOrderFromMongoDB(orderId, "orders");

      if (response.status) {
        toast.success(t1("Form.successMessage"), toastMessages.OPTION);
        await fetchOrders(pageNumber, pageItemsSize);
      } else {
        toast.error(t1("Form.errorMessage"), toastMessages.OPTION);
      }
    } catch (error) {
      toast.error(t1("Form.errorMessage"), toastMessages.OPTION);
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <PageLayout title={t("title")}>
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          <div>{/* <SearchBar searchTerm={searchTerm} onSearch={handleSearch} /> */}</div>
          <div></div>
        </div>
      </div>

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8  h-screen">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 rounded-md">
          {Array.isArray(orders) && orders.length > 0 && !isLoading ? (
            <div>
              <TableAllOrder
                // isLoading={isLoading}
                items={orders}
                deleteRow={deleteOrder}
                columns={OrderColumns}
              />
              <div className="flex justify-between">
                <div></div>
                <div></div>
                <div></div>
                <TableSummary list={orders}/>
              </div>
              <PaginationCustomized
                pageItemsSize={pageItemsSize}
                totalItems={count}
                pageNumber={pageNumber}
                setPageItemsSize={setPageItemsSize}
                setPageNumber={setPageNumber}
              />
            </div>
          ) : (
            <div>
              {filteredOrders.length === 0 && !isLoading ? (
                <NoResultFound message={t1("notFound")} />
              ) : (
                <NoResultFound message={t1("loading")} />
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
