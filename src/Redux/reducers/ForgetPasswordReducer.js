const ForgetPasswordReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case "forgetPassword":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default ForgetPasswordReducer;
