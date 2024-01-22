import { Input } from "antd";

const CustomInput = ({
  type,
  name,
  label,
  i_id,
  i_class,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className="form-floating">
      <Input
        type={type}
        name={name}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={i_id}>{label}</label>
    </div>
  );
};

export default CustomInput;
