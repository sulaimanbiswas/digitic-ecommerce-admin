import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import {
  createCategory,
  resetStateCategory,
} from "../../../features/category/categorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category title is required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCategory(values));
    },
  });

  const newCategory = useSelector((state) => state.category);

  const { isSuccess, isError, isLoading, createdCategory, message } =
    newCategory;

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding category...");
    }
    if (isSuccess && createdCategory) {
      toast.dismiss();
      toast.success("Category added successfully");
      navigate("/admin/categories");
      dispatch(resetStateCategory());
      formik.resetForm();
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
    createdCategory,
    dispatch,
  ]);

  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
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
              label="Enter Category Name"
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

export default AddCategory;
