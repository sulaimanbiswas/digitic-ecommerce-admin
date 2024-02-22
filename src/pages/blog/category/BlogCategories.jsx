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
  deleteBlogCategory,
  getBlogCategories,
  resetStateBlogCategory,
} from "../../../features/blogCategory/blogCategorySlice";

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

const BlogCategories = () => {
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
    document.title = "Blog Categories - Admin";
    dispatch(getBlogCategories());
  }, [dispatch]);

  const deletedABlogCategory = (id) => {
    dispatch(deleteBlogCategory(id));
    setOpen(false);
  };

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  const deletedBlogCategoryState = useSelector((state) => state.blogCategory);

  const { isLoading, isSuccess, isError, message, deletedBlogCategory } =
    deletedBlogCategoryState;

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading("Deleting blog category...");
    }
    if (isSuccess) {
      toast.dismiss();
    }
    if (isSuccess && deletedBlogCategory) {
      toast.dismiss();
      toast.success("Blog category deleted successfully");
      dispatch(resetStateBlogCategory());
      dispatch(getBlogCategories());
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
  }, [dispatch, deletedBlogCategory, isLoading, isSuccess, isError, message]);

  const data = [];
  blogCategoryState.forEach((blogCategory, index) => {
    data.push({
      key: index + 1,
      name: blogCategory.title,
      action: (
        <div className="d-flex gap-1 justify-content-end align-items-center ">
          <Link to={`/admin/blog-categories/${blogCategory._id}`}>
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
            onClick={() => showModal(blogCategory._id)}
            icon={<IoTrashOutline style={{ width: "20px" }} />}
          />
        </div>
      ),
    });
  });
  return (
    <>
      <h3 className="mb-4 title">Blog Categories</h3>
      <Table columns={columns} dataSource={data} />
      <CustomModal
        title="Are you sure want to delete this category?"
        hideModal={hideModal}
        open={open}
        performAction={() => deletedABlogCategory(id)}
      />
    </>
  );
};

export default BlogCategories;
