import Swal from "sweetalert2";
import {
  instance,
  instanceDelete,
  instanceGet,
  instanceNonAuth,
  instancePost,
  instancePut,
} from "../../config";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

// ! Login And Register Action Starts here
export const registerAction = (registerValues) => async (dispatch) => {
  console.log(registerValues);
  try {
    let response = await instancePost("api/v1/auth/register", {
      name: registerValues?.name,
      userName: registerValues?.userName,
      email: registerValues?.email,
      surname: registerValues?.surname,
      country: registerValues?.country,
      city: registerValues?.city,
      street: registerValues?.street,
      vat: registerValues?.vat,
      password: registerValues?.password,
    });
    if (response.data.success === true) {
      Swal.fire(
        "Registered Successfully",
        `OTP code sent successfully to ${registerValues.email}, please check & confirm your
      email.`,
        "success",
        {
          buttons: false,
          timer: 2000,
        }
      );
      dispatch({ type: "register", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire("Register Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    return error.response;
  }
};

//! this action sends links
// ? Reset Password Starts here
export const ResetPasswordAction = (email) => async (dispatch) => {
  console.log(email);
  try {
    const response = await instancePost("api/v1/auth/password/forgot", {
      email: email,
    });
    console.log(response);
    if (response.data.success === true) {
      Swal.fire("Email Sent Successfully", response.data.message, "success", {
        buttons: false,
        timer: 2000,
      });
      dispatch({ type: "resetPassword", payload: response });

      return response;
    }
  } catch (error) {
    Swal.fire("Reset Password Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
  }
};
//!this action is forgetPassword
export const ForgetPasswordAction = (values, id) => async (dispatch) => {
  console.log(values);
  try {
    const response = await instancePut(`api/v1/auth/password/reset/${id}`, {
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
    console.log(response);
    if (response.data.success === true) {
      Swal.fire(
        "Password Changed Successfully",
        response.data.message,
        "success",
        {
          buttons: false,
          timer: 2000,
        }
      );
      dispatch({ type: "forgetPassword", payload: response });

      return response;
    }
  } catch (error) {
    Swal.fire("Reset Password Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
  }
};

// ? Reset Password Ends here

//Reset Password By Setting
export const ResetPasswordBySettingAction = (values) => async (dispatch) => {
  // console.log(oldPassword, password, confirmPassword);
  try {
    const response = await instancePut("api/v1/users/password-update", {
      oldPassword: values.oldPassword,
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    });
    console.log(response);
    if (response.data.success === true) {
      Swal.fire(
        "Password Changed Successfully",
        response.data.message,
        "success",
        {
          buttons: false,
          timer: 2000,
        }
      );
      dispatch({ type: "forgetPassword", payload: response });

      return response;
    }
  } catch (error) {
    Swal.fire("Reset Password Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
  }
};

export const loginAction = (loginValues) => async (dispatch) => {
  try {
    const response = await instancePost("api/v1/auth/login", loginValues);
    console.log(response.data);
    if (response.status === 201) {
      Swal.fire("Login Failed", response.data.message, "info", {
        buttons: false,
        timer: 2000,
      });
      // const returnObj={type:'login',payload:response}
      dispatch({ type: "login", payload: response });
      return response;
      // localStorage.setItem("data", JSON.stringify(response.data));
    }
    if (response.status === 200) {
      Swal.fire("Login Successfully", response.data.message, "success", {
        buttons: false,
        timer: 2000,
      });
      localStorage.setItem("token", response?.data?.token);

      // const returnObj={type:'login',payload:response}
      dispatch({ type: "login", payload: response });
      localStorage.setItem("data", JSON.stringify(response.data));
      return response;
    }
  } catch (error) {
    Swal.fire(
      "Login Failed",
      "please double check or change your Password",
      "error",
      {
        buttons: false,
        timer: 2000,
      }
    );
    return error.response;
  }
};

// ! Validate OTP After Registration

export const validateOTPAction = (email, otp) => async (dispatch) => {
  console.log(email, otp);
  try {
    const response = await instancePost("api/v1/auth/validateOTP", {
      email: email,
      otp: otp,
    });
    console.log(response);

    if (response.data.success === true) {
      Swal.fire({
        title: "<strong>OTP Verified</strong>",
        icon: "success",
        html: "Account Confirmed, please login",
        confirmButtonText: "Login",
      });
      dispatch({ type: "validateOTP", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire("Login Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
  }
};

//! Logout Code Starts from here
export const logoutAction = (data) => async (dispatch) => {
  console.log();
  try {
    const response = await instanceGet("api/v1/auth/logout");
    console.log(response);
    if (data === "employee") {
      if (response.data.success === true) {
        Swal.fire("Logout Successfully", "", "success", {
          buttons: false,
          timer: 2000,
        });
        dispatch({ type: "logout", payload: response });
        localStorage.removeItem("token");
        localStorage.removeItem("employee");
        sessionStorage.removeItem("authToken");
        return response;
      }
    } else if (response.data.success === true) {
      Swal.fire("Successfully disconnected,", "See you soon!", "success", {
        buttons: false,
        timer: 2000,
      });
      dispatch({ type: "logout", payload: response });
      localStorage.removeItem("token");
      localStorage.removeItem("data");
      sessionStorage.removeItem("authToken");
      return response;
    }
  } catch (error) {
    Swal.fire("Login Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
  }
};

//! to resend the otp when time expires.
export const resentOTPAction = (email, otp) => async (dispatch) => {
  console.log(email, otp);
  try {
    const response = await instancePost(`api/v1/validateOTP/${email}`, {
      otp: otp,
    });
    console.log(response);
    if (response.data.success === true) {
      Swal.fire("OTP Verified", response.data.message, "success", {
        buttons: false,
        timer: 2000,
      });
      dispatch({ type: "validateOTP", payload: response });
      return response;
    }
  } catch (error) {
    Swal.fire("Login Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
  }
};

// ! Login And Register Action Ends here

// ! Product Section Starts from here

// ? Add Product Starts here

export const AddProductAction =
  (title, price, description, category, images, stock, productType) =>
  async (dispatch) => {
    // (form) => async (dispatch) => {
    console.log(title, price, description, category, images, productType);
    // console.log(...form);
    try {
      const response = await instancePost(
        "api/v1/products/admin/createProduct",
        JSON.stringify({
          name: title,
          price: price,
          description: description,
          category: category,
          images: images,
          stock: stock,
          productType: productType,
        })
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }

        // form,
      );
      // console.log(response);
      if (response.data.success === true) {
        Swal.fire("Product Added Successfully", "", "success", {
          buttons: false,
          timer: 2000,
        });
        dispatch({ type: "addProduct", payload: response });
        return response;
      }
      return response;
    } catch (error) {
      Swal.fire("Add Product Failed", error.response.data.error, "error", {
        buttons: false,
        timer: 2000,
      });
      console.log(error);
      return error.response;
    }
  };

// ? Add Product Ends here

// ? Update Product Starts here

export const UpdateProductAction =
  (
    title,
    price,
    description,
    category,
    images,
    stock,
    productType,
    productId
  ) =>
  async (dispatch) => {
    console.log(productId);
    try {
      const response = await instancePut(
        `api/v1/products/admin/updateProduct/${productId}`,
        JSON.stringify({
          name: title,
          price: price,
          description: description,
          category: category,
          images: images,
          stock: stock,
          productType: productType,
        })
      );
      if (response.data.success === true) {
        Swal.fire("Product Update Successfully", "", "success", {
          buttons: false,
          timer: 2000,
        });
        dispatch({ type: "updateProduct", payload: response });
        return response;
      }
      return response;
    } catch (error) {
      Swal.fire("Update Product Failed", error.response.data.error, "error", {
        buttons: false,
        timer: 2000,
      });
      console.log(error);
      return error.response;
    }
  };

// ? Update Product Ends here

// ? All Product Starts here
export const AllProductsAction = () => async (dispatch) => {
  try {
    const response = await instanceGet(
      "api/v1/products/admin/allProductsByAdmin"
    );
    console.log(response);
    if (response.data.success === true) {
      // Swal.fire("Product Added Successfully", "", "success", {
      //   buttons: false,
      //   timer: 2000,
      // });
      dispatch({ type: "allProducts", payload: response });
      return response;
    }
    return response;
  } catch (error) {
    Swal.fire("Fetching Products Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
    return error.response;
  }
};

// ? All Product Ends here

// ? All Product Starts here
export const AllProductsUserAction =
  (gte, lte, category = "") =>
  // console.log(gte, lte);
  async (dispatch) => {
    console.log(category);
    let response = "";
    try {
      if (!category) {
        response = await instanceGet(`api/v1/products/getallproducts`);
        if (response.data.success === true) {
          dispatch({ type: "allProductsUser", payload: response });
          return response;
        }
      }
      if (category || gte || lte) {
        console.log("Category");
        response = await instanceGet(
          `api/v1/products/getallproducts?price[gte]=${gte}&price[lte]=${lte}&category=${category}`
        );
      } else {
        console.log("All");
        response = await instanceGet(
          `api/v1/products/getallproducts?price[gte]=${gte}&price[lte]=${lte}&category=${category}`
        );
      }
      // ?price[gte]=${gte}&price[lte]=${lte}&category=${category}
      // `api/v1/products/getallproducts?price[gte]=${gte}&price[lte]=${lte}&category=${category}`

      console.log(response);
      if (response.data.success === true) {
        // Swal.fire("Product Added Successfully", "", "success", {
        //   buttons: false,
        //   timer: 2000,
        // });
        dispatch({ type: "allProductsUser", payload: response });
        return response;
      }
      return response;
    } catch (error) {
      Swal.fire("Fetching Products Failed", error.response, "error", {
        buttons: false,
        timer: 2000,
      });
      console.log(error);
      return error.response;
    }
  };

// ? All Product Ends here

// ? Single Product Fetch Starts here
export const SingleProductAction = (id) => async (dispatch) => {
  try {
    let response = await instanceGet(`api/v1/products/getProductDetail/${id}`);
    console.log(response);
    if (response.data.success === true) {
      // Swal.fire("Product Added Successfully", "", "success", {
      //   buttons: false,
      //   timer: 2000,
      // });
      dispatch({ type: "singleProduct", payload: response });
      return response;
    }
    return response;
  } catch (error) {
    Swal.fire("Fetching Products Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
    return error.response;
  }
};

// ? Single Product Ends here

// ? Place Product Fetch Starts here
export const placeOrderAction =
  (
    shippingInfo,
    products,
    itemPrice,
    shippingPrice,
    totalPrice,
    businessName,
    businessAddress,
    vat,
    paymentInfo
  ) =>
  async (dispatch) => {
    console.log(
      shippingInfo,
      products,
      itemPrice,
      shippingPrice,
      totalPrice,
      businessName,
      businessAddress,
      vat,
      paymentInfo
    );
    // let paymentInfo = { id: "sample payment info", status: "succeeded" };
    try {
      let data = JSON.stringify({
        shippingInfo: shippingInfo,
        orderItems: products,

        paymentInfo: paymentInfo,

        itemsPrice: itemPrice,

        shippingPrice: shippingPrice,

        businessName: businessName,
        businessAddress: businessAddress,
        vat: vat,
        paymentInfo: paymentInfo,
      });
      // let response = await instancePost(`api/v1/order/new`, {
      //   shippingInfo: shippingInfo,
      //   orderItems: products,
      //   itemPrice: itemPrice,

      //   shippingPrice: shippingPrice,
      //   totalPrice: totalPrice,
      // });

      let response = await instancePost(`api/v1/orders/createOrder`, data);
      console.log("IdOfOrder", response);

      if (response.data.success === true) {
        Swal.fire(
          "Product Placed Successfully",
          ` ${response?.data?.message}`,
          "success",
          {
            buttons: false,
            timer: 2000,
          }
        );
        console.log(response);
        dispatch({ type: "placeOrder", payload: response });
        return response;
      }
      return response;
    } catch (error) {
      Swal.fire("Placing Order Failed", error.response.data.error, "error", {
        buttons: false,
        timer: 2000,
      });
      console.log(error);
      return error.response;
    }
  };

// ? Place Product Ends here

// ? Delete Product Starts here
export const deleteProductAction = (id) => async (dispatch) => {
  console.log("Index1" + id);
  try {
    const response = await instanceDelete(
      `api/v1/products/admin/deleteProduct/${id}`
    );
    console.log(response);
    if (response.data.success === true) {
      Swal.fire("Deleted Successfully", "", "success", {
        buttons: false,
        timer: 2000,
      });
      dispatch({ type: "deleteProduct", payload: response });
      return response;
    }
    return response;
  } catch (error) {
    Swal.fire("Delete Product Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
    return error.response;
  }
};
// ? Delete Product Starts here

// ! Product Section Ends from here

// ! Order Section Starts From here

// ? Get all orders Starts here

export const getAllOrderAction = () => async (dispatch) => {
  try {
    const response = await instanceGet(`api/v1/orders/admin/getAllOrders`);
    console.log(response);
    if (response.data.success === true) {
      // Swal.fire("Deleted Successfully", "", "success", {
      //   buttons: false,
      //   timer: 2000,
      // });
      dispatch({ type: "getAllOrders", payload: response });
      return response;
    }
    return response;
  } catch (error) {
    Swal.fire("Get All Orders Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
    return error.response;
  }
};
// ? Get All orders Starts here

// ? Get User Orders Starts here
export const GetUserOrdersAction = () => async (dispatch) => {
  try {
    const response = await instanceGet(`api/v1/orders/getUserOrders`);
    console.log(response);
    if (response.data.success === true) {
      // Swal.fire("Deleted Successfully", "", "success", {
      //   buttons: false,
      //   timer: 2000,
      // });
      dispatch({ type: "getUserOrders", payload: response });
      return response;
    }
    return response;
  } catch (error) {
    Swal.fire("Get All Orders Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
    return error.response;
  }
};
// ? Get User Orders Ends here

// ? Get All orders Starts here

// ? Delete Orders Starts here
export const DeleteOrderAction = (id) => async (dispatch) => {
  console.log("Index" + id);
  try {
    const response = await instanceDelete(`api/v1/admin/order/${id}`);
    console.log(response);
    if (response.data.success === true) {
      Swal.fire("Deleted Successfully", "", "success", {
        buttons: false,
        timer: 2000,
      });
      dispatch({ type: "deleteOrder", payload: response });
      return response;
    }
    return response;
  } catch (error) {
    Swal.fire("Delete Product Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
    return error.response;
  }
};
// ? Delete Orders Starts here

// ? Update Orders Starts here
export const UpdateOrderStatusAction = (id, status) => async (dispatch) => {
  console.log("Index" + id, " Status" + status);
  try {
    const response = await instancePut(
      `api/v1/orders/admin/updateOrder/${id}`,
      {
        status: status,
      }
    );
    console.log(response);
    if (response.data.success === true) {
      Swal.fire("Status Changed Successfully", "", "success", {
        buttons: false,
        timer: 2000,
      });
      dispatch({ type: "orderStatusChanged", payload: response });
      return response;
    }
    return response;
  } catch (error) {
    Swal.fire("Status Changed Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
    return error.response;
  }
};
// ? UPDATE Orders Starts here

// ! Order Section Ends From here

// ! USER's CRUD Starts Here
// ? Get All Users Starts

export const getAllUsersAction = () => async (dispatch) => {
  try {
    const response = await instanceGet(`api/v1/users/admin/getallusers`);

    if (response.data.success === true) {
      console.log("Get All Users Successfully", response);
      // Swal.fire("Get All Users Successful", response.data.message, "success", {
      //   buttons: false,
      //   timer: 2000,
      // });
      // const retrnObj = { type: "getAllUsers", payload: response };
      // console.log("getUsers", retrnObj);
      dispatch({ type: "getAllUsers", payload: response });
      return response.data;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};
// ? Get All Users Ends

// ? Get Single User Start

export const getSingleUserAction = (id) => async (dispatch) => {
  console.log(id);
  try {
    const response = await instanceGet(
      `api/v1/users/admin/getSingleUser/${id}`
    );

    if (response.data.success === true) {
      console.log("Get Single User Successfully", response);
      // Swal.fire("Get All Users Successful", response.data.message, "success", {
      //   buttons: false,
      //   timer: 2000,
      // });
      const retrnObj = { type: "getSingleUser", payload: response };
      console.log("getSingleUser", retrnObj);
      dispatch(retrnObj);
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

// ? Get Single User Ends

export const getUserApprovedAction =
  (id, approveByAdmin) => async (dispatch) => {
    console.log(id);
    console.log(approveByAdmin);

    try {
      const response = await instancePut(
        `api/v1/users/admin/userApproval/${id}`,
        {
          approvalByAdmin: approveByAdmin,
        }
      );

      if (response.data.success === true) {
        console.log("User Approved Successfully", response);
        Swal.fire(
          `User ${approveByAdmin ? "Approved" : "Banned"} Successful`,
          response.data.message,
          "success",
          {
            buttons: false,
            timer: 2000,
          }
        );
        const retrnObj = { type: "userBanUnban", payload: response };
        console.log("userBanUnban", retrnObj);
        dispatch(retrnObj);
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire(
        "error",
        error.response.data.error,
        "error",

        {
          buttons: false,
          timer: 2000,
        }
      );
    }
  };
// ? Get User Approve, Ban  Ends

// ? Update User By Admin Starts here
export const UpdateUserByAdminAction =
  (id, name, username, role) => async (dispatch) => {
    console.log(id, name, username, role);
    try {
      const response = await instancePut(
        `api/v1/users/admin/updateUser/${id}`,
        {
          name: name,
          userName: username,
          role: role,
        }
      );

      if (response.data.success === true) {
        console.log("User Updated Successfully", response);
        Swal.fire("User Updated Successfully", "", "success", {
          buttons: false,
          timer: 2000,
        });

        console.log("updateUserByAdmin", response?.data);
        dispatch({ type: "updateUserByAdmin", payload: response });
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire(
        "error",
        error.response.data.error,
        "error",

        {
          buttons: false,
          timer: 2000,
        }
      );
    }
  };

// ? Update User By Admin Ends here

// ? Update User  Starts here
export const UpdateUserAction =
  (name, username, surname, country, city, street, vat, avatar) =>
  async (dispatch) => {
    console.log(name, username, avatar);
    try {
      const response = await instancePut(`api/v1/users/updateProfile`, {
        name: name,
        userName: username,
        avatar: avatar,
        surname: surname,
        country: country,
        city: city,
        street: street,
        vat: vat,
      });

      if (response.data.success === true) {
        console.log("Profile Updated Successfully", response);
        Swal.fire("Profile Updated Successfully", "", "success", {
          buttons: false,
          timer: 2000,
        });

        console.log("updateUser", response?.data);
        dispatch({ type: "updateUser", payload: response });
        return response;
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire(
        "error",
        error.response.data.error,
        "error",

        {
          buttons: false,
          timer: 2000,
        }
      );
    }
  };

// ? Update User  Ends here

// ? Delete User By Admin Starts here
export const DeleteUserByAdminAction = (id) => async (dispatch) => {
  try {
    const response = await instanceDelete(
      `api/v1/users/admin/deleteUsers/${id}`
    );

    if (response.data.success === true) {
      console.log("User Deleted Successfully", response);
      Swal.fire("User Deleted Successfully", response.data.message, "success", {
        buttons: false,
        timer: 2000,
      });

      dispatch({ type: "deleteUser", payload: response });
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

// ? Delete User By Admin Ends here

// ! USER's CRUD Ends Here

// ! Create Roll And Permissions Starts Here

// ? Create Roll And Permission Action Starts here

export const CreateRollAndPermissionAction =
  (role, permissions) => async (dispatch) => {
    console.log(role, permissions);
    try {
      const response = await instancePost(`api/v1/roles/createRole`, {
        role: role,
        permissions: permissions,
      });

      if (response.data.success === true) {
        console.log("Role Created Successfully", response);
        Swal.fire(
          "Role Created Successfully",
          response.data.message,
          "success",
          {
            buttons: false,
            timer: 2000,
          }
        );

        dispatch({ type: "createRole", payload: response });
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire(
        "error",
        error.response.data.error,
        "error",

        {
          buttons: false,
          timer: 2000,
        }
      );
    }
  };

// ? Create Roll And Permission Action Starts here

// ? Get All Roles Action Starts here

export const GetAllRoleAction = () => async (dispatch) => {
  try {
    const response = await instanceGet(`api/v1/roles/getAllRoles`);

    if (response.data.success === true) {
      console.log("Role Get Successfully", response);

      dispatch({ type: "getRoles", payload: response });
      return response.data;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

// ? Get All ROle Action Ends here

// ? Delete  Roles Action Starts here

export const DeleteRoleAction = (id) => async (dispatch) => {
  try {
    const response = await instanceDelete(`api/v1/roles/deleteRole/${id}`);

    if (response.data.success === true) {
      console.log("Role Deleted Successfully", response);
      Swal.fire("Role Deleted Successfully", response.data.message, "success", {
        buttons: false,
        timer: 2000,
      });

      dispatch({ type: "deleteRole", payload: response });
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

// ? Delete  Roles Action Starts here

// ? Get Single Role Start

export const getSingleRoleAction = (id) => async (dispatch) => {
  console.log(id);
  try {
    const response = await instanceGet(`api/v1/roles/getSingleRole/${id}`);

    if (response.data.success === true) {
      console.log("Get Single Role Successfully", response);
      // Swal.fire("Get All Users Successful", response.data.message, "success", {
      //   buttons: false,
      //   timer: 2000,
      // });
      const retrnObj = { type: "getSingleRole", payload: response };
      console.log("getSingleRole", retrnObj);
      dispatch(retrnObj);
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

// ? Get Single Role Ends

// ? Get All End Point Start

export const GetAllEndPointsAction = (id) => async (dispatch) => {
  console.log(id);
  try {
    const response = await instanceGet(`api/v1/getAllEndPoints`);

    console.log("Get All End Points Successfully", response);
    if (response.data.count) {
      // Swal.fire("Get All Users Successful", response.data.message, "success", {
      //   buttons: false,
      //   timer: 2000,
      // });
      const retrnObj = { type: "getAllEndPoints", payload: response };
      console.log("getAllEndsPoints", retrnObj);
      dispatch(retrnObj);
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

// ? Get All End Points Ends

// ? Update Single Role Start

export const UpdateRoleAction = (id, role, permissions) => async (dispatch) => {
  console.log(id);
  try {
    const response = await instancePut(`api/v1/roles/updateRole/${id}`, {
      role: role,
      permissions: permissions,
    });

    if (response.data.success === true) {
      console.log("Role Updated Successfully", response);
      Swal.fire("Role Updated Successfully", response.data.message, "success", {
        buttons: false,
        timer: 2000,
      });
      const retrnObj = { type: "updateSingleRole", payload: response };
      console.log("updateSingleRole", retrnObj);
      dispatch(retrnObj);
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

// ? Update Single Role Ends

// ! Create Roll And Permissions Ends here

// ! Shipping CRUD Starts here

// ? Add Shipping Info Starts here

export const AddShippingAction =
  (country, nation, worldwide) => async (dispatch) => {
    console.log(country, nation, worldwide);
    const lowerCountry = country.toLowerCase();
    console.log(lowerCountry);
    try {
      const response = await instancePost(`api/v1/tax/createTax`, {
        country: country,
        nationShipping: nation,
        worldShipping: worldwide,
      });

      if (response.data.success === true) {
        console.log("Shipping added Successfully", response);
        Swal.fire(
          "Shipping Added Successfully",
          response.data.message,
          "success",
          {
            buttons: false,
            timer: 2000,
          }
        );

        dispatch({ type: "createShipping", payload: response });
        return response;
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire(
        "error",
        error.response.data.error,
        "error",

        {
          buttons: false,
          timer: 2000,
        }
      );
    }
  };
// ? Add Shipping Info Ends here

// ? Add Shipping Info Starts here

export const FetchShippingAction = () => async (dispatch) => {
  try {
    const response = await instanceGet(`api/v1/tax/getAllTaxes`);

    if (response.data.success === true) {
      console.log("Got shipping taxes Successfully", response);

      dispatch({ type: "fetchShipping", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    // Swal.fire(
    //   "error",
    //   error.response.data.error,
    //   "error",

    //   {
    //     buttons: false,
    //     timer: 2000,
    //   }
    // );
  }
};
// ? Add Shipping Info Ends here

// !  Shipping CRUD Ends here

// !  Get User Details Details Starts here
export const GetUserDetailsAction = () => async (dispatch) => {
  try {
    const response = await instanceGet(`api/v1/users/getUserDetail`);

    if (response.data.success === true) {
      console.log("Got User Details Successfully", response);

      dispatch({ type: "getUserData", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};

// !  Get User Details Details Starts here

// !  Get All Categories Starts here
export const GetAllCategoriesAction = () => async (dispatch) => {
  try {
    const response = await instanceGet(`api/v1/products/getProductCategories`);
    console.log(response);
    if (response.data.success === true) {
      console.log("Got All Categories", response);

      dispatch({ type: "getCategories", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};

// !  Get User Details Details Starts here

// !  Get Filtered Orders Starts here
export const GetFilteredOrdersAction =
  (from = "", to = "", status = "") =>
  async (dispatch) => {
    console.log(from, to, status);
    console.log("huurrraahhh");
    try {
      if (status) {
        const response = await instanceGet(
          `api/v1/orders/admin/getFilteredOrder?updatedAt[gte]=${from}&updatedAt[lte]=${to}&orderStatus=${status}`
        );
        console.log(response);
        if (response.data.success === true) {
          console.log("Got Filtered Orders", response);

          dispatch({ type: "getFilteredOrders", payload: response });
          return response;
        }
      } else {
        const response = await instanceGet(
          `api/v1/orders/admin/getFilteredOrder`
        );

        console.log(response);
        if (response.data.success === true) {
          console.log("Got Filtered Orders", response);

          dispatch({ type: "getFilteredOrders", payload: response });
          return response;
        }
      }
    } catch (error) {
      console.log("error", error);
      return error.response;
    }
  };

// !  Get Filtered Orders Ends here

// !Get Single order

export const getSingleOrderAction = (id) => async (dispatch) => {
  console.log(id);
  try {
    const response = await instanceGet(`api/v1/orders/getSingleOrder/${id}`);

    if (response.data.success === true) {
      console.log("Get Single Order Successfully", response);

      const retrnObj = { type: "getSingleOrder", payload: response };
      console.log("getSingleOrder", retrnObj);
      dispatch(retrnObj);
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "Get Single Order Failed",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

//! Single Order By Admin
export const getSingleOrderAdminAction = (id) => async (dispatch) => {
  console.log(id);
  try {
    const response = await instanceGet(
      `api/v1/orders/getSingleOrderByAdmin/${id}`
    );

    if (response.data.success === true) {
      console.log("Get Single Order Successfully", response);

      const retrnObj = { type: "getSingleOrderAdmin", payload: response };
      console.log("getSingleOrderAdmin", retrnObj);
      dispatch(retrnObj);
      return response?.data;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "Get Single Order Failed",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

//! Category Crud Starts from here

export const AddCategoryAction = (category) => async (dispatch) => {
  try {
    const response = await instancePost(`api/v1/category/createCategory`, {
      category,
    });

    if (response.data.success === true) {
      console.log("Category added Successfully", response);
      Swal.fire(
        "Added Category Successfully",
        response.data.message,
        "success",

        {
          buttons: false,
          timer: 2000,
        }
      );

      const retrnObj = { type: "addCategory", payload: response };
      console.log("Add Category", retrnObj);
      dispatch(retrnObj);
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "Add Category Failed",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

// ? Get All Categories
export const getAllCategoriesActionUpdated = (id) => async (dispatch) => {
  console.log(id);
  try {
    const response = await instanceGet(`api/v1/category/getAllCategories`);

    if (response.data.success === true) {
      console.log("Get All Categories Successfully", response);

      const retrnObj = { type: "getAllCategories", payload: response };
      console.log("getAllCategories", retrnObj);

      dispatch(retrnObj);
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire("Get All Categories Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
  }
};

// ? Delete Category
//No Reducer
export const DeleteCategoryAction = (id) => async (dispatch) => {
  try {
    const response = await instanceDelete(
      `api/v1/category/deleteCategory/${id}`
    );

    if (response.data.success === true) {
      console.log("Category Deleted Successfully", response);
      Swal.fire(
        "Category Deleted Successfully",
        response.data.message,
        "success",
        {
          buttons: false,
          timer: 2000,
        }
      );

      dispatch({ type: "deleteCategory", payload: response });
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};
//Get Category
export const GetSingleCategoryAction = (id) => async (dispatch) => {
  try {
    const response = await instanceGet(
      `api/v1/category/getCategoryDetails/${id}`
    );

    if (response.data.success === true) {
      console.log("Category single Successfully", response);
      dispatch({ type: "singleCategory", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

//Edit Category
export const EditCategoryAction = (id, category) => async (dispatch) => {
  try {
    const response = await instancePut(`api/v1/category/updateCategory/${id}`, {
      category: category,
    });

    if (response.data.success === true) {
      console.log("Category Edited Successfully", response);
      Swal.fire(
        "Category Edited Successfully",
        response.data.message,
        "success",
        {
          buttons: false,
          timer: 2000,
        }
      );

      dispatch({ type: "editCategory", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

//! Category Crud Ends from here

//!  Bank Details Starts from here
//? No Reducer
// {
//   accTitle: bankDetails.accNumber,
//   bankName: bankDetails.bankName,
//   accNumber: bankDetails.accNumber,
//   swiftCode: bankDetails.swiftCode,
//   bankAddress: bankDetails.bankAddress,
// }

export const BankDetailsAction = (bankDetails) => async (dispatch) => {
  try {
    const response = await instancePost(
      `api/v1/account/createAccount`,
      bankDetails
    );
    console.log(response);

    if (response.data.success === true) {
      console.log("Bank Details Added Successfully");
      Swal.fire(
        "Bank Details Added Successfully",
        response.data.message,
        "success",
        {
          buttons: false,
          timer: 2000,
        }
      );

      dispatch({ type: "addBankDetails", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

export const GetLatestBankDetailsAction = () => async (dispatch) => {
  try {
    const response = await instanceGet(`api/v1/account/getLatestAccount`);

    if (response.data.success === true) {
      console.log("Single Bank Detail");
      // dispatch({ type: "addBankDetails", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire("Fetch Single Bank Details", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
  }
};

//! Add Bank Details Ends from here

//!  Wallet Address Starts from here
//? No Reducer
// {
//   accTitle: bankDetails.accNumber,
//   bankName: bankDetails.bankName,
//   accNumber: bankDetails.accNumber,
//   swiftCode: bankDetails.swiftCode,
//   bankAddress: bankDetails.bankAddress,
// }

export const WalletAddressAction = (walletAddress) => async (dispatch) => {
  try {
    const response = await instancePost(`api/v1/wallet/createWallet`, {
      walletAddress: walletAddress,
    });
    console.log(response);

    if (response.data.success === true) {
      console.log("Wallet Address Added Successfully");
      Swal.fire(
        "Wallet Address Added Successfully",
        response.data.message,
        "success",
        {
          buttons: false,
          timer: 2000,
        }
      );

      // dispatch({ type: "addBankDetails", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "error",
      error.response.data.error,
      "error",

      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

export const GetLatestWalletAddressAction = () => async (dispatch) => {
  try {
    const response = await instanceGet(`api/v1/wallet/getLatestWallet`);

    if (response.data.success === true) {
      console.log("Single Wallet Address Detail");
      // dispatch({ type: "addBankDetails", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire("Fetch Single Bank Details", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
  }
};

//! Add Bank Details Ends from here

//! Add Delivery Starts from here
//No Reducer
export const AddDeliveryDateAction = (nation, delivery) => async (dispatch) => {
  try {
    const response = await instancePost(`api/v1/delivery/createDelivery`, {
      nation: nation,
      expectedDeliveryDate: delivery,
    });
    console.log(response);

    if (response.data.success === true) {
      console.log("Added Delivery Address Detail");
      // dispatch({ type: "addBankDetails", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "Adding Delivery Details Failed",
      error.response.data.error,
      "error",
      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

export const GetDeliveryDateByNationAction = (country) => async (dispatch) => {
  try {
    const response = await instanceGet(
      `api/v1/delivery/getDeliveryByNation?nation=${country}`
    );

    if (response.data.success === true) {
      console.log("Get Single Delivery Date Detail");
      dispatch({ type: "getDeliveryDateByNation", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "Get Delivery Date Details By Country Failed",
      error.response.data.error,
      "error",
      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};
export const GetAllDeliveryDatesAction = () => async (dispatch) => {
  try {
    const response = await instanceGet(`api/v1/delivery/getAllDelivery`);

    if (response.data.success === true) {
      console.log("Get All Delivery Date Detail", response);
      dispatch({ type: "getAllDeliveryDates", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "Get All Delivery Date Details Failed",
      error.response.data.error,
      "error",
      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

export const UpdateDeliveryDate = (country, date) => async (dispatch) => {
  try {
    const response = await instancePut(
      `api/v1/delivery/updateDeliveryByNation?nation=${country}`,
      {
        expectedDeliveryDate: date,
      }
    );

    if (response.data.success === true) {
      console.log("Update Delivery Date Detail");
      dispatch({ type: "updateDeliveryDate", payload: response });
      return response;
    }
  } catch (error) {
    console.log("error", error);
    Swal.fire(
      "Update Delivery Date Failed",
      error.response.data.error,
      "error",
      {
        buttons: false,
        timer: 2000,
      }
    );
  }
};

//! Add Delivery End from here
