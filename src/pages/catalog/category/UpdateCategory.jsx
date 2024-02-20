import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import {
  getCategory,
  resetStateCategory,
  updateCategory,
} from "../../../features/category/categorySlice";

const schema = yup.object().shape({
  title: yup.string().required("Category title is required"),
});

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.pathname.split("/")[3];

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updateCategory({ id: categoryId, category: values }));
    },
  });

  useEffect(() => {
    document.title = "Update Category - Admin";
    dispatch(getCategory(categoryId));
  }, [dispatch, categoryId]);

  const categoryState = useSelector((state) => state.category);
  const {
    categoryById,
    updatedCategory,
    isSuccess,
    isError,
    isLoading,
    message,
  } = categoryState;

  useEffect(() => {
    formik.setFieldValue("title", categoryById?.title);
  }, [categoryById]);

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading("Updating category...");
    }
    if (isSuccess) {
      toast.dismiss();
    }
    if (isSuccess && updatedCategory) {
      toast.dismiss();
      toast.success("Category updated successfully");
      formik.resetForm();
      dispatch(resetStateCategory());
      navigate("/admin/categories");
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
  }, [
    dispatch,
    updatedCategory,
    isLoading,
    isSuccess,
    isError,
    message,
    navigate,
    formik,
  ]);

  return (
    <div>
      <h3 className="mb-4 title">Update Category</h3>
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
              label="Enter Category Title"
              name="title"
              value={formik.values.title}
              id="title"
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

export default UpdateCategory;
