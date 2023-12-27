import React, { useCallback, useRef, useState } from "react";
import question from "../../../../public/assets/que.png";
import plusIcon from "../../../../public/assets/plus-icon.png";
import star from "../../../../public/assets/star.png";
import videoIcon from "../../../../public/assets/vedio-icon.png";
import {
  useGetCategoriesQuery,
  usePatchProductMutation,
  usePostProductMutation,
} from "@/redux/features/products/productApi";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { units } from "@/utils/datas/unites";
import { useDispatch, useSelector } from "react-redux";
import { setEditProduct } from "@/redux/features/products/productSlice";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
  Tooltip,
} from "@material-tailwind/react";
import { useGetProductGroupByStoreIdQuery } from "@/redux/features/product-group/productGroupApi";
import AddGroup from "./AddGroup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { base_url } from "@/utils/auth/global";
import VideoPlayer from "@/components/commons/video-player/VideoPlayer";
import { iInfo, trash } from "@/utils/datas/icons";
import { useEffect } from "react";
import { RotatingSquare } from "react-loader-spinner";
import useInputPattern from "@/lib/hooks/useInputPattern";
import InputLabelTooltip from "@/components/commons/tooltip/InputLabelTooltip";
import { labelInfo } from "@/utils/datas/inputLabelInfo";
import ProductVideoInput from "./ProductVideoInput";
import { useDropzone } from "react-dropzone";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
  "video",
];

