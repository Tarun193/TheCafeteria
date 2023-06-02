import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <>
      <main className="bg-orange-100 min-h-screen">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default Layout;
