import React, { useRef, useState } from "react";
import question from "../../../../public/assets/que.png";
import plusIcon from "../../../../public/assets/plus-icon.png";
import star from "../../../../public/assets/star.png";
import videoIcon from "../../../../public/assets/vedio-icon.png";
import {
  useGetCategoriesQuery,
  usePatchProductMutation,
  usePostProductMutation,
} from "@/redux/features/products/productApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { units } from "@/utils/datas/unites";
import JoditEditor from "jodit-react";
import { useContext } from "react";
import { AuthContext } from "@/components/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setEditProduct } from "@/redux/features/products/productSlice";
import { Popover, PopoverHandler, Spinner } from "@material-tailwind/react";
import { getPluralUnit } from "@/utils/helpers/getPluralUnit";
import { useGetProductGroupByStoreIdQuery } from "@/redux/features/product-group/productGroupApi";
import AddGroup from "./AddGroup";

const remove = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-full h-full"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

const UploadProduct = ({ store }) => {
  const { editProduct } = useSelector((state) => state.product);
  const { uploadImg } = useContext(AuthContext);
  const { data } = useGetCategoriesQuery();
  const { data: productGroups } = useGetProductGroupByStoreIdQuery(store?._id);
  const [postProduct, { isLoading }] = usePostProductMutation();
  const [patchProduct] = usePatchProductMutation();

  const { handleSubmit, register, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);

  const dispatch = useDispatch();

  const editor = useRef(null);
  const [content, setContent] = useState(
    editProduct ? editProduct?.description : ""
  );

  const [video, setVideo] = useState(null);
  const videoInputRef = useRef();
  const keywordRef = useRef();
  const videoUrl = URL.createObjectURL(
    new Blob([video], { type: "application/octet-stream" })
  );

  const viewImg = (img) => {
    if (img instanceof File && img.type.startsWith("image/")) {
      return URL.createObjectURL(
        new Blob([img], { type: "application/octet-stream" })
      );
    } else {
      return img;
    }
  };

  const [category, setCategory] = useState(
    editProduct ? editProduct?.category?._id : data?.data[0]?._id
  );
  const [unit, setUnit] = useState(editProduct ? editProduct?.unit : "Piece");
  const [time, setTime] = useState(
    editProduct ? editProduct?.lead_time?.time : "days"
  );
  const [selectedCheckbox, setSelectedCheckbox] = useState(
    editProduct && editProduct?.price?.length > 1 ? "ladder" : "onePrice"
  );

  const [priceFields, setPriceFields] = useState(
    editProduct && editProduct?.price
      ? editProduct?.price
      : [{ quantity: { from: "", to: "" }, euro: "" }]
  );

  // useEffect(() => {
  //   if (editProduct && editProduct?.price) {
  //     setPriceFields(editProduct?.price);
  //   }
  // }, [editProduct]);

  // console.log(priceFields[0]["euro"]);

  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState(
    editProduct ? editProduct?.keyword : []
  );

  const handleAddKeyword = () => {
    if (keywordInput) {
      setKeywords((prevKeywords) => [...prevKeywords, keywordInput]);
      setKeywordInput("");
    }
    keywordRef.current.value = "";
  };

  const handleRemoveKeyword = (index) => {
    setKeywords((prevKeywords) => {
      const updatedKeywords = [...prevKeywords];
      updatedKeywords.splice(index, 1);
      return updatedKeywords;
    });
  };

  // product images
  const [productImages, setProductImages] = useState(
    editProduct ? editProduct?.images : []
  );

  const changeImage = (index, img) => {
    const data = [...productImages];
    data[index] = img;
    setProductImages(data);
  };

  const removeImage = (index) => {
    const data = [...productImages];
    data.splice(index, 1);
    setProductImages(data);
  };

  const editImageHandle = (index, img) => {
    if (productImages.length > 0 && index === 0) {
      changeImage(index, img);
    } else if (productImages.length < 1 && index === 0) {
      setProductImages([img]);
    }

    if (productImages.length > 1 && index === 1) {
      changeImage(index, img);
    } else if (productImages.length < 2 && index === 1) {
      setProductImages([...productImages, img]);
    }
    if (productImages.length > 2 && index === 2) {
      changeImage(index, img);
    } else if (productImages.length < 3 && index === 2) {
      setProductImages([...productImages, img]);
    }

    if (productImages.length > 3 && index === 3) {
      changeImage(index, img);
    } else if (productImages.length < 4 && index === 3) {
      setProductImages([...productImages, img]);
    }
    if (productImages.length > 4 && index === 4) {
      changeImage(index, img);
    } else if (productImages.length < 5 && index === 4) {
      setProductImages([...productImages, img]);
    }
    if (productImages.length > 5 && index === 5) {
      changeImage(index, img);
    } else if (productImages.length < 6 && index === 5) {
      setProductImages([...productImages, img]);
    }
  };
  // product images

  // --------- multi price ---------
  const addPriceFields = () => {
    let priceNewfield = { quantity: { from: "", to: "" }, euro: "" };
    setPriceFields([...priceFields, priceNewfield]);
  };

  const removePrice = (index) => {
    const data = [...priceFields];
    data.splice(index, 1);
    setPriceFields(data);
  };

  const changePrice = (index, event) => {
    setPriceFields((prevPriceFields) => {
      const data = JSON.parse(JSON.stringify(prevPriceFields));
      if (event.target.name === "from" || event.target.name === "to") {
        data[index].quantity[event.target.name] = event.target.value;
      } else {
        data[index][event.target.name] = event.target.value;
      }
      return data;
    });
  };

  // --------- multi price ---------
  const handleCheckboxChange = (checkboxId) => {
    if (checkboxId === "onePrice") {
      setPriceFields([{ quantity: { from: "", to: "" }, euro: "" }]);
      setSelectedCheckbox(checkboxId);
    } else {
      setSelectedCheckbox(checkboxId);
    }
  };

  const checkKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleAddProduct = async (data) => {
    if (!unit && !saveDraft) {
      toast.warning("Unit is Required");
      return;
    }
    if (!time && !saveDraft) {
      toast.warning("Lead Time is Required");
      return;
    }
    if (!keywords?.length && !saveDraft) {
      toast.warning("Please Add Keywords");
      return;
    }
    setLoading(true);
    if (saveDraft && !saveDraft) {
      setDraftLoading(true);
    }

    const imagesData = await uploadImg(productImages);
    const images = imagesData.filter(Boolean);

    if (!images.length && !saveDraft) {
      toast.warning("Image is Required");
      setLoading(false);
      return;
    }

    const productData = {
      title: data?.title,
      category: category,
      store: store?._id,
      images: images,
      price: data?.price,
      description: content,
      keyword: keywords,
      model: data?.model ? data?.model : "",
      group: data?.group,
      moq: data?.moq,
      unit: unit,
      lead_time: { from: data?.from, to: data?.to, time: time },
      price: priceFields,
    };

    console.log(productData);

    // -------------first part-------------
    if (editProduct && editProduct?._id) {
      setLoading(false);
      const options = {
        data: productData,
        id: editProduct?._id,
      };
      const result = await patchProduct(options);
      if (result?.data?.status === true) {
        toast.success("Product Update Successfully");
        reset();
        setKeywords([]);
        setProductImages([]);
        setPriceFields([{ quantity: { from: "", to: "" }, euro: "" }]);
        setLoading(false);
        dispatch(setEditProduct(null));
      } else {
        toast.error("Product Update unsuccessfully");
        setLoading(false);
      }
    } else {
      // -------------second part-------------

      if (saveDraft) {
        productData["status"] = "Draft";
        setDraftLoading(true);
      } else {
        productData["status"] = "Publish";
      }

      const options = {
        data: productData,
      };
      const result = await postProduct(options);
      console.log(result);
      setSaveDraft(false);
      setDraftLoading(false);
      if (result?.data?.status === true) {
        toast.success("Product Add Successfully");
        reset();
        setKeywords([]);
        setProductImages([]);
        setPriceFields([{ quantity: { from: "", to: "" }, euro: "" }]);
        setLoading(false);
      } else {
        toast.error("Product Add unsuccessfully");
        setLoading(false);
      }
    }
  };

  console.log(saveDraft);

  return (
    <div className="upload_product md:px-8">
      <div className="container">
        <form
          onKeyDown={checkKeyDown}
          onSubmit={handleSubmit(handleAddProduct)}
        >
          <div className="row">
            <div className="col-12 col-lg-6 ">
              <div>
                <label>
                  Product name <img src={question} alt="" />
                </label>
                <input
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="Product name"
                  defaultValue={editProduct?.title}
                />
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <div>
                <label>Product category</label>
                <select onClick={(e) => setCategory(e.target.value)}>
                  {data?.data.map((cate, i) => (
                    <option
                      key={i}
                      value={cate?._id}
                      selected={cate?._id === category}
                    >
                      {cate?.cate_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-12">
              <div>
                <label>
                  Keyword <img src={question} alt="" />
                </label>
                <div class="d-flex justify-items-center flex-wrap ">
                  {keywords?.map((keyword, index) => (
                    <div class="border d-flex me-2 mb-2" key={index}>
                      <span className="px-1">{keyword}</span>
                      <div
                        onClick={() => handleRemoveKeyword(index)}
                        className="px-2 ms-2 pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#E61C2B"
                          class="w-6 h-6"
                          width={20}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex">
                  <input
                    ref={keywordRef}
                    type="text"
                    placeholder="Enter a new task"
                    onChange={(e) => setKeywordInput(e.target.value)}
                    required={keywords?.length > 0 || saveDraft ? false : true}
                  />
                  <button
                    onClick={handleAddKeyword}
                    style={{ width: "100px" }}
                    className="add_btn pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <div>
                <label>Model</label>
                <input
                  {...register("model", { required: false })}
                  type="text"
                  placeholder="Model No "
                  defaultValue={editProduct?.model}
                />
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <div>
                <label>Product group </label>
                <div className="flex justify-between items-start h-full w-full gap-x-1">
                  <select
                    {...register("group", {
                      required: saveDraft ? false : true,
                    })}
                    required
                    className="w-full h-full flex-grow"
                  >
                    {productGroups?.data?.map((value, index) => (
                      <option
                        key={index}
                        selected={editProduct?.group === value?._id}
                        value={value?._id}
                      >
                        {value?.title}
                      </option>
                    ))}
                  </select>
                  <Popover placement="bottom">
                    <PopoverHandler>
                      <div className="rounded-xl w-32 h-14 mx-auto text-white cursor-pointer bg-pm flex justify-center items-center">
                        <span className="text-white">New Group</span>
                      </div>
                    </PopoverHandler>
                    <AddGroup
                      groups={productGroups?.data}
                      storeId={store?._id}
                    />
                  </Popover>
                </div>
              </div>
            </div>

            <div className="col-12 mb-4">
              <label>
                Product photos <span>(max 6 photos)</span>{" "}
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="w-full">
                  <div className="input_box relative">
                    <div className="input_inner">
                      {productImages?.length > 0 ? (
                        <img
                          className="w-100 h-100"
                          src={viewImg(productImages[0])}
                          alt=""
                        />
                      ) : (
                        <img className="" src={plusIcon.src} alt="" />
                      )}
                    </div>
                    <input
                      type="file"
                      name="image1"
                      required={
                        (editProduct && editProduct?.images?.length > 0) ||
                        saveDraft
                          ? false
                          : true
                      }
                      onChange={(e) => editImageHandle(0, e.target.files[0])}
                      className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0"
                    />
                  </div>
                  <p className="primary d-flex align-items-center justify-content-center gap-1">
                    {" "}
                    <img src={star.src} alt="" /> Primary
                  </p>
                </div>

                <div className="w-full">
                  <div className="input_box relative">
                    <div className="input_inner">
                      {productImages?.length > 1 ? (
                        <img
                          className="w-100 h-100"
                          src={viewImg(productImages[1])}
                          alt=""
                        />
                      ) : (
                        <img className="" src={plusIcon.src} alt="" />
                      )}
                    </div>
                    <input
                      type="file"
                      name="image2"
                      required={
                        (editProduct && editProduct?.images?.length > 1) ||
                        saveDraft
                          ? false
                          : true
                      }
                      onChange={(e) => editImageHandle(1, e.target.files[0])}
                      className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0"
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <p className="dot_btn">1</p>
                  </div>
                </div>

                <div className="w-full">
                  <div className="input_box relative">
                    <div className="input_inner">
                      {productImages?.length > 2 ? (
                        <img
                          className="w-100 h-100"
                          src={viewImg(productImages[2])}
                          alt=""
                        />
                      ) : (
                        <img className="" src={plusIcon.src} alt="" />
                      )}
                    </div>
                    <input
                      type="file"
                      name="image3"
                      required={
                        (editProduct && editProduct?.images?.length > 2) ||
                        saveDraft
                          ? false
                          : true
                      }
                      onChange={(e) => editImageHandle(2, e.target.files[0])}
                      className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0"
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    {" "}
                    <p className="dot_btn">2</p>
                  </div>
                </div>

                {productImages.filter(Boolean).length > 2 && (
                  <>
                    <div className="w-full">
                      <div className="input_box relative">
                        {productImages.length > 3 && (
                          <div
                            onClick={() => removeImage(3)}
                            className="absolute -top-2 -right-2 z-50 rounded-full bg-white text-red-600 p-1 w-8"
                          >
                            {remove}
                          </div>
                        )}
                        <div className="input_inner">
                          {productImages?.length > 3 ? (
                            <img
                              className="w-100 h-100"
                              src={viewImg(productImages[3])}
                              alt=""
                            />
                          ) : (
                            <img className="" src={plusIcon.src} alt="" />
                          )}
                        </div>
                        <input
                          type="file"
                          name="image4"
                          onChange={(e) =>
                            editImageHandle(3, e.target.files[0])
                          }
                          className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        {" "}
                        <p className="dot_btn">3</p>
                      </div>
                    </div>
                  </>
                )}
                {productImages.filter(Boolean).length > 3 && (
                  <>
                    <div className="w-full">
                      <div className="input_box relative">
                        {productImages.length > 4 && (
                          <div
                            onClick={() => removeImage(4)}
                            className="absolute -top-2 -right-2 z-50 rounded-full bg-white text-red-600 p-1 w-8"
                          >
                            {remove}
                          </div>
                        )}
                        <div className="input_inner">
                          {productImages?.length > 4 ? (
                            <img
                              className="w-100 h-100"
                              src={viewImg(productImages[4])}
                              alt=""
                            />
                          ) : (
                            <img className="" src={plusIcon.src} alt="" />
                          )}
                        </div>
                        <input
                          type="file"
                          name="image5"
                          onChange={(e) =>
                            editImageHandle(4, e.target.files[0])
                          }
                          className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        {" "}
                        <p className="dot_btn">4</p>
                      </div>
                    </div>
                  </>
                )}
                {productImages.filter(Boolean).length > 4 && (
                  <>
                    <div className="w-full">
                      <div className="input_box relative">
                        {productImages.length > 5 && (
                          <div
                            onClick={() => removeImage(5)}
                            className="cursor-pointer absolute -top-2 -right-2 z-50 rounded-full bg-white text-red-600 p-1 w-8"
                          >
                            {remove}
                          </div>
                        )}
                        <div className="input_inner">
                          {productImages?.length > 5 ? (
                            <img
                              className="w-100 h-100"
                              src={viewImg(productImages[5])}
                              alt=""
                            />
                          ) : (
                            <img className="" src={plusIcon.src} alt="" />
                          )}
                        </div>
                        <input
                          type="file"
                          name="image6"
                          onChange={(e) =>
                            editImageHandle(5, e.target.files[0])
                          }
                          className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        {" "}
                        <p className="dot_btn">5</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="col-12 mb-5">
              <label>Upload Product video</label>
              <div
                className="input_box"
                onClick={(e) => videoInputRef?.current?.click()}
              >
                <div className="input_inner">
                  {video ? (
                    <video controls loop autoPlay muted className="w-100 h-100">
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <>
                      <img src={videoIcon.src} alt="" />
                      <p>Drop your video here or browse</p>
                    </>
                  )}
                </div>

                <input
                  type="file"
                  name="video"
                  className="d-none"
                  accept="video/mp4,video/x-m4v,video/*"
                  ref={videoInputRef}
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <div>
                <label>Unit </label>
                <select onChange={(e) => setUnit(e.target.value)} required>
                  {units.map((value, index) => (
                    <option
                      key={index}
                      selected={value.singular === unit}
                      value={value.singular}
                    >
                      {value.singular}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <div>
                <label>
                  MOQ <img src={question} alt="" />
                </label>
                <input
                  {...register("moq", { required: saveDraft ? false : true })}
                  type="text"
                  placeholder="MOQ "
                  defaultValue={editProduct?.moq}
                />
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <label>FOB-price</label>
              <div className="d-flex align-items-center gap-5 mb-5">
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="checkbox"
                    checked={selectedCheckbox === "ladder"}
                    onChange={() => handleCheckboxChange("ladder")}
                  />
                  <span>Ladder price</span>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="checkbox"
                    checked={selectedCheckbox === "onePrice"}
                    onChange={() => handleCheckboxChange("onePrice")}
                  />
                  <span>One price </span>
                </div>
              </div>

              <div style={{ maxWidth: "1000px" }}>
                {priceFields?.map((input, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="d-flex flex-col md:flex-row align-items-center gap-5 mb-3 w-full"
                      >
                        <div className="flex flex-col-reverse items-start md:flex-row gap-2 md:items-center">
                          <input
                            className="mb-0 md:min-w-[120px] w-full"
                            type="number"
                            min={0}
                            name="from"
                            placeholder="From"
                            defaultValue={input?.quantity?.from}
                            required={saveDraft ? false : true}
                            onChange={(event) => changePrice(index, event)}
                          />
                          <span>-</span>
                          <input
                            className="mb-0 md:min-w-[120px] w-full"
                            type="number"
                            min={0}
                            name="to"
                            placeholder="To"
                            defaultValue={input?.quantity?.to}
                            required={saveDraft ? false : true}
                            onChange={(event) => changePrice(index, event)}
                          />
                          <span className="lowerCase">
                            {getPluralUnit(unit)}
                          </span>
                        </div>
                        <div className="flex flex-col-reverse items-start md:flex-row gap-2 md:items-center">
                          <input
                            className="mb-0 md:min-w-[120px] w-full"
                            type="number"
                            min={0}
                            name="euro"
                            placeholder="Euro"
                            defaultValue={input.euro}
                            required={saveDraft ? false : true}
                            onChange={(event) => changePrice(index, event)}
                          />
                          <div className="d-flex gap-2 align-items-center">
                            <span
                              className="lowercase"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              euro/ {unit}{" "}
                            </span>
                            {priceFields?.length > 1 && (
                              <div
                                onClick={() => removePrice(index)}
                                className="w-5 text-red-600 hover:text-pmd cursor-pointer"
                              >
                                {remove}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                {selectedCheckbox === "ladder" && (
                  <div
                    onClick={addPriceFields}
                    className="add_btn cursor-pointer flex justify-center items-center"
                  >
                    Add more
                  </div>
                )}
              </div>

              <div>
                <label>
                  Lead time <img src={question} alt="" />
                </label>
                <div className="d-flex flex-wrap items-start md:items-center gap-4 mb-5">
                  <div className="d-flex gap-4 align-items-center">
                    <input
                      {...register("from", {
                        required: saveDraft ? false : true,
                      })}
                      id="special"
                      name="from"
                      className="mb-0"
                      type="number"
                      placeholder="From"
                      min={0}
                      defaultValue={editProduct?.lead_time?.from}
                    />
                    <span> -</span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 align-items-center">
                    <input
                      {...register("to", {
                        required: saveDraft ? false : true,
                      })}
                      id="special"
                      name="to"
                      className="mb-0"
                      type="number"
                      min={1}
                      placeholder="To"
                      defaultValue={editProduct?.lead_time?.to}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 align-items-center w-full md:w-fit">
                    <select
                      onChange={(e) => setTime(e.target.value)}
                      className="mb-0 w-full"
                    >
                      {["days", "weeks"].map((value, index) => (
                        <option
                          key={index}
                          value={value}
                          selected={value === time}
                        >
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <br />

            <div className="col-12 mb-5 pb-3">
              <div>
                <label>
                  Product details{" "}
                  <span>(Write a detailed description of your product)</span>{" "}
                </label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  onBlur={(newContent) => setContent(newContent)}
                  className="min-h-[400px]"
                />
              </div>
            </div>

            <div className="d-flex gap-2 justify-content-between align-items-center">
              <button
                onClick={() => setSaveDraft(false)}
                disabled={loading && !saveDraft}
                className="submit_btn hover:bg-pmd duration-150 flex justify-center items-center"
              >
                {loading && !saveDraft ? (
                  <Spinner />
                ) : (
                  <> {editProduct?._id ? "Update" : "Submit"}</>
                )}
              </button>
              {!editProduct && (
                <button
                  onClick={() => setSaveDraft(true)}
                  className="save_btn flex justify-center items-center hover:bg-gray-400"
                >
                  {draftLoading ? <Spinner /> : "Save as Draft"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
