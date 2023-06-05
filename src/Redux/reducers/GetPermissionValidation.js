const GetPermissionValidation = (
  state = { loading: true, permissionValidation: [] },
  action
) => {
  switch (action.type) {
    case "getPermissionValidation":
      return { ...state, loading: false, permissionValidation: action.payload };
    default:
      return state;
  }
};
export default GetPermissionValidation;
