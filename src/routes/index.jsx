import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/Home/HomePage";

const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
   
    
    ],
  },
  
]);
export default router;