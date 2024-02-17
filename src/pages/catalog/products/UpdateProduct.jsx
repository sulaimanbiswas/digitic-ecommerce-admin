import { Select } from "antd";
import { useFormik } from "formik";
import { GetColorName } from "hex-color-to-color-name";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTimes } from "react-icons/fa";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import { getBrands } from "../../../features/brand/brandSlice";
import { getCategories } from "../../../features/category/categorySlice";
import { getColors } from "../../../features/color/colorSlice";
import { createProduct } from "../../../features/product/productSlice";
import {
  deleteImage,
  uploadImages,
} from "../../../features/upload/uploadSlice";

let schema = yup.object().shape({
  title: yup.string().required("Product name is required"),
  description: yup.string().required("Product description is required"),
  price: yup.number().min(0).required("Product price is required"),
  brand: yup.string().required("Product brand is required"),
  category: yup.string().required("Product category is required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Product colors is required"),
  tags: yup
    .array()
    .min(1, "Pick at least one tag")
    .required("Product tags is required"),
  quantity: yup.number().required("Product quantity is required"),
  images: yup.array().required("Product images is required"),
});

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 0",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#dddddd",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "100px",
};

const UpdateProduct = () => {
  const dispatch = useDispatch();

  const [color, setColor] = useState([]);
  const [tag, setTag] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      tags: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
    },
  });
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.category.categories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  // const productByIdState = useSelector((state) => state.product.productById);

  const colorOptions = [];
  colorState.forEach((item) => {
    colorOptions.push({
      label: (
        <div className="d-flex align-items-center ">
          <span
            className=""
            style={{
              width: "15px",
              height: "15px",
              display: "inline-block",
              backgroundColor: item.title,
              marginRight: "10px",
              border: "1px solid #ddd",
              borderRadius: "50%",
            }}
          ></span>
          {GetColorName(item.title)}
        </div>
      ),
      value: item._id,
    });
  });

  const tagsOptions = [
    { label: "Featured", value: "featured" },
    { label: "Best Seller", value: "best_seller" },
    { label: "New Arrival", value: "new_arrival" },
    { label: "Trending", value: "trending" },
    { label: "Popular", value: "popular" },
    { label: "Special", value: "special" },
  ];

  const handleColors = (value) => {
    setColor(value);
  };

  const handleTags = (value) => {
    setTag(value);
  };

  const img = [];
  imgState.forEach((item) => {
    img.push({
      public_id: item.public_id,
      url: item.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : "";
    formik.values.tags = tag ? tag : "";
    formik.values.images = img;
  }, [formik, color, tag, img]);

  // Dropzone

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (imgState.length > 0) {
        imgState.forEach((item) => {
          dispatch(deleteImage(item.public_id));
        });
        dispatch(uploadImages(acceptedFiles));
      } else {
        dispatch(uploadImages(acceptedFiles));
      }
    },
    [dispatch, imgState]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
    }),
    []
  );
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div className="">
        <form
          action=""
          method="post"
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <div>
            <CustomInput
              type="text"
              name="title"
              label="Enter Product Name"
              value={formik.values.title}
              i_id="title"
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-danger">{formik.errors.title}</div>
            ) : null}
          </div>
          <div>
            <ReactQuill
              theme="snow"
              value={formik.values.description}
              name="description"
              onChange={(value) => formik.setFieldValue("description", value)}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-danger">{formik.errors.description}</div>
            ) : null}
          </div>
          <div>
            <CustomInput
              type="number"
              label="Enter Product Price"
              i_id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange("price")}
              onBlur={formik.handleBlur("price")}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-danger">{formik.errors.price}</div>
            ) : null}
          </div>
          <div className="">
            <select
              name="brand"
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              value={formik.values.brand}
              className="form-control py-3"
              id=""
            >
              <option value="" className="d-none">
                Select Brand
              </option>
              {brandState.map((item) => (
                <option value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
            {formik.touched.brand && formik.errors.brand ? (
              <div className="text-danger">{formik.errors.brand}</div>
            ) : null}
          </div>
          <div className="">
            <select
              name="category"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
              className="form-control py-3"
              id=""
            >
              <option value="" className="d-none">
                Select Category
              </option>
              {categoryState.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="text-danger">{formik.errors.category}</div>
            ) : null}
          </div>

          <div className="">
            <Select
              className="w-100"
              mode="multiple"
              allowClear
              name="color"
              placeholder="Select Colors"
              defaultValue={color}
              onChange={(value) => handleColors(value)}
              onBlur={formik.handleBlur("color")}
              options={colorOptions}
            />
            {formik.touched.color && formik.errors.color ? (
              <div className="text-danger">{formik.errors.color}</div>
            ) : null}
          </div>

          <div className="">
            <Select
              className="w-100"
              mode="multiple"
              allowClear
              name="tags"
              placeholder="Select Tags"
              defaultValue={tag}
              onChange={(value) => handleTags(value)}
              onBlur={formik.handleBlur("tags")}
              options={tagsOptions}
            />
            {formik.touched.color && formik.errors.color ? (
              <div className="text-danger">{formik.errors.color}</div>
            ) : null}
          </div>

          <div className="">
            <CustomInput
              type="number"
              label="Enter Product Quantity"
              i_id="quantity"
              required={true}
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange("quantity")}
              onBlur={formik.handleBlur("quantity")}
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="text-danger">{formik.errors.quantity}</div>
            ) : null}
          </div>
          <div className="">
            <div className="d-flex flex-wrap justify-content-center ">
              {imgState.map((file) => {
                return (
                  <div className="position-relative" key={file.url}>
                    <img
                      src={file.url}
                      alt=""
                      width="190px"
                      style={{
                        objectFit: "contain",
                        margin: "10px 0",
                        height: "180px",
                        border: "1px solid #ddd",
                        marginRight: "10px",
                      }}
                    />
                    <button
                      onClick={() => dispatch(deleteImage(file.public_id))}
                      className="position-absolute bg-danger text-white badge"
                      style={{
                        cursor: "pointer",
                        top: "20px",
                        right: "20px",
                        padding: "5px",
                        zIndex: "999",
                      }}
                    >
                      <FaTimes className="fs-6" />
                    </button>
                  </div>
                );
              })}
            </div>
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p className="mb-0">
                Drag &apos;n&apos; drop some files here, or click to select
                files
              </p>
            </div>
          </div>
          <div>
            <button className="btn btn-success py-2 px-4" type="submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
