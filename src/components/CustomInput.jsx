import { Input } from "antd";

const CustomInput = ({ type, label, i_id, i_class, required }) => {
  return (
    <div className="form-floating mb-3">
      <Input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        required={required}
      />
      <label htmlFor={i_id}>
        {label} {required ? <span className="text-danger">*</span> : ""}
      </label>
    </div>
  );
};

export default CustomInput;
