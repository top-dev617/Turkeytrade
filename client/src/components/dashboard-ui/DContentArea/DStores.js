import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import { AuthContext } from "@/components/context/AuthContext";
import DStoreTableRow from "./DStoreTableRow";
import { base_url } from "@/utils/auth/global";

const DStores = () => {
  const { user } = useContext(AuthContext);
  const [selectType, setSelectType] = useState("Wallet");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [stores, setStores] = useState([]);

  const fetData = () => {
    fetch(`${base_url}/stores`)
      .then((res) => res.json())
      .then((data) => {
        setStores(data.data);
        // setCurrentPage(data.page);
        // setTotalPages(data.totalPages);
      });
  };

  console.log(stores);

  useEffect(() => {
    fetData();
  }, [currentPage, selectType, setSelectType]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Card className="h-full w-full shadow-none overflow-x-scroll">
      <table className="w-full text-left mt-4 ">
        <thead>
          <tr>
            <th className="bg-pm py-3 text-left text-white">
              <Typography
                variant="small"
                color="white"
                className="font-normal leading-none"
              >
                image
              </Typography>
            </th>
            <th className="bg-pm py-3 text-left text-white">
              <Typography
                variant="small"
                color="white"
                className="font-normal leading-none"
              >
                Name
              </Typography>
            </th>
            <th className="bg-pm py-3 text-left text-white">
              <Typography
                variant="small"
                color="white"
                className="font-normal leading-none"
              >
                Author
              </Typography>
            </th>

            <th className="bg-pm py-3 text-left text-white">
              <Typography
                variant="small"
                color="white"
                className="font-normal leading-none"
              >
                Status
              </Typography>
            </th>
            <th className="bg-pm py-3 text-left text-white">
              <Typography
                variant="small"
                color="white"
                className="font-normal leading-none"
              >
                Date
              </Typography>
            </th>
            <th className="bg-pm py-3 text-left text-white">
              <Typography
                variant="small"
                color="white"
                className="font-normal leading-none"
              >
                Action
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody className="px-0">
          {stores?.map((store, index) => (
            <DStoreTableRow key={index} data={store} refetch={fetData} />
          ))}
        </tbody>
      </table>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DStores;
