import { trash } from "@/utils/datas/icons";
import React from "react";
import EditProductRow from "./EditProductRow";
import {
  useDeleteProductMutation,
  useGetProductsByStoreQuery,
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
import empty from "../../../../public/assets/empty_product.png";
import { useSelector } from "react-redux";
import UploadProduct from "../UploadProduct/UploadProduct";
import Loading from "@/components/commons/Loading";

const EditProduct = ({ store }) => {
  const { data, isLoading, isError, refetch } = useGetProductsByStoreQuery(
    store?._id
  );
  const [deleteProduct] = useDeleteProductMutation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { editProduct } = useSelector((state) => state.product);

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

  return (
    <div className="upload_product md:px-8">
      {editProduct?._id ? (
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
                          <div className="w-5 hover:text-pmd cursor-pointer">
                            {trash}
                          </div>
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
                <EditProductRow
                  key={index}
                  product={product}
                  selectedItems={selectedItems}
                  setSelectedItems={handleSelect}
                  handleDelete={handleDelete}
                  deleteLoading={deleteLoading}
                  fillRule="evenodd"
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
