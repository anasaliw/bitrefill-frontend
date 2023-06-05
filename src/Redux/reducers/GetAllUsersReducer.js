const GetAllUsersReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case "getAllUsers":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default GetAllUsersReducer;
