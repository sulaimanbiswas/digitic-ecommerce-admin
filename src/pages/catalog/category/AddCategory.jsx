import CustomInput from "../../../components/CustomInput";

const AddCategory = () => {
  return (
    <div>
      <h3 className="mb-4">Add Category</h3>
      <div className="">
        <form action="" method="get" className="d-flex flex-column">
          <CustomInput
            type={"text"}
            label={"Enter Category"}
            i_id={"title"}
            required={true}
          />
          <div className="">
            <button className="btn btn-success py-2 px-4">Add Category</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
