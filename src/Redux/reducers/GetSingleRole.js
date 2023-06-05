const getSingleRoleReducer = (state = { loading: true, roles: [] }, action) => {
  switch (action.type) {
    case "getSingleRole":
      return { ...state, loading: false, roles: action.payload };
    default:
      return state;
  }
};

export default getSingleRoleReducer;
