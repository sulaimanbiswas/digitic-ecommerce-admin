import { Table } from "antd";

const ProductsList = () => {
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
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      status: `London, Park Lane no. ${i}`,
    });
  }
  return (
    <>
      <h3 className="mb-4">Products List</h3>
      <Table columns={columns} dataSource={data} />;
    </>
  );
};

export default ProductsList;