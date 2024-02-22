import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import {
  getBlogCategory,
  resetStateBlogCategory,
  updateBlogCategory,
} from "../../../features/blogCategory/blogCategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Blog category title is required"),
});

const UpdateBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const blogCategoryId = location.pathname.split("/")[3];

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(
        updateBlogCategory({ id: blogCategoryId, blogCategory: values })
      );
    },
  });

  useEffect(() => {
    document.title = "Update Blog Category - Admin";
    dispatch(getBlogCategory(blogCategoryId));
  }, [dispatch, blogCategoryId]);

  const blogCategoryState = useSelector((state) => state.blogCategory);
  const {
    getBlogCategoryById,
    updatedBlogCategory,
    isSuccess,
    isError,
    isLoading,
    message,
  } = blogCategoryState;

  useEffect(() => {
    formik.setFieldValue("title", getBlogCategoryById?.title);
  }, [getBlogCategoryById]);

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading("Updating blog category...");
    }
    if (isSuccess) {
      toast.dismiss();
    }
    if (isSuccess && updatedBlogCategory) {
      toast.dismiss();
      toast.success("Blog category updated successfully");
      formik.resetForm();
      dispatch(resetStateBlogCategory());
      navigate("/admin/blog-categories");
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
  }, [
    dispatch,
    formik,
    navigate,
    updatedBlogCategory,
    isLoading,
    isSuccess,
    isError,
    message,
  ]);

  return (
    <div>
      <h3 className="mb-4 title">Update Blog Category</h3>
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-danger">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="">
            <button type="submit" className="btn btn-success py-2 px-4">
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogCategory;
