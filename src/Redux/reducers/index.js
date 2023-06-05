import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import RegisterReducer from "./RegisterReducer";
import ValidateOTPReducer from "./validateOTP";
import logoutReducer from "./logout";
import AddProductReducer from "./AddProductReducer";
import AllProductsReducer from "./allProductsReducer";
import DeleteProductReducer from "./DeleteProductReducer";
import AllProductsUserReducer from "./AllProductsUser";
import singleProductReducer from "./singleProductReducer";
import PlaceOrderReducer from "./PlaceOrderReducer";
import getAllOrdersReducer from "./getAllOrdersReducer";
import DeleteSingleOrderReducer from "./DeleteSingleOrder";
import UpdateOrderStatusReducer from "./UpdateOrderStatus";
import UpdateProductReducer from "./UpdateProductReducer";
import GetAllUsersReducer from "./GetAllUsersReducer";
import getSingleUserReducer from "./getSingleUser";
import UserBanUnbanReducer from "./userApproved";
import CreateRollAndPermissionReducer from "./CreateRoleAndPermissionReducer";
import GetAllRoleReducer from "./GetAllRoleReducer";
import DeleteRoleReducer from "./DeleteRoleReducer";
import getSingleRoleReducer from "./GetSingleRole";
import UpdateRoleReducer from "./UpdateSingleRole";
import UpdateUserByReducer from "./UpdateUserByAdmin";
import UpdateUserByAdminReducer from "./UpdateUserByAdminReducer";
import DeleteUserByAdminReducer from "./DeleteUserByAdminReducer";
import UpdateUserReducer from "./UpdateUserReducer";
import CreateShippingReducer from "./CreateShippingReducer";
import GetUserOrdersReducer from "./GetUserOrders";
import GetUserDetailsReducer from "./GetUserDetails";
import ResetPasswordReducer from "./ResetPasswordReducer";
import ForgetPasswordReducer from "./ForgetPasswordReducer";
import LoginEmployeeReducer from "./AdminReducers/LoginEmployeeReducer";
import GetEmployeeDetailsReducer from "./AdminReducers/GetEmployeeDetailsReducer";
import GetAllEndPointsReducer from "./GetAllEndPointsReducer";
import GetSingleEmployeeReducer from "./AdminReducers/GetSingleEmployee";
import GetAllEmployeesReducer from "./AdminReducers/GetAllEmployees";
import GetAllCategoriesReducer from "./GetAllCategories";
import GetFilteredOrdersReducer from "./GetFilteredOrders";
import GetSingleOrdersReducer from "./GetSingleOrder";
import EditCategoryReducer from "./EditCategory";
import GetSingleOrderAdminReducer from "./GetSingleOrderAdmin";
import GetPermissionValidation from "./GetPermissionValidation";
import GetDeliveryDateByNation from "./GetDeliveryDateByNation";
import GetAllDeliveryDates from "./GetAllDeliveryDates";
import UpdateDeliveryDate from "./UpdateDeliveryDate";

const rootReducer = combineReducers({
  loginReducer,
  RegisterReducer,
  ValidateOTPReducer,
  logoutReducer,
  AddProductReducer,
  AllProductsReducer,
  DeleteProductReducer,
  AllProductsUserReducer,
  singleProductReducer,
  PlaceOrderReducer,
  getAllOrdersReducer,
  DeleteSingleOrderReducer,
  UpdateOrderStatusReducer,
  UpdateProductReducer,
  GetAllUsersReducer,
  getSingleUserReducer,
  CreateRollAndPermissionReducer,
  GetAllRoleReducer,
  DeleteRoleReducer,
  getSingleRoleReducer,
  UpdateRoleReducer,
  UpdateUserByReducer,
  UpdateUserByAdminReducer,
  DeleteUserByAdminReducer,
  UpdateUserReducer,
  CreateShippingReducer,
  GetUserOrdersReducer,
  GetUserDetailsReducer,
  ResetPasswordReducer,
  ForgetPasswordReducer,
  LoginEmployeeReducer,
  GetEmployeeDetailsReducer,
  GetAllEndPointsReducer,
  GetAllEmployeesReducer,
  GetSingleEmployeeReducer,
  GetAllCategoriesReducer,
  GetFilteredOrdersReducer,
  GetSingleOrdersReducer,
  EditCategoryReducer,
  GetSingleOrderAdminReducer,
  GetPermissionValidation,
  GetDeliveryDateByNation,
  GetAllDeliveryDates,
  UpdateDeliveryDate,
});

export default rootReducer;
