import { Button, Table } from "antd";
import { GetColorName } from "hex-color-to-color-name";
import { useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getColors } from "../../../features/color/colorSlice";

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
  {
    title: "Action",
    dataIndex: "action",
    align: "right",
    width: "100px",
  },
];

const Colors = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Color - Admin";
    dispatch(getColors());
  }, [dispatch]);

  const colorState = useSelector((state) => state.color.colors);

  const data = [];
  colorState.forEach((color, index) => {
    const colorName = GetColorName(color.title);

    data.push({
      key: index + 1,
      name: (
        <div className="d-flex align-items-center">
          <div
            className="me-2"
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: color.title,
              border: "1px solid #ddd",
            }}
          ></div>
          <span>{colorName}</span>
        </div>
      ),
      action: (
        <div className="d-flex gap-1 justify-content-end align-items-center ">
          <Link to={`/admin/colors/${color._id}`}>
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
      <h3 className="mb-4 title">Colors</h3>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Colors;
