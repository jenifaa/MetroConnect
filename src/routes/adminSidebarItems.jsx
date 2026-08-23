

import ComplaintManagement from "@/pages/admin/ComplaintManagement";

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
        title: "Complain Management",
        url: "/admin/complaints",
        component: ComplaintManagement,
      },
     
  
    ],
  },
];
