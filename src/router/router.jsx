import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import ResetPassword from "../pages/auth/ResetPassword";
import AddBlog from "../pages/blog/AddBlog";
import AddBlogCategory from "../pages/blog/AddBlogCategory";
import BlogCategoriesList from "../pages/blog/BlogCategoriesList";
import BlogLIst from "../pages/blog/BlogLIst";
import BrandsList from "../pages/catalog/Brand/BrandsList";
import AddBrand from "../pages/catalog/Brand/addBrand";
import AddCategory from "../pages/catalog/category/addCategory";
import CategoriesList from "../pages/catalog/category/categoriesList";
import AddColor from "../pages/catalog/color/addColor";
import ColorList from "../pages/catalog/color/colorList";
import AddProduct from "../pages/catalog/products/addProduct";
import ProductsList from "../pages/catalog/products/productsList";
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
        element: <BlogLIst />,
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
