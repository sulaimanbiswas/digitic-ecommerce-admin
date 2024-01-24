import { Button, Select, Table } from "antd";
import { useEffect } from "react";
import { ImEye } from "react-icons/im";
import { IoTrashOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEnquiries } from "../../features/enquiry/enquirySlice";

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
  },
  Table.EXPAND_COLUMN,
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
  },
  {
    title: "Action",
    dataIndex: "action",
    align: "right",
    width: "100px",
  },
];

const Enquires = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Enquires - Admin";
    dispatch(getEnquiries());
  }, [dispatch]);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const handleChange = (value) => {
    console.log(value);
  };

  const statusOptions = [
    {
      value: "submitted",
      label: "Submitted",
    },
    {
      value: "in-progress",
      label: "In Progress",
    },
    {
      value: "resolved",
      label: "Resolved",
    },
  ];

  const data = [];
  enquiryState.forEach((enquiry, index) => {
    data.push({
      key: index + 1,
      name: enquiry.name,
      email: enquiry.email,
      mobile: enquiry.mobile,
      comment: enquiry.comment,
      status: (
        <Select
          labelInValue
          defaultValue={{ value: enquiry.status, label: enquiry.status }}
          style={{ width: 150 }}
          onChange={handleChange}
          options={statusOptions}
        />
      ),
      action: (
        <div className="d-flex gap-1 justify-content-end align-items-center ">
          <Button
            type="primary"
            shape="circle"
            className="d-flex justify-content-center align-items-center"
            icon={<ImEye style={{ width: "20px" }} />}
          />
          <Link to={`/admin/products/${enquiry._id}`}>
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
      <h3 className="mb-4 title">Enquires</h3>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (enquiry) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {enquiry.comment}
            </p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </>
  );
};

export default Enquires;
