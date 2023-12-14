import { usePatchProductMutation } from "@/redux/features/products/productApi";
import { setEditProduct } from "@/redux/features/products/productSlice";
import { base_url } from "@/utils/auth/global";
import { trash } from "@/utils/datas/icons";
import { getPluralUnit } from "@/utils/helpers/getPluralUnit";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const EditProductRow = ({
  index,
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

  return (
    <tr
      key={index}
      className="bg-white border-b hover:bg-pm hover:bg-opacity-50"
    >
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
        <div className="flex justify-center items-center gap-4 ">
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
              <div className="w-5 text-red-600 hover:text-pmd cursor-pointer">
                {trash}
              </div>
            </PopoverHandler>
            <PopoverContent className="w-44">
              <div className="max-w-[200px] text-center">
                <div>
                  <p className="text-red-400">
                    are you sure you want to delete this?
                  </p>
                  <Button
                    onClick={() => handleDelete([product])}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white mt-2"
                  >
                    {deleteLoading ? <Spinner /> : "Delete"}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </th>
      <td className="px-2 text-center">
        <img
          className="w-20 h-16 mx-auto"
          loading="lazy"
          src={`${base_url}/uploads/${product?.images[0]}`}
        />
      </td>
      <td className="px-2 text-center">
        <div className="max-w-[300px] whitespace-normal break-words mx-auto">
          {product?.title}
        </div>
      </td>
      <td className="px-2 text-center">
        {product?.price?.price_type === "ladder_price" ? (
          <div className="max-h-[250px] w-fit overflow-y-auto grid grid-cols-1 mx-auto">
            {product?.price?.ladder_price?.length > 0 &&
              product?.price?.ladder_price?.map(({ euro, quantity }) => (
                <p className="font-bold text-black text-start">
                  € {euro} - ({quantity?.from} - {quantity?.to}) /{" "}
                  <span className="text-black">{product?.unit?.plural}</span>
                </p>
              ))}
          </div>
        ) : (
          <p className="font-bold text-black text-center">
            € ({product?.price?.one_price?.from} -{" "}
            {product?.price?.one_price?.to})
            <span className="text-black">
              {" "}
              euro/
              {product?.unit?.singular.toLowerCase()}
            </span>
          </p>
        )}
      </td>
      <td className="px-2 text-center">
        {product?.moq > 1
          ? `${product?.moq} ${product?.unit?.plural}`
          : `${product?.moq} ${product?.unit.singular}`}{" "}
        (MOQ)
      </td>
      {/* <td className="px-2 text-center">
        <Popover
          open={statusChange === product?._id}
          placement="bottom"
          handler={() => setStatusChange("")}
        >
          <PopoverHandler
            onClick={() => setStatusChange(statusChange ? "" : product?._id)}
          >
            <Button className="hover:text-pmd bg-pm py-2 rounded text-center">
              {product?.status === "Publish" ? "Published" : "Draft"}
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
      </td> */}
    </tr>
  );
};

export default EditProductRow;
