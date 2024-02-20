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
  deleteBrand,
  getBrands,
  resetStateBrand,
} from "../../../features/brand/brandSlice";

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
    ellipsis: true,
  },
  {
    title: "Action",
    dataIndex: "action",
    align: "right",
    width: "100px",
  },
];

const Brands = () => {
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
    document.title = "Brands - Admin";
    dispatch(getBrands());
  }, [dispatch]);

  const deletedABrand = (id) => {
    dispatch(deleteBrand(id));
    dispatch(getBrands());
    setOpen(false);
  };

  const brandState = useSelector((state) => state.brand.brands);
  const deletedBrandState = useSelector((state) => state.brand);

  const { isLoading, isSuccess, isError, message, deletedBrand } =
    deletedBrandState;

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
    if (isSuccess && deletedBrand) {
      toast.dismiss();
      toast.success("Brand deleted successfully");
      dispatch(getBrands());
      dispatch(resetStateBrand());
    }
  }, [
    isLoading,
    isSuccess,
    isError,
    message,
    deletedBrand,
    dispatch,
    brandState,
  ]);

  const data = [];
  brandState.forEach((brand, index) => {
    data.push({
      key: index + 1,
      name: brand.title,
      action: (
        <div className="d-flex gap-1 justify-content-end align-items-center ">
          <Link to={`/admin/brands/${brand._id}`}>
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
            onClick={() => showModal(brand._id)}
            icon={<IoTrashOutline style={{ width: "20px" }} />}
          />
        </div>
      ),
    });
  });

  return (
    <>
      <h3 className="mb-4 title">Brands</h3>
      <Table columns={columns} dataSource={data} />
      <CustomModal
        title="Are you sure want to delete this brand?"
        hideModal={hideModal}
        open={open}
        performAction={() => deletedABrand(id)}
      />
    </>
  );
};

export default Brands;
