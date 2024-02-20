import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import CustomModal from "../../../components/CustomModal";
import {
  deleteCategory,
  getCategories,
  resetStateCategory,
} from "../../../features/category/categorySlice";

const columns = [
  {
    title: "SL",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
    width: "80px",
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: sortBy("name"),
    ellipsis: true,
  },
  {
    title: "Action",
    dataIndex: "action",
    align: "right",
    width: "100px",
  },
];

const Categories = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    document.title = "Category - Admin";
    dispatch(getCategories());
  }, [dispatch]);

  const deleteACategory = (id) => {
    dispatch(deleteCategory(id));
    dispatch(getCategories());
    setOpen(false);
  };

  const categoryState = useSelector((state) => state.category.categories);
  const deletedCategoryState = useSelector((state) => state.category);

  const { isLoading, isSuccess, isError, message, deletedCategory } =
    deletedCategoryState;

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading("Deleting category...");
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
    if (isSuccess) {
      toast.dismiss();
    }

    if (deletedCategory && isSuccess) {
      toast.dismiss();
      toast.success(deletedCategory.message);
      dispatch(getCategories());
      dispatch(resetStateCategory());
    }
  }, [isLoading, isSuccess, isError, message, deletedCategory, dispatch]);

  const data = [];
  categoryState.forEach((category, index) => {
    data.push({
      key: index + 1,
      name: category.title,
      action: (
        <div className="d-flex gap-1 justify-content-end align-items-center ">
          <Link to={`/admin/categories/${category._id}`}>
            <Button
              type="primary"
              shape="circle"
              className="d-flex justify-content-center align-items-center bg-info"
              icon={<RiEditLine style={{ width: "20px" }} />}
            />
          </Link>
          <Button
            type="primary"
            shape="circle"
            className="d-flex justify-content-center align-items-center bg-danger"
            onClick={() => showModal(category._id)}
            icon={<IoTrashOutline style={{ width: "20px" }} />}
          />
        </div>
      ),
    });
  });

  return (
    <>
      <h3 className="mb-4 title">Categories</h3>
      <Table columns={columns} dataSource={data} />
      <CustomModal
        title="Are you sure want to delete this Category?"
        hideModal={hideModal}
        open={open}
        performAction={() => deleteACategory(id)}
      />
    </>
  );
};

export default Categories;
