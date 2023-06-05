const ResetPasswordReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case "resetPassword":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};

export default ResetPasswordReducer;
