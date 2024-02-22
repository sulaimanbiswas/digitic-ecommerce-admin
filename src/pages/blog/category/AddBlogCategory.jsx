import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import {
  createBlogCategory,
  resetStateBlogCategory,
} from "../../../features/blogCategory/blogCategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Blog category title is required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlogCategory(values));
    },
  });

  const newBlogCategory = useSelector((state) => state.blogCategory);

  const { isSuccess, isError, isLoading, createdBlogCategory, message } =
    newBlogCategory;

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding blog category...");
    }
    if (isSuccess && createdBlogCategory) {
      toast.dismiss();
      toast.success("Blog category added successfully");
      navigate("/admin/blog-categories");
      formik.resetForm();
      dispatch(resetStateBlogCategory);
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
  }, [
    isLoading,
    isSuccess,
    message,
    navigate,
    formik,
    isError,
    createdBlogCategory,
    dispatch,
  ]);

  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div className="">
        <form
          action=""
          method="post"
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <div className="">
            <CustomInput
              type="text"
              name="title"
              label="Enter Blog Category Title"
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
            <button type="submit" className="btn btn-success py-2 px-4">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
