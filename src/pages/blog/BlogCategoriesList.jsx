import { Button, Table } from "antd";
import { useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import { getBlogCategories } from "../../features/blogCategory/blogCategorySlice";

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

const BlogCategoriesList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Blog Categories List - Admin";
    dispatch(getBlogCategories());
  }, [dispatch]);

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );

  const data = [];
  blogCategoryState.forEach((blogCategory, index) => {
    data.push({
      key: index + 1,
      name: blogCategory.title,
      action: (
        <div className="d-flex gap-1 justify-content-end align-items-center ">
          <Link to={`/admin/blog/categories/${blogCategory._id}`}>
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
            icon={<IoTrashOutline style={{ width: "20px" }} />}
          />
        </div>
      ),
    });
  });
  return (
    <>
      <h3 className="mb-4 title">Blog Categories List</h3>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default BlogCategoriesList;
