import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/Home/HomePage";
import AboutUs from "../pages/publicPages/AboutUs";
import AllPost from "../pages/publicPages/AllPost";
import ContactUs from "../pages/publicPages/ContactUs";
import Login from "@/pages/authPages/Login";
import Register from "@/pages/authPages/Register";
import Features from "@/pages/publicPages/Features";
import Services from "@/pages/publicPages/Services";

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
]);
export default router;
