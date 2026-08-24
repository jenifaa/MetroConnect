
import CreatePost from "@/pages/post/CreatePost";
import Announcement from "@/pages/student/Announcement";
import Events from "@/pages/student/Events";
import MyComplains from "@/pages/student/MyComplains";
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
      },
      {
        title:"Create Post",
        url:"/user/posts/new",
        component: CreatePost
      },
      {
        title:"Announcements",
        url:"/user/announcements",
        component: Announcement
      },
      {
        title:"Events",
        url:"/user/events",
        component: Events
      },
      {
        title:"My Complains",
        url:"/user/complains",
        component: MyComplains
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
