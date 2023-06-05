const UpdateRoleReducer = (state = { loading: true, roles: [] }, action) => {
  switch (action.type) {
    case "updateSingleRole":
      return { ...state, loading: false, roles: action.payload };
    default:
      return state;
  }
};

export default UpdateRoleReducer;
