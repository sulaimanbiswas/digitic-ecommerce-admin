import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import {
  getBrand,
  resetStateBrand,
  updateBrand,
} from "../../../features/brand/brandSlice";

let schema = yup.object().shape({
  title: yup.string().required("Brand title is required"),
});

const UpdateBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const brandId = location.pathname.split("/")[3];

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updateBrand({ id: brandId, brand: values }));
    },
  });

  useEffect(() => {
    document.title = "Update Brand - Admin";
    dispatch(getBrand(brandId));
  }, [dispatch, brandId]);

  const brandState = useSelector((state) => state.brand);
  const { brandTitle, updatedBrand, isSuccess, isError, isLoading, message } =
    brandState;

  useEffect(() => {
    formik.setFieldValue("title", brandTitle);
  }, [brandTitle]);

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading("Updating brand...");
    }
    if (isSuccess) {
      toast.dismiss();
    }
    if (isSuccess && updatedBrand) {
      toast.dismiss();
      toast.success("Brand updated successfully");
      formik.resetForm();
      dispatch(resetStateBrand());
      navigate("/admin/brands");
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
  }, [
    dispatch,
    updatedBrand,
    isLoading,
    isSuccess,
    isError,
    message,
    navigate,
    formik,
  ]);

  return (
    <div>
      <h3 className="mb-4 title">Update Brand</h3>
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
              label="Enter Brand Title"
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
              Update Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBrand;
