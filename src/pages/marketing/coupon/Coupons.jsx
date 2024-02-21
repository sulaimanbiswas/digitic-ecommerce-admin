import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import CustomModal from "../../../components/CustomModal";
import {
  deleteCoupon,
  getCoupons,
  resetStateCoupon,
} from "../../../features/coupon/couponSlice";

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
  },
  {
    title: "Expiry Date",
    dataIndex: "expiryDate",
    sorter: sortBy("expiryDate"),
  },

  {
    title: "Discount",
    dataIndex: "discount",
    sorter: sortBy("discount"),
  },

  {
    title: "Action",
    dataIndex: "action",
    align: "right",
    width: "100px",
  },
];

const Coupons = () => {
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
    document.title = "Coupons - Admin";
    dispatch(getCoupons());
  }, [dispatch]);

  const deletedACoupon = (id) => {
    dispatch(deleteCoupon(id));
    dispatch(getCoupons());
    setOpen(false);
  };

  const couponState = useSelector((state) => state.coupon.coupons);
  const deletedCouponState = useSelector((state) => state.coupon);

  const { isLoading, isSuccess, isError, message, deletedCoupon } =
    deletedCouponState;

  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading("Loading...");
    }
    if (isError) {
      toast.dismiss();
      toast.error(message);
    }
    if (isSuccess) {
      toast.dismiss();
    }
    if (isSuccess && deletedCoupon) {
      toast.dismiss();
      toast.success("Coupon deleted successfully");
      dispatch(resetStateCoupon());
    }
  }, [isLoading, isSuccess, isError, message, deletedCoupon, dispatch]);

  const data = [];
  couponState.map((coupon, index) => {
    data.push({
      key: index + 1,
      name: coupon.name,
      expiryDate: new Date(coupon.expiry).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      discount: coupon.discount,
      action: (
        <div className="d-flex gap-1 justify-content-end align-items-center ">
          <Link to={`/admin/coupons/${coupon._id}`}>
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
            onClick={() => showModal(coupon._id)}
            icon={<IoTrashOutline style={{ width: "20px" }} />}
          />
        </div>
      ),
    });
  });

  return (
    <>
      <h3 className="mb-4 title">Coupons</h3>
      <Table columns={columns} dataSource={data} />
      <CustomModal
        title="Are you sure want to delete this coupon?"
        hideModal={hideModal}
        open={open}
        performAction={() => deletedACoupon(id)}
      />
    </>
  );
};

export default Coupons;
