import CustomInput from "../../../components/CustomInput";
import CustomTextEditor from "../../../components/CustomTextEditor";
import ImageUploader from "../../../components/ImageUploader";

const AddProduct = () => {
  return (
    <div>
      <h3 className="mb-4">Add Product</h3>
      <div className="">
        <form action="">
          <CustomInput
            type="text"
            label="Enter Product Name"
            i_id="title"
            required={true}
          />
          <div className="mb-3">
            <CustomTextEditor />
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            i_id="price"
            required={true}
          />
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="" className="d-none">
              Select Brand
            </option>
            <option value="">Category 1</option>
          </select>
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="" className="d-none">
              Select Category
            </option>
            <option value="">Category 1</option>
          </select>
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="" className="d-none">
              Select Color
            </option>
            <option value="">Category 1</option>
          </select>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            i_id="quantity"
            required={true}
          />
          <ImageUploader />
          <div className="mt-3">
            <button className="btn btn-success py-2 px-4">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
