import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";

export const getSidebarItems = (userRole) => {
  switch (userRole) {
    case role.superAdmin:
      return [...adminSidebarItems, ...userSidebarItems];

    case role.admin:
      return [...adminSidebarItems];

    case role.user:
      return [...userSidebarItems];

    default:
      return [];
  }
};
