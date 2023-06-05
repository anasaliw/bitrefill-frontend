const DeleteRoleReducer = (state = { loading: true, roles: [] }, action) => {
  switch (action.type) {
    case "deleteRole":
      return { ...state, loading: false, roles: action.payload };
    default:
      return state;
  }
};
export default DeleteRoleReducer;
