import { instance, instanceGet } from "../../config";

export const checkPermissionAction = () => async (dispatch) => {
  try {
    const response = await instanceGet(`api/v1/employee/getEmployeeDetails`);
    if (response.data.success === true) {
      const role = response?.data?.employee?.role;
      //2nd Action to fetch Permissions
      try {
        const secondResponse = await instanceGet(
          `api/v1/roles/getAllRolesForPublic`
        );

        const secRes = secondResponse?.data?.roles;
        // const data = secRes.filter((row, index) => row.role === role);
        // console.log("Second", secRes);
        let data;
        for (let i = 0; i < secRes.length; i++) {
          if (secRes[i].role === role) {
            data = secRes[i].permissions;
          }
        }
        dispatch({ type: "getPermissionValidation", payload: data });
        console.log("hello", data);
        return data;
      } catch (error) {
        Swal.fire("User Roles Failed", error.response.data.error, "error", {
          buttons: false,
          timer: 2000,
        });
      }

      //   return response;
    }
  } catch (error) {
    Swal.fire("User Details Failed", error.response.data.error, "error", {
      buttons: false,
      timer: 2000,
    });
    console.log(error);
  }
};
