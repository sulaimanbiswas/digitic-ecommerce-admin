import { Button, Table } from "antd";
import { useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import { getCategories } from "../../../features/category/categorySlice";

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
  useEffect(() => {
    document.title = "Category - Admin";
    dispatch(getCategories());
  }, [dispatch]);

  const categoryState = useSelector((state) => state.category.categories);

  const data = [];
  categoryState.forEach((category, index) => {
    data.push({
      key: index + 1,
      name: category.title,
      action: (
        <div className="d-flex gap-1 justify-content-end align-items-center ">
          <Link to={`/admin/products/${category._id}`}>
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
      <h3 className="mb-4 title">Categories</h3>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Categories;
