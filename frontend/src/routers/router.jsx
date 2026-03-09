import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import SignIn from "../pages/signin/signIn.jsx";
import SignUp from "../pages/signup/signUp.jsx";
import CategoryCakes from "../pages/menu/CategoryCakes.jsx";
import AboutPage from "../pages/about/AboutPage.jsx";
import ContactPage from "../pages/contact/ContactPage.jsx";
import PolicyPage from "../pages/policy/PolicyPage.jsx";
import AccountPage from "../pages/account/AccountPage.jsx";
import OrderPage from "../pages/order/OrderPage.jsx";
import CheckoutPage from "../pages/checkout/CheckoutPage.jsx";
import YourOrderPage from "../pages/yourorder/YourOrderPage.jsx";
import OrderStatusPage from "../pages/order-status/OrderStatusPage.jsx";
import SearchPage from "../pages/search/SearchPage.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import EmployeeLoginPage from "../pages/employee/EmployeeLoginPage.jsx";
import EmployeeLayout from "../pages/employee/EmployeeLayout.jsx";
import EmployeeDashboardPage from "../pages/employee/EmployeeDashboardPage.jsx";
import EmployeeOrdersPage from "../pages/employee/EmployeeOrdersPage.jsx";
import EmployeeProfilePage from "../pages/employee/EmployeeProfilePage.jsx";
import EmployeeRoute from "../components/EmployeeRoute.jsx";
import AdminRoute from "../components/AdminRoute.jsx";
import AdminLoginPage from "../pages/admin/AdminLoginPage.jsx";
import AdminLayout from "../pages/admin/AdminLayout.jsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import AdminProductsPage from "../pages/admin/AdminProductsPage.jsx";
import AdminReportsPage from "../pages/admin/AdminReportsPage.jsx";
import AdminStaffPage from "../pages/admin/AdminStaffPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/policy",
        element: <PolicyPage />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/account",
        element: (
          <PrivateRoute requireCustomer>
            <AccountPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/yourorder",
        element: <YourOrderPage />,
      },
      {
        path: "/order-status/:orderId?",
        element: <OrderStatusPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/menu/:categorySlug",
        element: <CategoryCakes />,
      },
      {
        path: "/employee/login",
        element: <EmployeeLoginPage />,
      },
      {
        path: "/employee",
        element: (
          <EmployeeRoute>
            <EmployeeLayout />
          </EmployeeRoute>
        ),
        children: [
          { index: true, element: <EmployeeDashboardPage /> },
          { path: "orders", element: <EmployeeOrdersPage /> },
          { path: "profile", element: <EmployeeProfilePage /> },
        ],
      },
      { path: "/admin/login", element: <AdminLoginPage /> },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "products", element: <AdminProductsPage /> },
          { path: "reports", element: <AdminReportsPage /> },
          { path: "staff", element: <AdminStaffPage /> },
        ],
      },
    ],
  },
]);

export default router;