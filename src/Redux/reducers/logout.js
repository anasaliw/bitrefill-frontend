const logoutReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case "logout":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};

export default logoutReducer;
