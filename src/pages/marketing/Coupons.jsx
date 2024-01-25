import { Button, Table } from "antd";
import { useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import { getCoupons } from "../../features/coupon/couponSlice";

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
  useEffect(() => {
    document.title = "Coupons - Admin";
    dispatch(getCoupons());
  }, [dispatch]);

  const couponState = useSelector((state) => state.coupon.coupons);

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
          <Link to={`/admin/products/${coupon._id}`}>
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
      <h3 className="mb-4 title">Coupons</h3>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Coupons;
