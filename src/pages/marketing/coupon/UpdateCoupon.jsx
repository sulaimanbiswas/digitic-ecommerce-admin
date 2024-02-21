import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import {
  getCoupon,
  resetStateCoupon,
  updateCoupon,
} from "../../../features/coupon/couponSlice";

let schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z0-9]+$/, "Coupon code must be alphabetic & numeric")
    .required("Coupon code is required"),
  discount: yup
    .number()
    .min(1, "Discount must be at least 0%")
    .max(100, "Discount must be at most 100%")
    .required("Discount is required"),
  expiry: yup.date().required("Expiry date is required"),
});

const UpdateCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const couponId = location.pathname.split("/")[3];

  const formik = useFormik({
    initialValues: {
      name: "",
      discount: "",
      expiry: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      dispatch(updateCoupon({ id: couponId, coupon: values }));
    },
  });

  useEffect(() => {
    document.title = "Update Coupon - Admin";
    dispatch(getCoupon(couponId));
  }, [dispatch, couponId]);

  const couponState = useSelector((state) => state.coupon);
  const { couponById, updatedCoupon, isSuccess, isError, isLoading, message } =
    couponState;

  useEffect(() => {
    formik.setFieldValue("name", couponById?.name);
    formik.setFieldValue("discount", couponById?.discount);
    formik.setFieldValue(
      "expiry",
      couponById?.expiry
        ? new Date(couponById?.expiry).toISOString().split("T")[0]
        : ""
    );
  }, [couponById]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Updating coupon...");
    }
    if (isSuccess) {
      toast.dismiss();
    }
    if (isSuccess && updatedCoupon) {
      toast.dismiss();
      toast.success("Coupon updated successfully");
      formik.resetForm();
      dispatch(resetStateCoupon());
      navigate("/admin/coupons");
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
  }, [
    dispatch,
    updatedCoupon,
    isLoading,
    isSuccess,
    isError,
    message,
    navigate,
    formik,
  ]);

  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
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
              label="Enter Coupon Code"
              name="name"
              value={formik.values.name}
              i_id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="">
            <CustomInput
              type="number"
              label="Enter Discount Amount"
              name="discount"
              value={formik.values.discount}
              i_id="discount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.discount && formik.errors.discount ? (
              <div className="text-danger">{formik.errors.discount}</div>
            ) : null}
          </div>
          <div className="">
            <CustomInput
              type="date"
              label="Enter Expiry Date"
              name="expiry"
              value={formik.values.expiry}
              i_id="expiry"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.expiry && formik.errors.expiry ? (
              <div className="text-danger">{formik.errors.expiry}</div>
            ) : null}
          </div>
          <div className="">
            <button type="submit" className="btn btn-primary">
              Add Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoupon;
