import React from "react";
import sms from "../../../public/assets/smsicon.png";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { usePostNewChatMutation } from "@/redux/features/conversation/conversationApi";
import { star } from "@/utils/icons/icons";
import { useRouter } from "next/router";
import {
  setChat,
  setChats,
  setNewChat,
} from "@/redux/features/conversation/conversationSlice";
import {
  useCreateSaveProductMutation,
  useGetSingleSaveProductByIdQuery,
  useRemoveSaveProductMutation,
} from "@/redux/features/products/productApi";
import { Spinner } from "@material-tailwind/react";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";
import { base_url } from "@/utils/auth/global";
import { SocketContext } from "../context/SocketContext";

const ProductBanner = ({ product }) => {
  const { user, setMsgOpen } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { data: store, isLoading: storeLoading } =
    useGetStoreInfoBySellerIdQuery(user?._id);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [createSaveProduct, { isLoading }] = useCreateSaveProductMutation();
  const [removeSaveProduct, { isLoading: isRemoveLoading }] =
    useRemoveSaveProductMutation();
  const { data, refetch } = useGetSingleSaveProductByIdQuery(id);
  const [postNewChat] = usePostNewChatMutation();

  const handleSaveProduct = async (id) => {
    if (data?.data) {
      const options = { id: id };
      const result = await removeSaveProduct(options);
      if (result?.data?.success) {
        refetch();
        toast.success("Product Remove Successfully");
      } else {
        toast.error("Product Remove Unsuccessfully");
      }
    } else {
      const options = { data: { product: id } };
      const result = await createSaveProduct(options);
      if (result?.data?.success) {
        refetch();
        toast.success("Product Saved Successfully");
      } else {
        toast.error("Product Saved Unsuccessfully");
      }
    }
  };

  const images =
    product?.images?.length > 0
      ? product?.images?.map((img) => ({
          src: `${base_url}/uploads/${img}`,
        }))
      : [];

  const handleChat = async () => {
    if (!user?._id) {
      router.push("/signin");
      return;
    }
    if (user?._id !== product?.store?.user) {
      const chatData = {
        members: [product?.store?.user, user?._id],
        requester: user?._id,
        receiver: product?.store?.user,
      };
      const options = {
        data: chatData,
      };

      const result = await postNewChat(options);
      // console.log(result);
      if (result?.data?.access) {
        dispatch(setChat(result?.data?.data));
        dispatch(setChats(result?.data?.data));
        if (result?.data?.receiver_Chat) {
          dispatch(setNewChat(result?.data?.data));
          socket.current.emit("addChat", {
            ...result?.data?.receiver_Chat,
            rcId: result?.data?.data?.receiverInfo?._id,
          });
        }
        setMsgOpen(true);
      }
    }
  };

  // console.log(product);

  return (
    <div className="product_banner md:p-2 md:mt-8">
      <div className="product_inner p-2 md:!p-10">
        <div className="row  mb-5">
          <div className="col-12 col-lg-6 mb-4">
            <Carousel
              images={images}
              playIcon={false}
              className="bg-transparent object-contain max-h-[500px] mx-auto"
            />
          </div>

          <div className="col-12 col-lg-6">
            <h5 className="break-all">{product?.title}</h5>
            {product?.price?.price_type === "ladder_price" ? (
              <div className="flex justify-start flex-wrap md:gap-10">
                {product?.price?.ladder_price?.length > 0 &&
                  product?.price?.ladder_price?.map(({ quantity, euro }, i) => (
                    <div className="flex flex-col gap-1">
                      <h1 className="text-gray-800 font-semibold font-inter">
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
              <>
                {parseInt(product?.price?.one_price?.from) ===
                parseInt(product?.price?.one_price?.to) ? (
                  <h1 className="label-list">
                    <span className="!text-3xl !font-bold">
                      {product?.price?.one_price?.from}
                    </span>{" "}
                    euro/
                    {product?.unit?.singular.toLowerCase()}
                  </h1>
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
              </>
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
                  href={`/store/${product?.store?._id}`}
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
            {!storeLoading && (
              <>
                {product?.store?._id !== store?.data?._id && (
                  <div className="d-flex gap-4 justify-content-between align-items-center">
                    <button
                      onClick={() => handleChat()}
                      className="submit_btn flex items-center gap-2 !text-sm md:!text-[18px]"
                    >
                      <img src={sms.src} alt="" /> Contact
                      <h6 className="hidden md:block">Seller</h6>
                    </button>

                    <button
                      onClick={() => handleSaveProduct(product?._id)}
                      disabled={isLoading || isRemoveLoading}
                      className={`savePro_btn border-[1px] !text-sm md:!text-[18px] ${
                        data?.data
                          ? "bg-yellow-900 text-white border-yellow-900"
                          : "bg-white text-pm border-pm"
                      }`}
                    >
                      <div className="w-8"> {star}</div>
                      {isLoading || isRemoveLoading ? (
                        <Spinner color="white" />
                      ) : (
                        <>
                          {data?.data ? (
                            <h1>
                              Remove{" "}
                              <h6 className="hidden md:inline-block">
                                Product
                              </h6>
                            </h1>
                          ) : (
                            <h1>
                              Save{" "}
                              <h6 className="hidden md:inline-block">
                                Product
                              </h6>
                            </h1>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
