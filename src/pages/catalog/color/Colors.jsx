import { Button, Table } from "antd";
import { GetColorName } from "hex-color-to-color-name";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/CustomModal";
import {
  deleteColor,
  getColors,
  resetStateColor,
} from "../../../features/color/colorSlice";

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
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    document.title = "Color - Admin";
    dispatch(getColors());
  }, [dispatch]);

  const deletedAColor = (id) => {
    dispatch(deleteColor(id));
    dispatch(getColors());
    setOpen(false);
  };

  const colorState = useSelector((state) => state.color.colors);
  const deletedColorState = useSelector((state) => state.color);

  const { isLoading, isSuccess, isError, message, deletedColor } =
    deletedColorState;

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading("Deleting color...");
    }
    if (isSuccess) {
      toast.dismiss();
    }
    if (isSuccess && deletedColor) {
      toast.dismiss();
      toast.success("Color deleted successfully");
      dispatch(getColors());
      dispatch(resetStateColor());
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
  }, [dispatch, isLoading, isSuccess, isError, message, deletedColor]);

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
            onClick={() => showModal(color._id)}
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
      <CustomModal
        title="Are you sure want to delete this color?"
        hideModal={hideModal}
        open={open}
        performAction={() => deletedAColor(id)}
      />
    </>
  );
};

export default Colors;
