import CustomInput from "../../components/CustomInput";
import CustomTextEditor from "../../components/CustomTextEditor";
import ImageUploader from "../../components/ImageUploader";

const AddBlog = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>

      <div className="">
        <form action="" method="get" className="d-flex flex-column">
          <CustomInput
            type={"text"}
            label={"Enter Blog Title"}
            i_id={"title"}
            required={true}
          />
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Blog Category</option>
            <option value="">Category 1</option>
            <option value="">Category 2</option>
            <option value="">Category 3</option>
            <option value="">Category 4</option>
          </select>
          <div className="mb-3">
            <CustomTextEditor />
          </div>
          <div className="mb-3">
            <ImageUploader />
          </div>
          <div className="">
            <button className="btn btn-success py-2 px-4">Post Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
