import React, { useState } from "react";
import sms from "../../../public/assets/smsicon.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setSaveProducts } from "@/redux/features/products/productSlice";
import { toast } from "react-toastify";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { usePostNewChatMutation } from "@/redux/features/conversation/conversationApi";
import { star } from "@/utils/icons/icons";
import { useRouter } from "next/router";
import { getPluralUnit } from "@/utils/helpers/getPluralUnit";
import {
  setChatId,
  setReceiverData,
} from "@/redux/features/conversation/conversationSlice";

const ProductBanner = ({ product }) => {
  const { user, msgOpen, setMsgOpen } = useContext(AuthContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const { saveProducts } = useSelector((state) => state.product);
  const [postNewChat] = usePostNewChatMutation();

  const handleSaveProduct = () => {
    const products = localStorage.getItem("save-products") || [];

    let oldProducts = [];
    if (products.length) {
      oldProducts = JSON.parse(products);
    }

    const isExit = oldProducts.find((pro) => pro?._id === product?._id);
    if (isExit) {
      const allProducts = oldProducts.filter(
        (pro) => pro?._id !== product?._id
      );
      localStorage.setItem("save-products", JSON.stringify(allProducts));
      dispatch(setSaveProducts(allProducts));
      toast.success("Save Product Removed");
    } else {
      localStorage.setItem(
        "save-products",
        JSON.stringify([...oldProducts, product])
      );
      const newProducts =
        JSON.parse(localStorage.getItem("save-products")) || [];
      dispatch(setSaveProducts(newProducts));
      toast.success("Product Save Successful");
    }
  };

  const images = product.images.map((img) => ({
    src: `${img}`,
  }));

  const handleChat = async () => {
    if (!user?._id) {
      router.push("/signin");
      return;
    }
    const chatData = {
      memberOne: {
        member_type: "Store",
        id: product?.store?._id,
      },
      memberTwo: {
        member_type: "User",
        id: user?._id,
      },
    };
    const options = {
      data: chatData,
    };

    const result = await postNewChat(options);
    if (result?.data?.access) {
      dispatch(setChatId(result?.data?.data?._id));
      dispatch(setReceiverData(product?.store));
      setMsgOpen(true);
    }
  };

  const isSaved = saveProducts.find((p) => p?._id === product?._id);
  return (
    <div className="product_banner p-2 mt-8">
      <div className="product_inner md:p-10">
        <div className="row  mb-5">
          <div className="col-12 col-lg-6 mb-4">
            <Carousel
              images={images}
              playIcon={false}
              className="bg-transparent object-contain"
            />
          </div>

          <div className="col-12 col-lg-6">
            {product?.title?.length > 50 ? (
              <h4>{product?.title?.slice(0, 50)}...</h4>
            ) : (
              <h4>{product?.title}</h4>
            )}
            <h4></h4>
            {product?.price?.price_type === "ladder_price" ? (
              <div className="flex justify-start flex-wrap md:gap-10">
                {product?.price?.ladder_price?.length > 0 &&
                  product?.price?.ladder_price?.map(({ quantity, euro }, i) => (
                    <div className="flex flex-col gap-1">
                      <h1 className="text-gray-700 font-thin">
                        {quantity?.from} - {quantity?.to}{" "}
                        {product?.unit?.plural}
                      </h1>
                      <h1 className="font-bold text-black text-2xl">
                        € {euro}
                      </h1>
                    </div>
                  ))}
              </div>
            ) : (
              <h1 className="label-list">
                <span className="!text-3xl !font-bold">
                  {product?.price?.one_price?.from} -{" "}
                  {product?.price?.one_price?.to}
                </span>{" "}
                euro/
                {product?.unit?.singular.toLowerCase()}
              </h1>
            )}
            <br />
            <div className="d-flex gap-3">
              <div>
                <p>Seller </p>
                <p>MOQ </p>
                {product?.model && <p>Model </p>}
                <p>Lead time </p>
              </div>
              <div>
                <p>:</p>
                <p>:</p>

                {product?.model && <p>:</p>}
                <p>:</p>
              </div>
              <div>
                <Link
                  style={{ marginBottom: "18px" }}
                  href={`/store/${product.store._id}`}
                  className="text-pm hover:text-pmd fw-bold text-decoration-none d-block"
                >
                  {product?.store?.store_name}{" "}
                </Link>
                <p style={{ fontWeight: "400" }}>
                  {product?.moq > 1
                    ? `${product?.moq} ${product?.unit?.plural}`
                    : `${product?.moq} ${product?.unit.singular}`}
                </p>

                {product?.model && (
                  <p style={{ fontWeight: "400" }}>{product?.model}</p>
                )}
                <p style={{ fontWeight: "400" }}>
                  {product?.lead_time?.from} - {product?.lead_time?.to}{" "}
                  {product?.lead_time?.time}
                </p>
              </div>
            </div>
            <div className="d-flex gap-4 justify-content-between align-items-center">
              <button
                onClick={() => handleChat()}
                className="submit_btn flex items-center gap-2"
              >
                <img src={sms.src} alt="" /> Contact Seller
              </button>

              <button
                onClick={() => handleSaveProduct(product)}
                className={`savePro_btn border-[1px] ${
                  isSaved
                    ? "bg-yellow-900 text-white border-yellow-900"
                    : "bg-white text-pm border-pm"
                }`}
              >
                <div className="w-8"> {star}</div>
                {isSaved ? "Remove Product" : "Save product"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
