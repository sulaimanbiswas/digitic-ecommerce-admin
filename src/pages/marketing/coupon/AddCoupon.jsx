import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import {
  createCoupon,
  resetStateCoupon,
} from "../../../features/coupon/couponSlice";

let schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z0-9]+$/, "Coupon code must be alphabetic & numeric")
    .required("Coupon code is required"),
  discount: yup.number().required("Discount is required"),
  expiry: yup.date().required("Expiry date is required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      discount: "",
      expiry: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCoupon(values));
    },
  });

  const newCoupon = useSelector((state) => state.coupon);

  const { isSuccess, isError, isLoading, createdCoupon, message } = newCoupon;

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding coupon...");
    }
    if (isSuccess && createdCoupon) {
      toast.dismiss();
      formik.resetForm();
      dispatch(resetStateCoupon());
      toast.success("Coupon added successfully");
      navigate("/admin/coupons");
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    message,
    dispatch,
    formik,
    navigate,
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
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
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
              onChange={formik.handleChange("discount")}
              onBlur={formik.handleBlur("discount")}
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
              onChange={formik.handleChange("expiry")}
              onBlur={formik.handleBlur("expiry")}
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

export default AddCoupon;
