const loginReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case "login":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default loginReducer;
