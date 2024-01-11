import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CustomInput from "../../components/CustomInput";
import { login } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, message } = useSelector((state) => state.auth);
  const schema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    document.title = "Login - Admin";
    if (user && isSuccess) {
      toast.success(message.message || "Welcome back chief!");
      navigate("/admin");
    } else {
      toast.error(message.message || "An error occurred. Please try again.");
      navigate("/admin/login");
    }
  }, [user, isSuccess, navigate, message]);
  return (
    <div
      className="py-5 d-flex align-items-center flex-column justify-content-center"
      style={{ background: "#ffd333", minHeight: "100vh" }}
    >
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="email"
            name="email"
            label="Email"
            i_id="email"
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
          <CustomInput
            type="password"
            name="password"
            label="Password"
            i_id="password"
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <div className="d-flex justify-content-end mb-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button
            style={{ background: "#ffd333" }}
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
