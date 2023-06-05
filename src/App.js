import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./Styles/AppTheme";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
// import { HeadComponent } from "./Styles/CommonStyles";
import Contracts from "./components/Home/Contracts";
import Footer from "./components/Footer/Footer";
import Dapps from "./components/Home/Dapps";
import Guide from "./components/Home/Guide";
import SingleProduct from "./components/Product/SingleProduct";
import OrderDetails from "./components/Checkout/OrderDetails";
import AdminNavbar from "./components/Navbar/AdminNavbar";
import { useContext, useEffect, useState } from "react";
import AdminHome from "./components/Admin/Home/Home";
import AdminOrderDetails from "./components/Admin/AdminOrderDetails/AdminOrderDetails";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import TermOfService from "./components/PrivacyPolicy/TermsOfService";
import RefundPolicy from "./components/PrivacyPolicy/RefundPolicy";
import LoginAndRegister from "./components/Login/LoginAndRegister";
import AllUsers from "./components/Admin/Users/AllUsers";
import ContextAPI, { DataProvider } from "./Context/ContextAPI";
import UserProfileUpdate from "./components/UserProfile/UserProfileUpdate";
import ViewUser from "./components/Admin/Users/ViewUser";
import Transactions from "./components/Admin/Transactions/Transactions";
import Login from "./components/Login/Login";
import Dashboard from "./components/Admin/Home/Dashboard";
import AddProduct from "./components/Admin/AddProduct/AddProduct";
import AllProducts from "./components/Admin/AddProduct/AllProducts";
import EditSingleProduct from "./components/Admin/AddProduct/EditSingleProduct";
import ProjectSettings from "./components/Admin/Settings/ProjectSettings";
import UpdateProfile from "./components/Admin/Settings/UpdateProfile";
import EditUser from "./components/Admin/Users/EditUser";
import Permissions from "./components/Admin/ManageRole/Permissions";
import AllRoles from "./components/Admin/ManageRole/AllRoles";
import EditRole from "./components/Admin/ManageRole/EditRole";
import ApproveUsers from "./components/Admin/Users/ApproveUsers";
import UserOrder from "./components/UserProfile/UserOrder";
import Protected from "./components/RouteSecurity/Protected";
import Public from "./components/RouteSecurity/Public";
import Page404 from "./components/NotFound/Page404";
import UserTransactions from "./components/UserTransactions/UserTransactions";
import EmployeeLogin from "./components/Admin/AdminAuth/EmployeeLogin";
import RegisterEmployee from "./components/Admin/AdminAuth/RegisterEmployee";
import GetAllEmployees from "./components/Admin/Employees/GetAllEmployees";
import EditEmployee from "./components/Admin/Employees/EditEmployee";
import AddCategory from "./components/Admin/Category/AddCategory";
import AllCategories from "./components/Admin/Category/AllCategories";
import EditCategory from "./components/Admin/Category/EditCategory";
// import SeeAllProducts from "./components/Home/SeeAllProducts";
import BankDetails from "./components/Admin/Settings/BankDetails";
import walletAddress from "./components/Admin/Wallet/walletAddress";
import SearchByCategory from "./components/Home/SearchByCategory";
import CookiesPolicy from "./components/PrivacyPolicy/CookiesPolicy";
import ResetPasswordBySettings from "./components/Login/ResetPasswordBySetting";
import Support from "./components/Navbar/Support";
import ForgetPassword from "./components/Login/ForgetPassword";
import DeliverySettings from "./components/Admin/Settings/DeliverySettings";
import EditDelivery from "./components/Admin/Settings/EditDelivery";
import CryptoPay from "./components/Checkout/CryptoPay";
import UserSingleProduct from "./components/Product/UserSingleProducts";

