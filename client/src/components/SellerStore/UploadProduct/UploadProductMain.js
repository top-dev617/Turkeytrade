import { trash } from "@/utils/datas/icons";
import React from "react";
import {
  useDeleteProductMutation,
  useGetDraftProductsByStoreQuery,
} from "@/redux/features/products/productApi";
import { useState } from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import UploadProduct from "../UploadProduct/UploadProduct";
import DrafProductRow from "./DrafProductRow";
import { useDispatch, useSelector } from "react-redux";
import { setEditProduct } from "@/redux/features/products/productSlice";
import Loading from "@/components/commons/Loading";
import { useEffect } from "react";
import Pagination from "@/utils/Pagination";

const UploadProductMain = ({ store, selectDrop }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetDraftProductsByStoreQuery(
    store?._id,
    currentPage
  );
  const [deleteProduct] = useDeleteProductMutation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const dispatch = useDispatch();

  const { editProduct } = useSelector((state) => state.product);

  const totalPages = data?.pagination?.totalPages;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (typeof currentPage !== "undefined") {
      const refetchWithNewPage = async () => {
        await refetch({ page: currentPage });
      };
      refetchWithNewPage();
    }
  }, [currentPage, store, refetch]);

  const handleSelect = (product) => {
    const isExist = selectedItems.find((p) => p._id === product._id);
    if (selectedItems.length > 0 && isExist) {
      const remaining = selectedItems.filter((p) => p?._id !== product?._id);
      setSelectedItems(remaining);
    }
    if (!isExist) {
      setSelectedItems([...selectedItems, product]);
    }
  };

  const handleDelete = async (items) => {
    setDeleteLoading(true);
    let ids = [];
    for (let i = 0; i < items.length; i++) {
      ids.push(items[i]?._id);
    }

    if (ids) {
      const options = {
        ids: ids,
      };
      const result = await deleteProduct(options);
      setDeleteLoading(false);
      if (result?.data?.status === true) {
        setSelectedItems([]);
        refetch();
        toast.success("Products deleted successfully");
      } else {
        toast.error("No products were deleted");
      }
    }
  };

  const handleOpenUpload = () => {
    dispatch(setEditProduct(null));
    setOpenUpload(!openUpload);
  };

  console.log(data);

  return (
    <div className="upload_product md:px-8">
      {selectDrop === "Upload New Product" || editProduct ? (
        <UploadProduct store={store} />
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            {data?.data?.length < 1 && (
              <div className="mt-6 flex justify-center items-center w-full">
                <span>No Data</span>
              </div>
            )}
            {isLoading && <Loading />}
            {data?.data?.length > 0 && (
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-2 text-sm font-bold text-center"
                  >
                    <div
                      onClick={() =>
                        setSelectedItems(
                          selectedItems?.length > 0 ? [] : data?.data
                        )
                      }
                      className="flex items-center"
                    >
                      <input
                        type="checkbox"
                        checked={
                          data?.data?.length === selectedItems?.length
                            ? true
                            : false
                        }
                        className="w-4 h-4 text-p bg-gray-100 border-gray-300 rounded focus:ring-pm cursor-pointer"
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 text-sm font-bold text-center"
                  >
                    <div className="w-8 text-red-600 mx-auto">
                      <Popover placement="bottom">
                        <PopoverHandler>
                          <div className="w-5 hover:text-pmd">{trash}</div>
                        </PopoverHandler>
                        <PopoverContent className="w-44">
                          <div className="max-w-[200px] text-center">
                            {selectedItems.length > 0 ? (
                              <div>
                                <p className="text-red-400">
                                  are you sure you want to delete this?
                                </p>
                                <Button
                                  onClick={() => handleDelete(selectedItems)}
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700 text-white mt-2"
                                >
                                  {deleteLoading ? <Spinner /> : "Delete"}
                                </Button>
                              </div>
                            ) : (
                              <p className="text-red-400">
                                Please Select Checkbox
                              </p>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 text-sm font-bold text-center"
                  >
                    Photo
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 text-sm font-bold text-center"
                  >
                    Product name
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 text-sm font-bold text-center"
                  >
                    Current Price
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 text-sm font-bold text-center"
                  >
                    MOQ
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 text-sm font-bold text-center"
                  >
                    Status
                  </th>
                </tr>
              </thead>
            )}
            <tbody>
              {data?.data?.map((product, index) => (
                <DrafProductRow
                  key={index}
                  product={product}
                  selectedItems={selectedItems}
                  setSelectedItems={handleSelect}
                  handleDelete={handleDelete}
                  deleteLoading={deleteLoading}
                />
              ))}
            </tbody>
          </table>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* 
            {
                !openUpload && !editProduct && <Button onClick={() => handleOpenUpload()}
                    className="w-full py-0 h-12 my-1 bg-pm hover:bg-pmd shadow-none">Add Product</Button>
            } */}
    </div>
  );
};

export default UploadProductMain;
