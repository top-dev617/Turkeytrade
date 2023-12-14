import { usePatchProductMutation } from "@/redux/features/products/productApi";
import { setEditProduct } from "@/redux/features/products/productSlice";
import { base_url } from "@/utils/auth/global";
import { trash } from "@/utils/datas/icons";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const DrafProductRow = ({
  product,
  selectedItems,
  setSelectedItems,
  handleDelete,
  deleteLoading,
}) => {
  const [patchProduct, { isLoading }] = usePatchProductMutation();
  const dispatch = useDispatch();
  const isExist = selectedItems.find((p) => p._id === product._id);
  const [statusChange, setStatusChange] = useState("");
  const [productDelete, setProductDelete] = useState("");

  const updateStatus = async () => {
    const status = {
      status: product?.status === "Publish" ? "Draft" : "Publish",
    };
    const options = {
      data: { productData: JSON.stringify(status) },
      id: product?._id,
    };
    await patchProduct(options);
  };

  const isFulfilled =
    (product?.title &&
      product?.category &&
      product?.sub_category &&
      product?.images?.length > 0 &&
      product?.price?.ladder_price[0]?.euro &&
      product?.price?.ladder_price[0]?.quantity?.from &&
      product?.price?.ladder_price[0]?.quantity?.to) ||
    (product?.price?.one_price?.from &&
      product?.price?.one_price?.to &&
      product?.keyword &&
      product?.moq &&
      product?.lead_time &&
      product?.lead_time.from);

  return (
    <tr className="bg-white border-b hover:bg-pm hover:bg-opacity-50">
      <td className="w-4 px-2 text-center">
        <div
          onClick={() => setSelectedItems(product)}
          className="flex items-center"
        >
          <input
            type="checkbox"
            checked={isExist && isExist?._id ? true : false}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-pm cursor-pointer"
          />
        </div>
      </td>
      <th
        scope="row"
        className="px-2 text-center font-medium text-gray-900 whitespace-nowrap"
      >
        <div className="flex justify-center items-center gap-4">
          <h1
            onClick={() => dispatch(setEditProduct(product))}
            className="text-sm hover:text-pmd cursor-pointer"
          >
            Edit
          </h1>

          <Popover
            open={productDelete === product?._id}
            handler={() => setProductDelete("")}
            placement="bottom"
          >
            <PopoverHandler
              onClick={() =>
                setProductDelete(productDelete ? "" : product?._id)
              }
            >
              <div className="w-5 hover:text-pmd cursor-pointer">{trash}</div>
            </PopoverHandler>
            <PopoverContent className="w-44">
              <div className="max-w-[200px] text-center">
                <Button
                  onClick={() => handleDelete([product])}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white mt-2"
                >
                  {deleteLoading ? <Spinner /> : "Delete"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </th>
      <td className="px-2 text-center">
        {product?.images?.length > 0 ? (
          <img
            className="w-20 h-16 mx-auto"
            loading="lazy"
            src={`${base_url}/uploads/${product?.images[0]}`}
          />
        ) : (
          <p>-</p>
        )}
      </td>
      <td className="px-2 text-center">
        <div className="max-w-[300px] whitespace-normal break-words mx-auto">
          {product?.title}
        </div>
      </td>
      <td className="px-2 text-center">
        <div className="max-h-[250px] w-fit overflow-y-auto grid grid-cols-1 mx-auto">
          {product?.price ? (
            <>
              {product?.price?.price_type === "ladder_price" ? (
                <>
                  {product?.price?.ladder_price[0]?.euro ||
                  product?.price?.ladder_price[0]?.quantity?.from ||
                  product?.price?.ladder_price[0]?.quantity?.to ? (
                    <div className="max-h-[250px] w-fit overflow-y-auto grid grid-cols-1 mx-auto">
                      {product?.price?.ladder_price?.map(
                        ({ euro, quantity }) => (
                          <p className="font-bold text-black text-start">
                            € {euro} - ({quantity?.from} - {quantity?.to}) /{" "}
                            <span className="text-black">
                              {product?.unit?.plural}
                            </span>
                          </p>
                        )
                      )}
                    </div>
                  ) : (
                    <p>-</p>
                  )}
                </>
              ) : (
                <>
                  {product?.price?.one_price?.from ||
                  product?.price?.one_price?.to ? (
                    <p className="font-bold text-black text-center">
                      € ({product?.price?.one_price?.from} -{" "}
                      {product?.price?.one_price?.to})
                      <span className="text-black">
                        {" "}
                        euro/
                        {product?.unit?.singular.toLowerCase()}
                      </span>
                    </p>
                  ) : (
                    <p>-</p>
                  )}
                </>
              )}
            </>
          ) : (
            <p>-</p>
          )}
        </div>
      </td>
      <td className="px-2 text-center">
        {product?.moq ? (
          <>
            {product?.moq > 1
              ? `${product?.moq} ${product?.unit?.plural}`
              : `${product?.moq} ${product?.unit.singular}`}{" "}
            (MOQ)
          </>
        ) : (
          <p>-</p>
        )}
      </td>
      <td className="px-2 text-center">
        <Popover
          open={statusChange === product?._id}
          handler={() => setStatusChange("")}
          placement="bottom"
        >
          <PopoverHandler
            onClick={() => setStatusChange(statusChange ? "" : product?._id)}
          >
            <Button
              disabled={isFulfilled ? false : true}
              className="hover:text-pmd bg-pm py-2 rounded text-center"
            >
              {product.status}
            </Button>
          </PopoverHandler>
          <PopoverContent className="w-44 mx-auto">
            <div className="max-w-[200px] mx-auto text-center">
              <Button
                onClick={() => updateStatus()}
                disabled={isLoading}
                className="w-full rounded bg-pm hover:bg-pmd flex justify-center items-center"
              >
                {isLoading ? (
                  <Spinner className="text-white" />
                ) : (
                  `${product?.status === "Publish" ? "Draft" : "Publish"}`
                )}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
};

export default DrafProductRow;
