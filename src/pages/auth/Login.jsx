import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput";

const Login = () => {
  return (
    <div
      className="py-5 d-flex align-items-center flex-column justify-content-center"
      style={{ background: "#ffd333", minHeight: "100vh" }}
    >
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="">
          <CustomInput type="email" label="Email" i_id="email" />
          <CustomInput type="password" label="Password" i_id="password" />
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
