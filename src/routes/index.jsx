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
import PostEdit from "@/pages/post/PostEdit";
import AnnouncementsListPage from "@/pages/announcements/AnnouncementsListPage";
import AnnouncementDetailPage from "@/pages/announcements/AnnouncementDetailPage";
import QuestionDetailPage from "@/pages/questions/QuestionDetailPage";
import LostFoundDetailPage from "@/pages/lostFound/LostFoundDetailPage";
import ComplaintDetailPage from "@/pages/complaints/ComplaintDetailPage";

import ChangePasswordPage from "@/pages/student/ChangePasswordPage";
import MyProfile from "@/pages/CommonPages/MyProfile";
import EditProfile from "@/pages/CommonPages/EditProfile";

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
        Component: AnnouncementsListPage,
        path: "announcements",
      },
      {
        Component: AnnouncementDetailPage,
        path: "announcements/:announcementId",
      },
      {
        Component: QuestionDetailPage,
        path: "questions/:questionId",
      },
      {
        Component: LostFoundDetailPage,
        path: "lost-found/:itemId",
      },
      {
        Component: ComplaintDetailPage,
        path: "complaints/:complaintId",
      },
      {
        Component: PostDetailPage,
        path: "posts/:postId",
      },
      {
        Component: PostEdit,
        path: "posts/:postId/edit",
      },
      {
        Component: ChangePasswordPage,
        path: "change-password",
      },
      {
        Component: MyProfile,
        path: "profile",
      },
      {
        Component: EditProfile,
        path: "profile/edit",
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
    Component: withAuth(DashboardLayout, [role.superAdmin, role.admin]),
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
