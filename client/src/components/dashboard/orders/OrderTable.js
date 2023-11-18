import React from "react";
import OrderTableRow from "./OrderTableRow";

const OrderTable = () => {
  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h1 className="mb-8 ml-5 text-2xl font-bold text-gray-900">
        Order Management
      </h1>
      <div className="mx-auto px-2">
        <div className="mt-4 w-full">
          <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
            <form
              onSubmit={handleSearch}
              className="relative flex w-full max-w-2xl items-center"
            >
              <svg
                className="absolute left-2 block h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8" className=""></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
              </svg>
              <input
                type="name"
                name="search"
                className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
                placeholder="Search by Order ID, Date, Customer"
              />
            </form>

            <button
              type="button"
              className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0"
            >
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              <svg
                className="mr-2 h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter
            </button>
          </div>
        </div>

        <table className="border-collapse border-spacing-y-2 border-spacing-x-2 max-w-full">
          <thead className="hidden border-b lg:table-header-group">
            <tr className="bg-pm text-white">
              <td className="py-1 label-list text-white">
                Order Date
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="float-right mt-1 h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </td>

              <td className="py-1 label-list text-white">Order ID</td>
              <td className="py-1 label-list text-white">Customer/Seller</td>
              <td className="py-1 label-list text-white">Price</td>
              <td className="py-1 label-list text-white">Order Details</td>
            </tr>
          </thead>

          <tbody className="bg-white lg:border-gray-300">
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
            <OrderTableRow />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderTable;
