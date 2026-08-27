

import Announcement from "@/pages/admin/Announcement";
import ComplaintManagement from "@/pages/admin/ComplaintManagement";
import PostManagement from "@/pages/admin/PostManagement";
import UserManagement from "@/pages/admin/UserManagement";

import { Analytics } from "@/utils/Analytics";






export const adminSidebarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    //   {
    //     title: "My Profile",
    //     url: "/admin/profile",
    //     component: MyProfile,
    //   },
    ],
  },
  {
    title: "All Management",
    items: [
      {
        title: "User Management",
        url: "/admin/users",
        component: UserManagement,
      },
      {
        title: "Complain Management",
        url: "/admin/complaints",
        component: ComplaintManagement,
      },
      {
        title: "Announcement Management",
        url: "/admin/announcements",
        component: Announcement,
      },
      {
        title: "Post Management",
        url: "/admin/posts",
        component: PostManagement,
      },
     
  
    ],
  },
];
