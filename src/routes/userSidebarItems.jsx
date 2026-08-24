
import ComplaintFormPage from "@/pages/complaints/ComplaintFormPage";
import LostFoundFormPage from "@/pages/lostFound/LostFoundFormPage";
import CreatePost from "@/pages/post/CreatePost";
import QuestionFormPage from "@/pages/questions/QuestionFormPage";
import Announcement from "@/pages/student/Announcement";
import Events from "@/pages/student/Events";
import MyComplains from "@/pages/student/MyComplains";
import NotificationsPage from "@/pages/student/NotificationsPage";
import ProfilePage from "@/pages/student/ProfilePage";
import Settings from "@/pages/student/Settings";
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
        title:"Ask Questions",
        url:"/user/questions/new",
        component: QuestionFormPage
      },
      {
        title:"Submit Complain",
        url:"/user/complaints/new",
        component: ComplaintFormPage
      },
      {
        title:"Report Lost Item",
        url:"/user/lost-found/new",
        component: LostFoundFormPage
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
        url:"/user/complaints",
        component: MyComplains
      },
      {
        title:"Settings",
        url:"/user/settings",
        component: Settings
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
