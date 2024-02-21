import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import {
  getColor,
  resetStateColor,
  updateColor,
} from "../../../features/color/colorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Color title is required"),
});

const UpdateColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const colorId = location.pathname.split("/")[3];

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updateColor({ id: colorId, color: values }));
    },
  });

  useEffect(() => {
    document.title = "Update Color - Admin";
    dispatch(getColor(colorId));
  }, [dispatch, colorId]);

  const colorState = useSelector((state) => state.color);
  const { colorById, updatedColor, isSuccess, isError, isLoading, message } =
    colorState;

  useEffect(() => {
    formik.setFieldValue("title", colorById?.title);
  }, [colorById]);

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading("Updating color...");
    }
    if (isSuccess) {
      toast.dismiss();
    }
    if (isSuccess && updatedColor) {
      toast.dismiss();
      toast.success("Color updated successfully");
      formik.resetForm();
      dispatch(resetStateColor());
      navigate("/admin/colors");
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
      dispatch(resetStateColor());
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    updatedColor,
    message,
    dispatch,
    formik,
    navigate,
  ]);

  return (
    <div>
      <h3 className="mb-4 title">Update Color</h3>
      <div className="">
        <form
          action=""
          method="post"
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3"
        >
          <div className="">
            <CustomInput
              type={"color"}
              label={"Enter Color Code"}
              name="title"
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
              Update Color
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateColor;
