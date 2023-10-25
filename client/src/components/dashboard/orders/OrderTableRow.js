import React from "react";

const OrderTableRow = () => {
  return (
    <tr className="">
      <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-900 font-bold sm:px-3 lg:text-left">
        07 February, 2022
        <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Jane Doeson
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            Desktop Computer
          </div>
          <div className="">24 x 10 x 5 cm</div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
            1 Kg
          </div>
        </div>
      </td>

      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
        62345231143
      </td>

      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
        Desktop Computer
      </td>

      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
        <img
          className="h-8 w-8 overflow-hidden rounded-full border p-1"
          src="data:image/png;base64,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"
          alt=""
        />
      </td>
      <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
        Jane Doeson
      </td>
      <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
        24 x 10 x 5 cm
      </td>
      <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
        1.0 Kg
      </td>
      <td className="whitespace-no-wrap py-4 text-right text-sm text-red-600 font-bold sm:px-3 lg:text-left">
        € 59.00
        <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-center text-xs text-purple-800 lg:hidden">
          Action Required
        </span>
      </td>

      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
        <span className="ml-2 mr-3 whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-purple-800">
          Action Required
        </span>
      </td>
    </tr>
  );
};

export default OrderTableRow;
