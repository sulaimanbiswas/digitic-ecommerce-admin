import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import ResetPassword from "../pages/auth/ResetPassword";
import Enquires from "../pages/enquiry/Enquires";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "customers",
        element: <h1>Customers</h1>,
      },
      {
        path: "add-product",
        element: <h1>Add Product</h1>,
      },
      {
        path: "products-list",
        element: <h1>Products</h1>,
      },
      {
        path: "add-brand",
        element: <h1>Add Brand</h1>,
      },
      {
        path: "brands-list",
        element: <h1>Brands</h1>,
      },
      {
        path: "add-category",
        element: <h1>Add Category</h1>,
      },
      {
        path: "categories-list",
        element: <h1>Categories</h1>,
      },
      {
        path: "add-color",
        element: <h1>Add Color</h1>,
      },
      {
        path: "colors-list",
        element: <h1>Colors</h1>,
      },
      {
        path: "orders",
        element: <h1>Orders</h1>,
      },
      {
        path: "add-blog",
        element: <h1>Add Blog</h1>,
      },
      {
        path: "blogs-list",
        element: <h1>Blogs List</h1>,
      },
      {
        path: "add-blog-category",
        element: <h1>Add Blog Category</h1>,
      },
      {
        path: "blog-categories-list",
        element: <h1>Blog Categories List</h1>,
      },
      {
        path: "enquiries",
        element: <Enquires />,
      },
    ],
  },
]);

export default router;
