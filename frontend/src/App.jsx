import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomeBar from "./pages/home/HomeBar.jsx";
function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";
  const isEmployeeArea = location.pathname.startsWith("/employee");
  const isAdminArea = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAuthPage && !isEmployeeArea && !isAdminArea && (
        <nav>
          <Navbar />
        </nav>
      )}
      {!isAuthPage && !isEmployeeArea && !isAdminArea && <HomeBar />}
      <Outlet />
      {!isAuthPage && !isEmployeeArea && !isAdminArea && <Footer />}
    </>
  );
}

export default App;
