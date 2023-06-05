const GetAllRoleReducer = (state = { loading: true, roles: [] }, action) => {
  switch (action.type) {
    case "getRoles":
      return { ...state, loading: false, roles: action.payload };
    default:
      return state;
  }
};
export default GetAllRoleReducer;
