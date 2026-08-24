import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import HomePage from "../pages/Home/HomePage";
import AboutUs from "../pages/publicPages/AboutUs";
import AllPost from "../pages/publicPages/AllPost";
import ContactUs from "../pages/publicPages/ContactUs";
import Login from "@/pages/authPages/Login";
import Register from "@/pages/authPages/Register";
import Features from "@/pages/publicPages/Features";
import Services from "@/pages/publicPages/Services";
import withAuth from "@/utils/withAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { role } from "@/constant/role";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import AllPosts from "@/pages/post/AllPosts";
import PostDetailPage from "@/pages/community/PostDetailPage";

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      { Component: HomePage, index: true },
      { Component: AboutUs, path: "about" },
      { Component: AllPost, path: "posts" },
      { Component: ContactUs, path: "contact" },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Services,
        path: "services",
      },
      {
        Component: AllPosts,
        path: "all-posts",
      },
      {
        Component: PostDetailPage,
        path: "posts/:id",
      },
    ],
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: withAuth(
      DashboardLayout,
      (role.superAdmin ) || (role.admin ),
    ),
    path: "/admin",

    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/dashboard" /> },

      ...generateRoutes(userSidebarItems),
    ],
  },
]);
export default router;
