const GetUserDetailsReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case "getUserData":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};

export default GetUserDetailsReducer;
