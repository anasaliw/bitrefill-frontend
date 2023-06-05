const LoginEmployeeReducer = (
  state = { loading: true, Empusers: [] },
  action
) => {
  switch (action.type) {
    case "loginEmployee":
      return { ...state, loading: false, Empusers: action.payload };
    default:
      return state;
  }
};
export default LoginEmployeeReducer;
