import Footer from "./Footer";
import Navbar from "./Navbar";

function CommonLayout({ children }) {
  return (
    <div>
      <Navbar></Navbar>
      <div className=" min-h-screen">{children}</div>
      <Footer></Footer>
    </div>
  );
}

export default CommonLayout;
