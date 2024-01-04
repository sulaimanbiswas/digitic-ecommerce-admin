import CustomInput from "../../../components/CustomInput";

const AddColor = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div className="">
        <form action="" method="get" className="d-flex flex-column">
          <CustomInput
            type={"color"}
            label={"Enter Color"}
            i_id={"title"}
            required={true}
          />
          <div className="">
            <button className="btn btn-success py-2 px-4">Add Color</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
