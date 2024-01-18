import { Button, Table } from "antd";
import { useEffect } from "react";
import { ImEye } from "react-icons/im";
import { IoTrashOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import { getBlogs } from "../../features/blog/blogSlice";

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
    title: "Category",
    dataIndex: "category",
    sorter: sortBy("category"),
    ellipsis: true,
  },
  {
    title: "View",
    dataIndex: "view",
    sorter: (a, b) => a.view - b.view,
    ellipsis: true,
  },
  {
    title: "Action",
    dataIndex: "action",
    align: "right",
    width: "100px",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Blog List - Admin";
    dispatch(getBlogs());
  }, [dispatch]);

  const blogState = useSelector((state) => state.blog.blogs);

  const data = [];
  blogState.forEach((blog, index) => {
    data.push({
      key: index + 1,
      name: blog.title,
      category: blog.category,
      view: blog.countViews,
      action: (
        <div className="d-flex gap-1 justify-content-end align-items-center ">
          <Button
            type="primary"
            shape="circle"
            className="d-flex justify-content-center align-items-center"
            icon={<ImEye style={{ width: "20px" }} />}
          />
          <Link to={`/admin/blogs/${blog._id}`}>
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
      <h3 className="mb-4 title">BlogList</h3>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default BlogList;
