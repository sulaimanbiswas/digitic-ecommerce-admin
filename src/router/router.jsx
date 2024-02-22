import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import ResetPassword from "../pages/auth/ResetPassword";
import AddBlog from "../pages/blog/blog/AddBlog";
import Blogs from "../pages/blog/blog/Blogs";
import UpdateBlog from "../pages/blog/blog/UpdateBlog";
import AddBlogCategory from "../pages/blog/category/AddBlogCategory";
import BlogCategories from "../pages/blog/category/BlogCategories";
import UpdateBlogCategory from "../pages/blog/category/UpdateBlogCategory";
import AddBrand from "../pages/catalog/brand/AddBrand";
import Brands from "../pages/catalog/brand/Brands";
import UpdateBrand from "../pages/catalog/brand/UpdateBrand";
import AddCategory from "../pages/catalog/category/AddCategory";
import Categories from "../pages/catalog/category/Categories";
import UpdateCategory from "../pages/catalog/category/UpdateCategory";
import AddColor from "../pages/catalog/color/AddColor";
import Colors from "../pages/catalog/color/Colors";
import UpdateColor from "../pages/catalog/color/UpdateColor";
import AddProduct from "../pages/catalog/products/AddProduct";
import Products from "../pages/catalog/products/Products";
import UpdateProduct from "../pages/catalog/products/updateProduct";
import Customers from "../pages/customer/Customers";
import Enquires from "../pages/enquiry/Enquires";
import AddCoupon from "../pages/marketing/coupon/AddCoupon";
import Coupons from "../pages/marketing/coupon/Coupons";
import UpdateCoupon from "../pages/marketing/coupon/UpdateCoupon";
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
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <UpdateProduct />,
      },
      {
        path: "add-brand",
        element: <AddBrand />,
      },
      {
        path: "brands/:id",
        element: <UpdateBrand />,
      },
      {
        path: "brands",
        element: <Brands />,
      },

      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "categories/:id",
        element: <UpdateCategory />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "add-color",
        element: <AddColor />,
      },
      {
        path: "colors",
        element: <Colors />,
      },
      {
        path: "colors/:id",
        element: <UpdateColor />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "coupons",
        element: <Coupons />,
      },
      {
        path: "add-coupon",
        element: <AddCoupon />,
      },
      {
        path: "coupons/:id",
        element: <UpdateCoupon />,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
      },
      {
        path: "blogs/:id",
        element: <UpdateBlog />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "add-blog-category",
        element: <AddBlogCategory />,
      },
      {
        path: "blog-categories/:id",
        element: <UpdateBlogCategory />,
      },
      {
        path: "blog-categories",
        element: <BlogCategories />,
      },
      {
        path: "enquiries",
        element: <Enquires />,
      },
    ],
  },
]);

export default router;