function App() {
  const [role, setRole] = useState(true);
  const { userRole } = useContext(DataProvider);
  console.log(userRole);

  const loginCheck = JSON.parse(localStorage.getItem("data"));
  // console.log(products);
  // console.log(loginCheck);
  //   useEffect(() => {
  //     if (!loginCheck) {
  //       navigate('/')
  //   }
  //   else if()

  // }, [loginCheck]);
  const loggedIn = localStorage.getItem("data");

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* {userRole === true ? ( */}
        {/* <> */}
        <Routes>
          {/* <Route path="/" element={<Public Component={Home} />} /> */}
          <Route path='/' element={<Public Component={Home} />} />
          <Route path='/admin' element={<EmployeeLogin />} />
          <Route
            path='/dashboard'
            element={<Protected Component={Dashboard} />}
          />
          <Route
            path='/register'
            element={<Public Component={LoginAndRegister} />}
          />
          <Route
            path='/api/v1/auth/password/reset/:id'
            element={<ForgetPassword />}
          />
          <Route path='/login' element={<Public Component={Login} />} />
          <Route path='/contracts' element={<Public Component={Contracts} />} />
          <Route
            path='/dapps/:category'
            element={<Public Component={Dapps} />}
          />
          <Route path='/guide' element={<Public Component={Guide} />} />
          <Route
            path='/userTransactions'
            element={<Public Component={UserTransactions} />}
          />
          <Route
            path='/product/:id'
            element={<Public Component={SingleProduct} />}
          />
          <Route
            path='/singleOrder/:id'
            element={<Protected Component={AdminHome} />}
          />
          <Route
            path='/adminOrderDetails'
            element={<Protected Component={AdminOrderDetails} />}
          />
          <Route
            path='/userOrders'
            element={<Public Component={UserOrder} />}
          />
          <Route path='*' element={<Page404 />} />
          <Route
            path='/profileManagement'
            element={<Public Component={UserProfileUpdate} />}
          />
          <Route
            path='/privacyPolicy'
            element={<Public Component={PrivacyPolicy} />}
          />
          <Route
            path='/termsOfService'
            element={<Public Component={TermOfService} />}
          />
          <Route
            path='/refundPolicy'
            element={<Public Component={RefundPolicy} />}
          />
          <Route
            path='/orderDetails'
            element={<Public Component={OrderDetails} />}
          />
          <Route
            path='/allUsers'
            element={<Protected Component={AllUsers} />}
          />
          <Route
            path='/admin/editUser/:id'
            element={<Protected Component={EditUser} />}
          />
          <Route
            path='/transactions'
            element={<Protected Component={Transactions} />}
          />
          <Route
            path='/addProduct'
            element={<Protected Component={AddProduct} />}
          />
          <Route
            path='/allProducts'
            element={<Protected Component={AllProducts} />}
          />
          <Route
            path='/updateProfile'
            element={<Protected Component={UpdateProfile} />}
          />
          <Route
            path='/projectSettings'
            element={<Protected Component={ProjectSettings} />}
          />
          <Route
            path='/addPermissions'
            element={<Protected Component={Permissions} />}
          />
          <Route
            path='/admin/viewUser/:id'
            element={<Protected Component={ViewUser} />}
          />
          <Route
            path='/allRoles'
            element={<Protected Component={AllRoles} />}
          />
          <Route
            path='/editSingleRole/:id'
            element={<Protected Component={EditRole} />}
          />
          <Route
            path='/approveUsers'
            element={<Protected Component={ApproveUsers} />}
          />
          <Route
            path='/editSingleProduct/:id'
            element={<Protected Component={EditSingleProduct} />}
          />
          //! Employee Routes Starts Here
          <Route
            path='/addEmployee'
            element={<Protected Component={RegisterEmployee} />}
          />
          <Route
            path='/allEmployees'
            element={<Protected Component={GetAllEmployees} />}
          />
          <Route
            path='/admin/editEmployee/:id'
            element={<Protected Component={EditEmployee} />}
          />
          //! Employee Routes Ends Here
          <Route
            path='/addCategory'
            element={<Protected Component={AddCategory} />}
          />
          <Route
            path='/allCategories'
            element={<Protected Component={AllCategories} />}
          />
          <Route
            path='/editCategory/:id'
            element={<Protected Component={EditCategory} />}
          />
          <Route
            path='/checkPermission'
            element={<Protected Component={SearchByCategory} />}
          />
          <Route
            path='/bankDetails'
            element={<Protected Component={BankDetails} />}
          />
          <Route
            path='/walletAddress'
            element={<Protected Component={walletAddress} />}
          />
          <Route
            path='/deliverySetup'
            element={<Protected Component={DeliverySettings} />}
          />
          <Route
            path='/editNation/:nationWide'
            element={<Protected Component={EditDelivery} />}
          />
          <Route
            path='/cookies'
            element={<Public Component={CookiesPolicy} />}
          />
          <Route
            path='/resetPassword'
            element={<Public Component={ResetPasswordBySettings} />}
          />
          <Route path='/support' element={<Public Component={Support} />} />
          <Route
            path='/api/v1/orders/getSingleOrder/:id'
            element={<UserSingleProduct />}
          />
          <Route path='/cryptoPay' element={<CryptoPay />} />
        </Routes>
        {/* </> */}
        {/* ) : ( */}
        {/* <> */}
        {/* <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<LoginAndRegister />} />
              <Route path='/login' element={<Login />} />
              <Route path='/contracts' element={<Contracts />} />
              <Route path='/dapps' element={<Dapps />} />
              <Route path='/guide' element={<Guide />} />
              <Route path='/product/:id' element={<SingleProduct />} />
              <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
              <Route path='/termsOfService' element={<TermOfService />} />
              <Route path='/refundPolicy' element={<RefundPolicy />} />
              <Route path='/userOrders' element={<UserOrder />} />
              <Route
                path='/profileManagement'
                element={<UserProfileUpdate />}
              />
              <Route path='/orderDetails' element={<OrderDetails />} />
            </Routes> */}
        {/* </> */}
        {/* )} */}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
