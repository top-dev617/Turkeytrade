import { usePatchProductMutation } from "@/redux/features/products/productApi";
import { setEditProduct } from "@/redux/features/products/productSlice";
import { trash } from "@/utils/datas/icons";
import { getPluralUnit } from "@/utils/helpers/getPluralUnit";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
} from "@material-tailwind/react";
import React from "react";
import { useDispatch } from "react-redux";

const EditProductRow = ({
  product,
  selectedItems,
  setSelectedItems,
  handleDelete,
  deleteLoading,
}) => {
  const [patchProduct, { isLoading }] = usePatchProductMutation();
  const dispatch = useDispatch();
  const isExist = selectedItems.find((p) => p._id === product._id);

  const updateStatus = async () => {
    const options = {
      data: { status: product?.status === "Publish" ? "Draft" : "Publish" },
      id: product?._id,
    };
    await patchProduct(options);
  };
  return (
    <tr class="bg-white border-b hover:bg-pm hover:bg-opacity-50">
      <td class="w-4 px-2 text-center">
        <div
          onClick={() => setSelectedItems(product)}
          class="flex items-center"
        >
          <input
            type="checkbox"
            checked={isExist && isExist?._id ? true : false}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-pm cursor-pointer"
          />
        </div>
      </td>
      <th
        scope="row"
        class="px-2 text-center font-medium text-gray-900 whitespace-nowrap"
      >
        <div className="flex justify-center items-center gap-4 cursor-pointer">
          <h1
            onClick={() => dispatch(setEditProduct(product))}
            className="text-sm hover:text-pmd"
          >
            Edit
          </h1>
          <Popover placement="bottom">
            <PopoverHandler>
              <div className="w-5 text-red-600 hover:text-pmd">{trash}</div>
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
      <td class="px-2 text-center">
        <img className="w-20 mx-auto" loading="lazy" src={product?.images[0]} />
      </td>
      <td class="px-2 text-center">
        <div className="max-w-[300px] whitespace-normal break-words mx-auto">
          {product?.title}
        </div>
      </td>
      <td class="px-2 text-center">
        <div className="max-h-[250px] w-fit overflow-y-auto grid grid-cols-1 mx-auto">
          {product?.price?.length > 0 &&
            product?.price?.map(({ euro, quantity }) => (
              <p className="font-bold text-black text-start">
                € {euro} - ({quantity?.from} - {quantity?.to}) /{" "}
                <span className="text-black">
                  {getPluralUnit(product?.unit)}
                </span>
              </p>
            ))}
        </div>
      </td>
      <td class="px-2 text-center">
        {product?.moq} {getPluralUnit(product?.unit)} (MOQ)
      </td>
      <td class="px-2 text-center">
        <Popover placement="bottom">
          <PopoverHandler>
            <Button className="hover:text-pmd bg-pm py-2 rounded text-center">
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

export default EditProductRow;
