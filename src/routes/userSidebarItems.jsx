
import NotificationsPage from "@/pages/student/NotificationsPage";
import ProfilePage from "@/pages/student/ProfilePage";
import StudentDashboard from "@/pages/student/StudentDashboard";




export const userSidebarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "/user/dashboard",
        component: StudentDashboard,
      },
      {
        title: "My Profile",
        url: "/user/profile",
        component: ProfilePage,
      },
      {
        title:"Notifications",
        url:"/user/notifications",
        component: NotificationsPage
      }
    ],
  },
  {
    title: "History",
    items: [
      {
        title: "Posts",
        url: "/user/posts",
        // component: Posts,
      },
    ],
  },

];
