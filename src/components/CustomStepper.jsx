import { Stepper } from "react-form-stepper";

const CustomStepper = ({ steps }) => {
  return <Stepper activeStep={1} steps={steps} />;
};

export default CustomStepper;
