import { Select, Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sortBy from "sort-by";
import { getUsers } from "../../features/customer/customerSlice";

const columns = [
  {
    title: "SL",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: sortBy("name"),
  },
  {
    title: "Email",
    dataIndex: "email",
  },

  {
    title: "Mobile",
    dataIndex: "mobile",
  },

  {
    title: "Status",
    dataIndex: "status",
    sorter: sortBy("status"),
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Customers - Admin";
    dispatch(getUsers());
  }, [dispatch]);

  const customerState = useSelector((state) => state.customer.customers);

  const handleChange = (value) => {
    console.log(value);
  };

  const statusOptions = [
    {
      value: "active",
      label: "Active",
    },
    {
      value: "inactive",
      label: "Inactive",
    },
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "deleted",
      label: "Deleted",
    },
    {
      value: "blocked",
      label: "Blocked",
    },
    {
      value: "rejected",
      label: "Rejected",
    },
    {
      value: "banned",
      label: "Banned",
    },
    {
      value: "suspended",
      label: "Suspended",
    },
    {
      value: "verified",
      label: "Verified",
    },
  ];

  const data = [];
  customerState.forEach((customer, index) => {
    if (customer.role !== "admin") {
      data.push({
        key: index + 1,
        name: customer.firstName + " " + customer.lastName,
        email: customer.email,
        mobile: customer.mobile,
        status: (
          <Select
            labelInValue
            defaultValue={{ value: customer.status, label: customer.status }}
            style={{ width: 150 }}
            onChange={handleChange}
            options={statusOptions}
          />
        ),
      });
    }
  });

  return (
    <>
      <h3 className="mb-4 title">Customers</h3>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Customers;