const UploadProduct = ({ store }) => {
  const { editProduct } = useSelector((state) => state.product);
  const { data, isLoading: categoryLoading } = useGetCategoriesQuery();
  const { data: productGroups } = useGetProductGroupByStoreIdQuery(store?._id);
  const [postProduct] = usePostProductMutation();
  const [patchProduct] = usePatchProductMutation();

  // hooks
  const { handleNumber, handleNumberAndComma } = useInputPattern();

  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);

  // errors states
  const [categoryError, setCategoryError] = useState(false);
  const [subCategoryError, setSubCategoryError] = useState(false);
  const [keywordsError, setKeywordsError] = useState(false);
  const [productImageError, setProductImageError] = useState(false);
  const [unitError, setUnitError] = useState(false);

  // loader states
  const [isDataLoading, setIsDataLoading] = useState(true);

  // use refs
  const unitRef = useRef();
  const customCateRef = useRef();
  const mainCateRef = useRef();
  const subCateRef = useRef();

  const dispatch = useDispatch();
  const [content, setContent] = useState(
    editProduct ? editProduct?.description : ""
  );
  const videoRef = useRef();
  const descriptionRef = useRef();
  const [descriptionError, setDescriptionError] = useState(false);

  const [video, setVideo] = useState(null);
  const keywordRef = useRef();

  const viewFile = (file) => {
    return URL.createObjectURL(
      new Blob([file], { type: "application/octet-stream" })
    );
  };

  const handleVideo = (file) => {
    if (file) {
      if (file.size > 150 * 1024 * 1024) {
        toast.error("File size must be 150 MB or less.");
        videoRef.current.value = null;
        return;
      } else {
        setVideo(file);
      }
    } else {
      videoRef.current.value = null;
      return;
    }
  };

  const viewImg = (img) => {
    if (img instanceof File && img.type.startsWith("image/")) {
      return URL.createObjectURL(
        new Blob([img], { type: "application/octet-stream" })
      );
    } else {
      return `${base_url}/uploads/${img}`;
    }
  };

  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState(null);

  const handleCategory = (category) => {
    setSubCategory(null);
    const isExist = data?.data.find((cate) => cate?._id === category?._id);
    if (isExist) {
      setCategory(category);
      setSubCategories(isExist?.subcategories);
    }
  };
  useEffect(() => {
    setIsDataLoading(true);
    if (editProduct) {
      setValue("group", editProduct?.group);
      const isExist = data?.data?.find(
        (cate) => cate?._id === editProduct?.category._id
      );
      setCategory({ _id: isExist?._id, cate_name: isExist?.cate_name });
      if (isExist) {
        setSubCategories(isExist?.subcategories);
        setSubCategory({
          sub_cate_name: editProduct?.sub_category?.sub_cate_name,
          _id: editProduct?.sub_category?._id,
        });
      }
    }
    setIsDataLoading(false);
  }, [editProduct, data?.data, subCategories]);

  const [unit, setUnit] = useState(
    editProduct
      ? editProduct?.unit
      : {
          singular: "",
          plural: "",
        }
  );
  const [time, setTime] = useState(
    editProduct ? editProduct?.lead_time?.time : "days"
  );
  const [selectedCheckbox, setSelectedCheckbox] = useState(
    editProduct && editProduct?.price?.price_type === "ladder_price"
      ? "ladder"
      : "onePrice"
  );

  const priceStore =
    editProduct && editProduct?.price?.price_type === "ladder_price"
      ? editProduct?.price?.ladder_price
      : editProduct?.price?.one_price;

  const ladderFields = [
    {
      quantity: {
        from: "",
        to: "",
      },
      euro: "",
    },
  ];
  const oneFields = {
    one_price: {
      from: "",
      to: "",
    },
  };

  const [ladderPriceFields, setLadderPriceFields] = useState(
    editProduct && editProduct?.price?.price_type === "ladder_price"
      ? editProduct?.price?.ladder_price
      : ladderFields
  );
  const [onePriceFields, setOnePriceFields] = useState(
    editProduct && editProduct?.price?.price_type === "one_price"
      ? {
          one_price: {
            from: editProduct?.price?.one_price?.from,
            to: editProduct?.price?.one_price?.to,
          },
        }
      : oneFields
  );

  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState(
    editProduct ? editProduct?.keyword : []
  );

  const handleAddKeyword = () => {
    if (keywordInput) {
      setKeywords((prevKeywords) => [...prevKeywords, keywordInput]);
      setKeywordInput("");
    }
    setKeywordsError(false);
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

  // ref list
  const img0Ref = useRef();
  const img1Ref = useRef();
  const img2Ref = useRef();
  const img3Ref = useRef();
  const img4Ref = useRef();
  const img5Ref = useRef();

  const imageRefs = [img0Ref, img1Ref, img2Ref, img3Ref, img4Ref, img5Ref];
  const editImageHandle = (index, img) => {
    if (img) {
      if (img.size > 2 * 1024 * 1024) {
        toast.error("Image size must be 2 MB or less.");
        imageRefs[index].current.value = null;
        return;
      }
    } else {
      imageRefs[index].current.value = null;
      return;
    }
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
    setLadderPriceFields([...ladderPriceFields, priceNewfield]);
  };

  const removePrice = (index) => {
    const data = [...ladderPriceFields];
    data.splice(index, 1);
    setLadderPriceFields(data);
  };

  const changeLadderPrice = (index, event) => {
    setLadderPriceFields((prevPriceFields) => {
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

  // console.log(unit);

  const handleAddProduct = async (data) => {
    if (!category?._id && !saveDraft) {
      mainCateRef.current.focus();
      setCategoryError(true);
      return;
    }
    if (!subCategory?._id && !saveDraft) {
      subCateRef.current.focus();
      setSubCategoryError(true);
      return;
    }

    if (!unit?.singular && !saveDraft) {
      setUnitError(true);
      unitRef.current.focus();
      return;
    }
    if (!time && !saveDraft) {
      return;
    }
    if (!keywords?.length && !saveDraft) {
      setKeywordsError(true);
      return;
    }
    if (productImages?.length === 0 && !saveDraft) {
      setProductImageError(true);
      img0Ref.current.focus();
      return;
    }
    // console.log(saveDraft);
    if ((!content || content?.length < 101) && !saveDraft) {
      setDescriptionError(true);
      descriptionRef.current.focus();
      return;
    }
    setLoading(true);
    if (saveDraft && !saveDraft) {
      setDraftLoading(true);
    }

    let price = {
      price_type: selectedCheckbox === "ladder" ? "ladder_price" : "one_price",
      ladder_price:
        selectedCheckbox === "ladder" ? ladderPriceFields : ladderFields,
      one_price:
        selectedCheckbox === "ladder"
          ? {
              from: "",
              to: "",
            }
          : {
              from: onePriceFields?.one_price.from,
              to: onePriceFields?.one_price.to,
            },
    };

    if (selectedCheckbox === "ladder") {
      const updatedLadderPriceFields = ladderPriceFields.map((field) => {
        const priceWithComma = field?.euro;
        const price = priceWithComma?.replaceAll(",", "");
        return {
          ...field,
          euro: price,
        };
      });
      price["ladder_price"] = updatedLadderPriceFields;
    }

    const images = productImages.filter(Boolean);

    if (!images.length && !saveDraft) {
      toast.warning("Image is Required");
      setLoading(false);
      return;
    }

    const formVideo = video
      ? video
      : editProduct?._id
      ? editProduct?.video
      : "";

    const productData = {
      title: data?.title,
      category: category?._id,
      sub_category: subCategory?._id,
      store: store?._id,
      images: images,
      description: content,
      keyword: keywords,
      model: data?.model ? data?.model : "",
      group: data?.group,
      moq: data?.moq,
      unit: unit,
      lead_time: { from: data?.from, to: data?.to, time: time },
      price: price,
    };

    const newProduct = new FormData();
    if (video) {
      newProduct.append("video", formVideo);
    }
    if (images?.length > 0) {
      images.forEach((file, index) => {
        newProduct.append(`images`, file);
      });
    }

    // -------------first part-------------
    if (editProduct && editProduct?._id) {
      newProduct.append(
        "productData",
        JSON.stringify({
          ...productData,
          status: "Publish",
        })
      );

      const options = {
        data: newProduct,
        id: editProduct?._id,
      };
      const result = await patchProduct(options);
      // console.log(result);
      setLoading(false);
      if (result?.data?.status === true) {
        toast.success("Product Update Successfully");
        reset();
        setKeywords([]);
        setContent("");
        setProductImages([]);
        setLadderPriceFields(ladderFields);
        setOnePriceFields(oneFields);
        setLoading(false);
        dispatch(setEditProduct(null));
        setVideo(null);
      } else {
        toast.error("Product Update unsuccessfully");
        setLoading(false);
      }
    } else {
      // -------------second part-------------

      if (saveDraft) {
        setDraftLoading(true);
        newProduct.append(
          "productData",
          JSON.stringify({
            ...productData,
            status: "Draft",
          })
        );
      } else {
        newProduct.append(
          "productData",
          JSON.stringify({
            ...productData,
            status: "Publish",
          })
        );
      }

      const options = {
        data: newProduct,
      };
      const result = await postProduct(options);
      // console.log(result);
      setSaveDraft(false);
      setDraftLoading(false);
      if (result?.data?.status === true) {
        toast.success(
          saveDraft
            ? "Saved As Draft Successfully"
            : "Product Publish Successfully"
        );
        localStorage.removeItem("productInfo");
        setCategory(null);
        setSubCategory(null);
        setUnit({
          singular: "",
          plural: "",
        });
        reset();
        setKeywords([]);
        setContent("");
        setProductImages([]);
        setLadderPriceFields(ladderFields);
        setOnePriceFields(oneFields);
        setLoading(false);
        setVideo(null);
      } else {
        toast.error(
          saveDraft
            ? "Saved As Draft unsuccessfully"
            : "Product Publish unsuccessfully"
        );
        setLoading(false);
      }
    }
  };

  const handleError = () => {
    if (!category?._id && !saveDraft) {
      mainCateRef.current.focus();
      setCategoryError(true);
      return;
    }
    if (!subCategory?._id && !saveDraft) {
      subCateRef.current.focus();
      setSubCategoryError(true);
      return;
    }
    if (!unit?.singular && !saveDraft) {
      setUnitError(true);
      unitRef.current.focus();
      return;
    }
    if (!time && !saveDraft) {
      return;
    }
    if (!keywords?.length && !saveDraft) {
      setKeywordsError(true);
      return;
    }
    if (productImages?.length === 0 && !saveDraft) {
      setProductImageError(true);
      img0Ref.current.focus();
      return;
    }
    if ((!content || content?.length < 101) && !saveDraft) {
      setDescriptionError(true);
      descriptionRef.current.focus();
      return;
    }
  };

  // save product info

  useEffect(() => {
    setIsDataLoading(true);
    const pInfo = JSON.parse(localStorage.getItem("productInfo")) || null;
    if (!editProduct && pInfo) {
      setIsDataLoading(true);
      setContent(pInfo?.description);
      setKeywords(pInfo?.keyword);
      setValue("title", pInfo?.title);
      setValue("group", pInfo?.group);
      setValue("moq", pInfo?.moq);
      setValue("model", pInfo?.model);
      setValue("from", pInfo?.from);
      setValue("to", pInfo?.to);
      setTime(pInfo?.time);
      setVideo(pInfo?.video);
      setUnit(pInfo?.unit);
      if (pInfo?.category && data?.data) {
        const isExist = data?.data?.find(
          (cate) => cate?._id === pInfo?.category
        );
        setCategory({ _id: isExist?._id, cate_name: isExist?.cate_name });
        setSubCategories(isExist?.subcategories);
        if (pInfo?.sub_category) {
          const subCateExist = isExist?.subcategories?.find(
            (subCate) => subCate?._id === pInfo?.sub_category
          );
          setSubCategory({
            _id: subCateExist?._id,
            sub_cate_name: subCateExist?.sub_cate_name,
          });
        }
      }
      if (pInfo?.price_type) {
        setSelectedCheckbox(pInfo?.price_type);
      }
      if (pInfo?.one_price) {
        setOnePriceFields({
          one_price: pInfo?.one_price,
        });
      }
      if (pInfo?.ladder_price?.length) {
        setLadderPriceFields(pInfo?.ladder_price);
      }
      setIsDataLoading(false);
    }
  }, [data?.data]);

  const formValues = watch();
  const saveProductInfo = () => {
    if (!editProduct) {
      const productInfo = {
        ...formValues,
        description: content,
        price_type: selectedCheckbox,
        one_price: {
          from: onePriceFields?.one_price?.from,
          to: onePriceFields?.one_price?.to,
        },
        ladder_price: ladderPriceFields,
        category: category?._id,
        sub_category: subCategory?._id,
        keyword: keywords,
        unit: unit,
        time: time,
      };
      localStorage.setItem("productInfo", JSON.stringify(productInfo));
    }
  };

  useEffect(() => {
    if (errors.group) {
      customCateRef.current.focus();
    }
  }, [errors.group]);

  // const onPImage = useCallback((acceptedFiles) => {
  //   console.log(acceptedFiles);
  //   if (acceptedFiles && acceptedFiles?.length > 0) {
  //     let images = [];
  //     for (let i = 0; i < acceptedFiles.length; i++) {
  //       images.push(acceptedFiles[i]);
  //     }
  //     setProductImages((current) => [...current, ...images]);
  //   }
  // }, []);

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: onPImage,
  //   accept: {
  //     "image/*": [".jpeg", ".png", ".jpg"],
  //   },
  // });

  return (
    <div className="upload_product md:px-8 relative">
      <div className="container ">
        <form
          onKeyDown={checkKeyDown}
          onSubmit={handleSubmit(handleAddProduct)}
          onBlur={saveProductInfo}
        >
          <div className="row">
            <div className="col-12 col-lg-6 ">
              <div className="mb-4">
                <label>
                  Product name <small className="text-red-600">*</small>
                  <span className="text-sm">(max 100 characters)</span>
                </label>
                <input
                  {...register("title", {
                    required: "Title is Required",
                    maxLength: {
                      value: 100,
                      message: "Title must be less than 100 characters",
                    },
                  })}
                  className={`mb-1 ${errors.title && "border !border-red-600"}`}
                  type="text"
                  placeholder="Product name"
                  defaultValue={editProduct?.title}
                />
                {errors.title && (
                  <p className="text-red-600 text-xs italic">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-12 col-lg-6 mb-4 md:mb-0" tabIndex={0}>
              <div className={`h-[62px] w-full grid grid-cols-2 gap-2`}>
                <div>
                  <label>
                    Main Category <small className="text-red-600">*</small>
                  </label>
                  <Popover placement="bottom-start">
                    <PopoverHandler ref={mainCateRef}>
                      <Button
                        className={`input h-[62px] shadow-none border-none normal-case text-left px-3 mb-1 ${
                          !category?._id &&
                          categoryError &&
                          "border !border-red-600"
                        }`}
                      >
                        {category?.cate_name}
                      </Button>
                    </PopoverHandler>
                    <PopoverContent className="grid grid-cols-1 max-w-[320px] max-h-[350px] overflow-y-auto w-full p-0 shadow-none">
                      {data?.data?.map((cate, i) => (
                        <Button
                          onClick={() => {
                            handleCategory({
                              cate_name: cate?.cate_name,
                              _id: cate?._id,
                            });
                            mainCateRef.current.click();
                          }}
                          key={i}
                          className="h-8 bg-white text-black hover:!bg-pm rounded-none hover:!text-white shadow-none border-none normal-case text-left outline-none px-3 py-0"
                        >
                          {cate?.cate_name}
                        </Button>
                      ))}
                    </PopoverContent>
                  </Popover>

                  {!category?._id && categoryError && (
                    <p className="text-red-600 text-xs italic">
                      Main Category is Required
                    </p>
                  )}
                </div>
                <div>
                  <label>
                    Sub Category <small className="text-red-600">*</small>
                  </label>
                  <Popover placement="bottom-start">
                    <PopoverHandler ref={subCateRef}>
                      <Button
                        className={`input h-[62px] shadow-none border-none normal-case text-left px-3 mb-1 ${
                          !subCategory?._id &&
                          subCategoryError &&
                          "border !border-red-600"
                        }`}
                      >
                        {subCategory?.sub_cate_name}
                      </Button>
                    </PopoverHandler>
                    <PopoverContent className="grid grid-cols-1 max-w-[320px] max-h-[350px] overflow-y-auto w-full p-0 shadow-none">
                      {subCategories?.map((subCate, i) => (
                        <Button
                          onClick={() => {
                            setSubCategory({
                              sub_cate_name: subCate?.sub_cate_name,
                              _id: subCate?._id,
                            });
                            subCateRef.current.click();
                          }}
                          key={i}
                          className="h-8 bg-white text-black hover:!bg-pm rounded-none hover:!text-white shadow-none border-none normal-case text-left outline-none px-3 py-0"
                        >
                          {subCate?.sub_cate_name}
                        </Button>
                      ))}
                    </PopoverContent>
                  </Popover>

                  {!subCategory && subCategoryError && (
                    <p className="text-red-600 text-xs italic">
                      Sub Category is Required
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 !mt-8 md:!mt-0">
              <div>
                <label>
                  Keyword <small className="text-red-600">*</small>
                  <img src={question} alt="" />
                </label>
                <div className="d-flex justify-items-center flex-wrap ">
                  {keywords?.map((keyword, index) => (
                    <div className="border d-flex me-2 mb-2" key={index}>
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
                          className="w-6 h-6"
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
                    className={`!rounded-e-none ${
                      keywords?.length === 0 &&
                      keywordsError &&
                      "border focus:border !border-red-600 focus:border-red-600"
                    }`}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    required={keywords?.length > 0 || saveDraft ? false : true}
                  />
                  <div
                    onClick={handleAddKeyword}
                    style={{ width: "100px" }}
                    className="add_btn pointer"
                  >
                    Add
                  </div>
                </div>
                {keywords?.length === 0 && keywordsError && (
                  <p className="text-red-600 text-xs italic">
                    Keyword is Required
                  </p>
                )}
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
                  required={false}
                />
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <div>
                <label className="flex items-center gap-1">
                  Custom Category <small className="text-red-600">*</small>{" "}
                  <InputLabelTooltip
                    label={labelInfo.custom_category.label}
                    message={labelInfo.custom_category.message}
                  />
                </label>

                <div className="flex justify-between items-start h-full w-full gap-x-1">
                  <Controller
                    name="group"
                    control={control}
                    render={({ field }) => (
                      <Popover placement="bottom-start">
                        <PopoverHandler ref={customCateRef}>
                          <Button
                            {...field}
                            className={`input h-[62px] shadow-none border-none normal-case text-left px-3 mb-1 ${
                              errors.group ? "border !border-red-600" : ""
                            }`}
                          >
                            {productGroups?.data?.find(
                              (group) => group._id === field.value
                            )?.title || ""}
                          </Button>
                        </PopoverHandler>
                        <PopoverContent className="grid grid-cols-1 max-w-[500px] max-h-[350px] overflow-y-auto w-full p-0 shadow-none">
                          {productGroups?.data?.map((value, index) => (
                            <Button
                              key={index}
                              className="h-8 bg-white text-black hover:!bg-pm rounded-none hover:!text-white shadow-none border-none normal-case text-left outline-none px-3 py-0"
                              onClick={() => {
                                field.onChange(value?._id);
                                customCateRef.current.click();
                              }}
                            >
                              {value?.title}
                            </Button>
                          ))}
                        </PopoverContent>
                      </Popover>
                    )}
                    {...register("group", {
                      required: saveDraft ? false : true,
                    })}
                  />
                  <Popover placement="bottom">
                    <PopoverHandler>
                      <div className="rounded-md w-36 h-14 mx-auto text-white cursor-pointer bg-pm flex justify-center items-center">
                        <span className="text-white hidden md:block">
                          New Category
                        </span>
                        <span className="text-white md:hidden">Add</span>
                      </div>
                    </PopoverHandler>
                    <AddGroup
                      groups={productGroups?.data}
                      storeId={store?._id}
                      setValue={setValue}
                    />
                  </Popover>
                </div>
                {errors.group && (
                  <p className="text-red-600 text-xs italic">
                    Custom Category is Required
                  </p>
                )}
              </div>
            </div>

            <div className="col-12 mb-4">
              <label>
                Product photos <small className="text-red-600">*</small>{" "}
                <span>(max 6 photos)</span>{" "}
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="w-full">
                  <div
                    className={`input_box relative ${
                      productImages?.length === 0 &&
                      productImageError &&
                      "border !border-red-600"
                    }`}
                  >
                    {productImages.length > 0 && (
                      <div
                        onClick={() => removeImage(0)}
                        className="absolute -top-2 -right-2 z-40 rounded-full bg-white text-red-600 p-1 w-8 cursor-pointer"
                      >
                        {trash}
                      </div>
                    )}
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
                      ref={img0Ref}
                      type="file"
                      name="image1"
                      accept=".png, .jpg, .jpeg"
                      multiple={false}
                      required={
                        (editProduct && editProduct?.images?.length > 0) ||
                        saveDraft
                          ? false
                          : true
                      }
                      onChange={(e) => editImageHandle(0, e.target.files[0])}
                      className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <p className="primary d-flex align-items-center justify-content-center gap-1">
                    {" "}
                    <img src={star.src} alt="" /> Primary
                  </p>
                </div>

                <div className="w-full">
                  <div className="input_box relative">
                    {productImages?.length > 1 && (
                      <div
                        onClick={() => removeImage(1)}
                        className="absolute -top-2 -right-2 z-40 rounded-full bg-white text-red-600 p-1 w-8 cursor-pointer"
                      >
                        {trash}
                      </div>
                    )}
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
                      ref={img1Ref}
                      type="file"
                      name="image2"
                      accept=".png, .jpg, .jpeg"
                      multiple={false}
                      onChange={(e) => editImageHandle(1, e.target.files[0])}
                      className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <p className="dot_btn">1</p>
                  </div>
                </div>

                <div className="w-full">
                  <div className="input_box relative">
                    {productImages.length > 2 && (
                      <div
                        onClick={() => removeImage(2)}
                        className="absolute -top-2 -right-2 z-40 rounded-full bg-white text-red-600 p-1 w-8 cursor-pointer"
                      >
                        {trash}
                      </div>
                    )}
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
                      ref={img2Ref}
                      type="file"
                      name="image3"
                      accept=".png, .jpg, .jpeg"
                      multiple={false}
                      onChange={(e) => editImageHandle(2, e.target.files[0])}
                      className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    {" "}
                    <p className="dot_btn">2</p>
                  </div>
                </div>

                {productImages?.length > 2 && (
                  <>
                    <div className="w-full">
                      <div className="input_box relative">
                        {productImages.length > 3 && (
                          <div
                            onClick={() => removeImage(3)}
                            className="absolute -top-2 -right-2 z-40 rounded-full bg-white text-red-600 p-1 w-8 cursor-pointer"
                          >
                            {trash}
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
                          ref={img3Ref}
                          type="file"
                          name="image4"
                          accept=".png, .jpg, .jpeg"
                          multiple={false}
                          onChange={(e) =>
                            editImageHandle(3, e.target.files[0])
                          }
                          className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        {" "}
                        <p className="dot_btn">3</p>
                      </div>
                    </div>
                  </>
                )}
                {productImages?.length > 3 && (
                  <>
                    <div className="w-full">
                      <div className="input_box relative">
                        {productImages.length > 4 && (
                          <div
                            onClick={() => removeImage(4)}
                            className="absolute -top-2 -right-2 z-40 rounded-full bg-white text-red-600 p-1 w-8 cursor-pointer"
                          >
                            {trash}
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
                          ref={img4Ref}
                          type="file"
                          name="image5"
                          accept=".png, .jpg, .jpeg"
                          multiple={false}
                          onChange={(e) =>
                            editImageHandle(4, e.target.files[0])
                          }
                          className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        {" "}
                        <p className="dot_btn">4</p>
                      </div>
                    </div>
                  </>
                )}
                {productImages?.length > 4 && (
                  <>
                    <div className="w-full">
                      <div className="input_box relative">
                        {productImages.length > 5 && (
                          <div
                            onClick={() => removeImage(5)}
                            className="cursor-pointer absolute -top-2 -right-2 z-40 rounded-full bg-white text-red-600 p-1 w-8"
                          >
                            {trash}
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
                          ref={img5Ref}
                          type="file"
                          name="image6"
                          onChange={(e) =>
                            editImageHandle(5, e.target.files[0])
                          }
                          className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
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
              <ProductVideoInput
                video={video}
                editProduct={editProduct}
                viewFile={viewFile}
                videoRef={videoRef}
                handleVideo={handleVideo}
              />
            </div>

            <div className="col-12 col-lg-6 mb-4">
              <div className="!relative">
                <label>
                  Unit <small className="text-red-600">*</small>
                </label>

                <Popover placement="bottom-start">
                  <PopoverHandler ref={unitRef}>
                    <Button
                      className={`input h-[62px] shadow-none border-none normal-case text-left px-3 mb-1 ${
                        !unit?.singular && unitError && "border !border-red-600"
                      }`}
                    >
                      {selectedCheckbox === "onePrice"
                        ? unit.singular
                        : unit.plural}
                    </Button>
                  </PopoverHandler>
                  <PopoverContent className="grid grid-cols-1 max-w-[650px] max-h-[350px] overflow-y-auto w-full p-0 shadow-none">
                    {units?.map((un, i) => (
                      <Button
                        onClick={() => {
                          setUnit(un);
                          unitRef.current.click();
                        }}
                        key={i}
                        className="h-8 bg-white text-black hover:!bg-pm rounded-none hover:!text-white shadow-none border-none normal-case text-left outline-none px-3 py-0"
                      >
                        {selectedCheckbox === "onePrice"
                          ? un.singular
                          : un.plural}
                      </Button>
                    ))}
                  </PopoverContent>
                </Popover>
                {!unit?.singular && unitError && (
                  <p className="text-red-600 text-xs italic">
                    Unit is Required
                  </p>
                )}
              </div>
            </div>

            <div className="col-12 col-lg-6 ">
              <div>
                <label className="flex items-center gap-1">
                  MOQ <small className="text-red-600">*</small>{" "}
                  <InputLabelTooltip
                    label={labelInfo.moq.label}
                    message={labelInfo.moq.message}
                  />
                </label>
                <input
                  {...register("moq", {
                    required: saveDraft ? false : "MOQ is Required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter only numbers for MOQ",
                    },
                  })}
                  onInput={handleNumber}
                  type="number"
                  placeholder="MOQ "
                  defaultValue={editProduct?.moq}
                  className={`mb-1 ${errors.moq && "border !border-red-600"}`}
                />
              </div>
              {errors.moq && (
                <p className="text-red-600 text-xs italic">
                  {errors.moq.message}
                </p>
              )}
            </div>

            <div className="col-12 col-lg-6 ">
              <label className="flex items-center gap-1">
                FOB-price <small className="text-red-600">*</small>{" "}
                <InputLabelTooltip
                  label={labelInfo.price.fob_price.label}
                  message={labelInfo.price.fob_price.message}
                />
              </label>

              <div className="d-flex align-items-center gap-5 mb-5">
                <div className="d-flex gap-2 align-items-center">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    checked={selectedCheckbox === "ladder"}
                    onChange={() => handleCheckboxChange("ladder")}
                  />
                  <span className="flex items-center gap-1">
                    Ladder price{" "}
                    <InputLabelTooltip
                      label={labelInfo.price.ladder_price.label}
                      message={labelInfo.price.ladder_price.message}
                    />
                  </span>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    checked={selectedCheckbox === "onePrice"}
                    onChange={() => handleCheckboxChange("onePrice")}
                  />
                  <span className="flex items-center gap-1">
                    One price{" "}
                    <InputLabelTooltip
                      label={labelInfo.price.one_price.label}
                      message={labelInfo.price.one_price.message}
                    />
                  </span>
                </div>
              </div>

              {selectedCheckbox === "ladder" ? (
                <div style={{ maxWidth: "1000px" }}>
                  {ladderPriceFields?.map((input, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="flex-none md:flex flex-col md:flex-row align-items-center gap-5 mb-3 w-full cursor-default"
                        >
                          <div className="flex flex-col-reverse items-start md:flex-row gap-2 md:items-center">
                            <input
                              className="mb-0 md:min-w-[120px] w-full"
                              type="number"
                              onInput={handleNumber}
                              min={0}
                              name="from"
                              placeholder="From"
                              defaultValue={input?.quantity?.from}
                              required={saveDraft ? false : true}
                              onChange={(event) =>
                                changeLadderPrice(index, event)
                              }
                            />
                            <span>-</span>
                            <input
                              className="mb-0 md:min-w-[120px] w-full"
                              type="number"
                              onInput={handleNumber}
                              min={0}
                              name="to"
                              placeholder="To"
                              defaultValue={input?.quantity?.to}
                              required={saveDraft ? false : true}
                              onChange={(event) =>
                                changeLadderPrice(index, event)
                              }
                            />
                            <span className="lowerCase flex items-center w-full gap-1">
                              {unit?.plural}
                            </span>
                          </div>
                          <div className="flex flex-col-reverse items-start md:flex-row gap-2 md:items-center">
                            <input
                              className="mb-0 md:min-w-[120px] w-full"
                              type="text"
                              onInput={handleNumberAndComma}
                              name="euro"
                              placeholder="Euro"
                              defaultValue={input.euro}
                              required={saveDraft ? false : true}
                              onChange={(event) =>
                                changeLadderPrice(index, event)
                              }
                            />
                            <div className="d-flex gap-2 align-items-center">
                              <span
                                className="lowercase"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                euro/ {unit?.singular}{" "}
                              </span>
                              {ladderPriceFields?.length > 1 && (
                                <div
                                  onClick={() => removePrice(index)}
                                  className="w-5 text-red-600 hover:text-pmd cursor-pointer"
                                >
                                  {trash}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  {ladderPriceFields?.length >= 8 ? (
                    <Tooltip content="You can enter a maximum of 8 prices">
                      <div
                        disabled
                        className="add_btn cursor-pointer flex justify-center items-center !bg-red-600 !text-white"
                      >
                        Add more
                      </div>
                    </Tooltip>
                  ) : (
                    <div
                      onClick={addPriceFields}
                      className="add_btn cursor-pointer flex justify-center items-center"
                    >
                      Add more
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ maxWidth: "1000px" }}>
                  <>
                    <div className="flex-none md:flex flex-col md:flex-row align-items-center gap-5 mb-3 w-full">
                      <div className="flex flex-col-reverse items-start md:flex-row gap-2 md:items-center">
                        <input
                          className="mb-0 md:min-w-[120px] w-full"
                          type="number"
                          onInput={handleNumber}
                          min={0}
                          name="from"
                          placeholder="From"
                          defaultValue={onePriceFields?.one_price?.from}
                          required={saveDraft ? false : true}
                          onChange={(event) =>
                            setOnePriceFields({
                              one_price: {
                                from: event?.target.value,
                                to: onePriceFields?.one_price?.to,
                              },
                            })
                          }
                        />
                        <span>-</span>
                        <input
                          className="mb-0 md:min-w-[120px] w-full"
                          type="number"
                          onInput={handleNumber}
                          min={0}
                          name="to"
                          placeholder="To"
                          defaultValue={onePriceFields?.one_price?.to}
                          required={saveDraft ? false : true}
                          onChange={(event) =>
                            setOnePriceFields({
                              one_price: {
                                from: onePriceFields?.one_price?.from,
                                to: event?.target.value,
                              },
                            })
                          }
                        />
                        <span className="lowerCase flex items-center w-full gap-1">
                          euro/{unit?.singular?.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </>
                </div>
              )}

              <div>
                <label className="flex items-center gap-1">
                  Lead time <small className="text-red-600">*</small>{" "}
                  <InputLabelTooltip
                    label={labelInfo.lead_time.label}
                    message={labelInfo.lead_time.message}
                  />
                </label>
                <div className="d-flex flex-wrap items-start md:items-center gap-4 mb-5">
                  <div className="d-flex gap-4 align-items-center">
                    <input
                      {...register("from", {
                        required: saveDraft ? false : true,
                      })}
                      id="special"
                      name="from"
                      onInput={handleNumber}
                      className={`mb-0 ${
                        errors.from && "border !border-red-600"
                      }`}
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
                      onInput={handleNumber}
                      className={`mb-0 ${
                        errors.to && "border !border-red-600"
                      }`}
                      type="number"
                      min={1}
                      placeholder="To"
                      defaultValue={editProduct?.lead_time?.to}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 align-items-center w-full md:w-fit">
                    <select
                      onChange={(e) => setTime(e.target.value)}
                      className="mb-0 w-full cursor-pointer"
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
                {/* {errors?.from ||
                  (errors?.to && (
                    <p className="text-red-600 text-xs italic">
                      Lead time is Required
                    </p>
                  ))} */}
              </div>
            </div>

            <br />

            <div className="col-12 mb-5 pb-3">
              <div>
                <label ref={descriptionRef} tabIndex={0}>
                  Product details <small className="text-red-600">*</small>
                  <span>
                    (Write a detailed description of your product
                    {descriptionError && content.length < 101 && (
                      <span className="!text-red-600">
                        . Minimum 100 Characters
                      </span>
                    )}
                    )
                  </span>{" "}
                </label>
                <ReactQuill
                  theme="snow"
                  style={{ minHeight: "400px" }}
                  value={content}
                  placeholder="Enter Your Description....."
                  onChange={(newContent) => setContent(newContent)}
                  modules={modules}
                  formats={formats}
                  className={`${
                    descriptionError &&
                    content.length < 101 &&
                    "border !border-red-600"
                  }`}
                />
              </div>
            </div>

            <div className="d-flex gap-2 justify-content-between align-items-center">
              <button
                onClick={() => handleError()}
                disabled={loading && !saveDraft}
                className="submit_btn !text-sm md:!text-[18px] hover:bg-pmd duration-150 flex justify-center items-center"
              >
                {loading && !saveDraft ? <Spinner /> : "Publish"}
              </button>
              {!editProduct && (
                <button
                  onClick={() => setSaveDraft(true)}
                  className="save_btn !text-sm md:!text-[18px] flex justify-center items-center hover:bg-gray-400"
                >
                  {draftLoading ? <Spinner /> : "Save as Draft"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      {isDataLoading ||
        (categoryLoading && (
          <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-pm bg-opacity-10 flex flex-col justify-start pt-[300px] items-center gap-1">
            <RotatingSquare
              height="200"
              width="200"
              color="#037d41"
              ariaLabel="rotating-square-loading"
              strokeWidth="4"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <h1 className="text-xl text-red-600 font-bold">Data Loading</h1>
          </div>
        ))}
    </div>
  );
};

export default UploadProduct;
