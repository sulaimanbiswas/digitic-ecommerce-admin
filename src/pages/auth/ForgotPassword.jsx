import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput";

const ForgotPassword = () => {
  return (
    <div
      className="py-5 d-flex align-items-center flex-column justify-content-center"
      style={{ background: "#ffd333", minHeight: "100vh" }}
    >
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          {`Enter your email address below and we'll send you a link to reset your password.`}
        </p>
        <form action="">
          <CustomInput type="email" label="Email" i_id="email" />
          <Link
            to="/admin"
            style={{ background: "#ffd333" }}
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-decoration-none text-center fs-5 "
            type="submit"
          >
            Sent Link
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
