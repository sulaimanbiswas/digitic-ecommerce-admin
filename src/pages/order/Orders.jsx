import { Button, Table } from "antd";
import { useEffect } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import { ImEye } from "react-icons/im";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../features/order/orderSlice";

const columns = [
  {
    title: "SL",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
    width: "80px",
    align: "center",
  },
  Table.EXPAND_COLUMN,
  {
    title: "Order Id",
    dataIndex: "orderId",
  },
  {
    title: "Order Date",
    dataIndex: "orderDate",
  },
  {
    title: "Customer Info",
    dataIndex: "customerInfo",
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
    align: "right",
    width: "100px",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Orders - Admin";
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.order.orders);

  const paymentStatus = (status) => {
    switch (status) {
      case "paid":
        return (
          <span className="badge bg-success-subtle text-success">{status}</span>
        );
      case "pending":
        return (
          <span className="badge bg-warning-subtle text-warning">{status}</span>
        );
      case "unpaid":
        return (
          <span className="badge bg-danger-subtle text-danger">{status}</span>
        );
      default:
        return (
          <span className="badge bg-warning-subtle text-warning">{status}</span>
        );
    }
  };

  const status = (status) => {
    switch (status) {
      case "Not Processed":
        return (
          <span className="badge bg-warning-subtle text-warning">{status}</span>
        );
      case "Processing":
        return (
          <span className="badge bg-primary-subtle text-primary">{status}</span>
        );
      case "Dispatched":
        return <span className="badge bg-info-subtle text-info">{status}</span>;
      case "Cancelled":
        return (
          <span className="badge bg-danger-subtle text-danger">{status}</span>
        );
      case "Delivered":
        return (
          <span className="badge bg-success-subtle text-success">{status}</span>
        );
      default:
        return (
          <span className="badge bg-warning-subtle text-warning">{status}</span>
        );
    }
  };

  const data = [];
  orderState.forEach((order, index) => {
    data.push({
      key: index + 1,
      orderId: order.paymentIntent.id,
      orderDate: (
        <>
          <span>
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <br />
          <span>{new Date(order.createdAt).toLocaleTimeString("en-US")}</span>
        </>
      ),
      products: order.products,
      customerInfo: (
        <>
          <span>
            {order.orderedBy.firstName + " " + order.orderedBy.lastName}
          </span>
          <br />
          <span>{order.orderedBy.mobile}</span>
        </>
      ),
      totalAmount: (
        <>
          <span>${order.paymentIntent.amount}</span>
          <br />
          {paymentStatus(order.paymentIntent.status)}
        </>
      ),
      status: status(order.orderStatus),

      action: (
        <div className="d-flex gap-1 justify-content-end align-items-center ">
          <Button
            type="primary"
            shape="circle"
            className="d-flex justify-content-center align-items-center"
            icon={<ImEye style={{ width: "20px" }} />}
          />
          <Link to={`/admin/products/${order._id}`}>
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
            className="d-flex justify-content-center align-items-center bg-warning "
            icon={<CiSaveDown1 style={{ width: "20px" }} />}
          />
        </div>
      ),
    });
  });
  return (
    <>
      <h3 className="mb-4 title">Orders</h3>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (order) => {
            const columns = [
              { title: "SL", dataIndex: "key", width: "80px", align: "center" },
              { title: "Product", dataIndex: "product" },
              { title: "Price", dataIndex: "price" },
              { title: "Quantity", dataIndex: "quantity" },
              { title: "Total", dataIndex: "total" },
            ];
            const data = [];
            order.products.forEach((product, index) => {
              data.push({
                key: index + 1,
                product: product.product.title,
                price: product.product.price,
                quantity: product.quantity,
                total: product.quantity * product.product.price,
              });
            });
            return (
              <Table columns={columns} dataSource={data} pagination={false} />
            );
          },
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </>
  );
};

export default Orders;
