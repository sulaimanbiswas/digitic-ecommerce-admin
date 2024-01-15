import { Button, Table } from "antd";
import { useEffect } from "react";
import { ImEye } from "react-icons/im";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../../features/product/productSlice";

const columns = [
  {
    title: "SL",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Products List - Admin";
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);

  const data = [];
  productState.forEach((product, index) => {
    data.push({
      key: index + 1,
      name: product.title,
      brand: product.brand,
      category: product.category,
      price: `${product.price}`,
      quantity: product.quantity,
      action: (
        <div className="d-flex gap-1 justify-content-end align-items-center ">
          <Button
            type="primary"
            shape="circle"
            className="d-flex justify-content-center align-items-center"
            icon={<ImEye style={{ width: "20px" }} />}
          />
          <Link to={`/admin/products/${product._id}`}>
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
            icon={<MdOutlineRemoveShoppingCart style={{ width: "20px" }} />}
          />
        </div>
      ),
    });
  });

  return (
    <>
      <h3 className="mb-4 title">Products List</h3>
      <Table columns={columns} dataSource={data} />;
    </>
  );
};

export default ProductsList;
