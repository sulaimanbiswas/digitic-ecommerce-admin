import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../../../components/CustomInput";
import {
  createColor,
  resetStateColor,
} from "../../../features/color/colorSlice";

let schema = yup.object().shape({
  title: yup.string().required("Color code is required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColor(values));
    },
  });

  const newColor = useSelector((state) => state.color);

  const { isSuccess, isError, isLoading, createdColor, message } = newColor;

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding color...");
    }
    if (isSuccess && createdColor) {
      toast.dismiss();
      toast.success("Color added successfully");
      navigate("/admin/colors");
      dispatch(resetStateColor());
      formik.resetForm();
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
  }, [
    isLoading,
    dispatch,
    isSuccess,
    message,
    navigate,
    formik,
    isError,
    createdColor,
  ]);
  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
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
          </div>
          <div className="">
            <button type="submit" className="btn btn-success py-2 px-4">
              Add Color
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
