import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import Chart from "../components/Dashboard/Chart";
import RecentOrders from "../components/Dashboard/RecentOrders";
import RecentReviews from "../components/Dashboard/RecentReviews";

const Dashboard = () => {
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex flex-column gap-4">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex justify-content-between align-items-end  flex-grow-1 bg-white p-3 rounded-3">
            <div className="">
              <p className="">Total</p>
              <h3 className="mb-0">$20000</h3>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-end ">
              <h6 className="text-danger">
                <BsArrowDownRight className="me-1" />
                32%
              </h6>
              <p className="mb-0">Compared to April 2023</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end  flex-grow-1 bg-white p-3 rounded-3">
            <div className="">
              <p className="">Total</p>
              <h3 className="mb-0">$1000</h3>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-end ">
              <h6 className="text-success ">
                <BsArrowUpRight className="me-1" />
                32%
              </h6>
              <p className="mb-0">Compared to April 2023</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end  flex-grow-1 bg-white p-3 rounded-3">
            <div className="">
              <p className="">Total</p>
              <h3 className="mb-0">$1000</h3>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-end ">
              <h6 className="text-danger">
                <BsArrowDownRight className="me-1" />
                32%
              </h6>
              <p className="mb-0">Compared to April 2023</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="bg-white p-3 rounded-3">
              <h3 className="mb-4">Income Statics</h3>
              <Chart />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="bg-white p-3 rounded-3">
              <h3 className="mb-4">Recent Orders</h3>
              <RecentOrders />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="bg-white p-3 rounded-3">
              <h3 className="mb-4">Recent Reviews</h3>
              <RecentReviews />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
