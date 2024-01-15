import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import ResetPassword from "../pages/auth/ResetPassword";
import AddBlog from "../pages/blog/AddBlog";
import AddBlogCategory from "../pages/blog/AddBlogCategory";
import BlogCategoriesList from "../pages/blog/BlogCategoriesList";
import BlogList from "../pages/blog/BlogList";
import AddBrand from "../pages/catalog/brand/AddBrand";
import BrandsList from "../pages/catalog/brand/BrandsList";
import AddCategory from "../pages/catalog/category/AddCategory";
import CategoriesList from "../pages/catalog/category/CategoriesList";
import AddColor from "../pages/catalog/color/AddColor";
import ColorList from "../pages/catalog/color/ColorList";
import AddProduct from "../pages/catalog/products/AddProduct";
import ProductsList from "../pages/catalog/products/ProductsList";
import Customers from "../pages/customer/Customers";
import Enquires from "../pages/enquiry/Enquires";
import Orders from "../pages/order/Orders";

const router = createBrowserRouter([
  {
    path: "/admin/login",
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
        element: <Customers />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "products-list",
        element: <ProductsList />,
      },
      {
        path: "add-brand",
        element: <AddBrand />,
      },
      {
        path: "brands-list",
        element: <BrandsList />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "categories-list",
        element: <CategoriesList />,
      },
      {
        path: "add-color",
        element: <AddColor />,
      },
      {
        path: "colors-list",
        element: <ColorList />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
      },
      {
        path: "blogs-list",
        element: <BlogList />,
      },
      {
        path: "add-blog-category",
        element: <AddBlogCategory />,
      },
      {
        path: "blog-categories-list",
        element: <BlogCategoriesList />,
      },
      {
        path: "enquiries",
        element: <Enquires />,
      },
    ],
  },
]);

export default router;
