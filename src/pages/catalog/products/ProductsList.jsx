import { Button, Table } from "antd";
import { useEffect } from "react";
import { ImEye } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../../features/product/productSlice";

const columns = [
  {
    title: "SL",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
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
      price: `$${product.price}`,
      quantity: product.quantity,
      action: (
        <div className="d-flex gap-1 justify-content-end align-items-center ">
          <Link to={`/admin/products/${product._id}`}>
            <Button
              type="primary"
              shape="circle"
              className="d-flex justify-content-center align-items-center"
              icon={<ImEye style={{ width: "20px" }} />}
            />
          </Link>
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
