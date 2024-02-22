import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import { createBlog, resetStateBlog } from "../../../features/blog/blogSlice";
import { getBlogCategories } from "../../../features/blogCategory/blogCategorySlice";
import {
  deleteImage,
  resetStateUpload,
  uploadImages,
} from "../../../features/upload/uploadSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  images: yup.array().min(1, "Image is required"),
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

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      images: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlog(values));
    },
  });

  useEffect(() => {
    dispatch(getBlogCategories());
  }, [dispatch]);

  const blogCategories = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  const imgState = useSelector((state) => state.upload.images);
  const newBlog = useSelector((state) => state.blog);

  const { isSuccess, isError, isLoading, createdBlog, message } = newBlog;

  useEffect(() => {
    if (isLoading) {
      toast.loading("Creating blog...");
    }
    if (isSuccess && createdBlog) {
      toast.dismiss();
      formik.resetForm();
      toast.success("Blog created successfully");
      dispatch(resetStateBlog());
      dispatch(resetStateUpload());
      navigate("/admin/blogs");
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
  }, [
    isLoading,
    dispatch,
    isSuccess,
    isError,
    message,
    formik,
    navigate,
    createdBlog,
  ]);

  const img = [];
  imgState.forEach((item) => {
    img.push({
      public_id: item.public_id,
      url: item.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [formik, img]);

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
      <h3 className="mb-4 title">Add Blog</h3>

      <div className="">
        <form
          action=""
          method="post"
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3 "
        >
          <div className="">
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
                Select Blog Category
              </option>
              {blogCategories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="text-danger">{formik.errors.category}</div>
            ) : null}
          </div>
          <div className="">
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
          <div className="">
            <div className="d-flex">
              {imgState.map((file) => {
                return (
                  <div className="position-relative" key={file.url}>
                    <img
                      src={file.url}
                      alt=""
                      width="200"
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
          <div className="">
            <button type="submit" className="btn btn-success py-2 px-4">
              Post Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
