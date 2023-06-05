import {
  instance,
  instanceDelete,
  instanceGet,
  instanceNonAuth,
  instancePost,
  instancePut,
} from "../../config";
import Swal from "sweetalert2";

// ? Login Action Starts here

export const loginEmployeeAction = (loginValues) => async (dispatch) => {
  try {
    const response = await instancePost(
      "api/v1/employee/loginEmployee",
      loginValues
    );
    console.log(response);

    if (response.data.success === true) {
      Swal.fire("Login Successfully", response.data.message, "success", {
        buttons: false,
        timer: 2000,
      });
      // const returnObj={type:'login',payload:response}
      dispatch({ type: "loginEmployee", payload: response });
      localStorage.setItem("token", response?.data?.token);
      sessionStorage.setItem("authToken", response?.data?.token);
      // await setTimeout(() => {
      localStorage.setItem("employee", JSON.stringify(response.data));
      // }, 2000);

      return response;
    }
  } catch (error) {
    Swal.fire("Login Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    return error.response;
  }
};
// ? Login Action Ends here

// ?Get Employee Details Action starts here
export const GetEmployeeDetailsAction = () => async (dispatch) => {
  // let accessToken = localStorage.getItem("token");
  try {
    console.log("thisIsInstance", instance, localStorage.getItem("token"));
    const response = await instanceGet(`api/v1/employee/getEmployeeDetails`);
    // const response = await axios({
    //   url: "https://gbs-ecomm.vercel.app/api/v1/employee/getEmployeeDetails",
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    console.log("token", response);

    if (response.data.success === true) {
      console.log("Got Employee Details Successfully", response);

      dispatch({ type: "getEmployeeData", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};
// ?Get Employee Details Action Ends here

// ? Register Employee
export const registerEmployeeAction = (registerValues) => async (dispatch) => {
  console.log(registerValues);
  try {
    let response = await instancePost(
      "api/v1/employee/registerEmployee",
      registerValues
    );
    if (response.data.success === true) {
      Swal.fire(
        "Registered Employee Successfully",
        response.data.message,
        "success",
        {
          buttons: false,
          timer: 2000,
        }
      );
      dispatch({ type: "registerEmployee", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire("Registration Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    return error.response;
  }
};
// ? Register Employees starts from here

// ? Get All Employees starts here
export const GetAllEmployeeAction = () => async (dispatch) => {
  try {
    let response = await instanceGet("api/v1/employee/admin/getAllEmployees");
    console.log("Get All Employees", response);
    if (response.data.success === true) {
      dispatch({ type: "getAllEmployee", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire("Get All Employees", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    return error.response;
  }
};
// ? Get All Employees ends here

// ? Get single Employee start here

export const getSingleEmployeeAction = (id) => async (dispatch) => {
  console.log(id);
  try {
    let response = await instanceGet(
      `api/v1/employee/admin/getsindleEmployeeByAdmin/${id}`
    );
    if (response.data.success === true) {
      dispatch({ type: "getSingleEmployee", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire(
      "Get Single Employee Failed",
      error.response.data.error,
      "error",
      {
        buttons: false,
        timer: 2000,
      }
    );
    return error.response;
  }
};

// ? Get single Employee ends here

// ? Update Employee Profile start here
// ? No Reducer
export const updateEmployeeProfileAction =
  (name, email, password) => async (dispatch) => {
    console.log(name, email, password);
    try {
      let response = await instancePut(
        `api/v1/employee/updateEmployeeProfile`,
        {
          name: name,
          email: email,
          password: password,
        }
      );
      if (response.data.success === true) {
        Swal.fire(
          "Updated Profile Successfully",
          response.data.message,
          "success",
          {
            buttons: false,
            timer: 2000,
          }
        );
        dispatch({ type: "updateEmployeeProfile", payload: response });
        return response;
      }
    } catch (error) {
      Swal.fire(
        "Update Employee Profile Failed",
        error.response.data.error,
        "error",
        {
          buttons: false,
          timer: 2000,
        }
      );
      return error.response;
    }
  };

// ? Update Employee Profile  ends here

// ? Update Employee Profile By Admin start here
// ? No Reducer
export const updateEmployeeByAdminAction =
  (id, name, email, password, role) => async (dispatch) => {
    // console.log(values);
    try {
      let response = await instancePut(
        `api/v1/employee/admin/updateEmployeeByAdmin/${id}`,
        {
          name: name,
          email: email,
          password: password,
          role: role,
        }
      );
      if (response.data.success === true) {
        Swal.fire(
          "Updated Employee Successfully",
          response.data.message,
          "success",
          {
            buttons: false,
            timer: 2000,
          }
        );
        dispatch({ type: "updateEmployeeProfile", payload: response });
        return response;
      }
    } catch (error) {
      Swal.fire(
        "Update Employee Profile Failed",
        error.response.data.error,
        "error",
        {
          buttons: false,
          timer: 2000,
        }
      );
      return error.response;
    }
  };

// ? Update Employee Profile  ends here

// ? Delete Employee Profile By Admin start here
// ? No Reducer
export const deleteEmployeeByAdminAction = (id) => async (dispatch) => {
  console.log(id);
  try {
    let response = await instanceDelete(
      `api/v1/employee/admin/deleteEmployeeByAdmin/${id}`
    );
    if (response.data.success === true) {
      Swal.fire(
        "Deleted Employee Successfully",
        response.data.message,
        "success",
        {
          buttons: false,
          timer: 2000,
        }
      );
      dispatch({ type: "deleteEmployee", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire("Delete Employee Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    return error.response;
  }
};

// ? Update Employee Profile  ends here
