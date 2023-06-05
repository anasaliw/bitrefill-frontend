const GetSingleEmployeeReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case "getSingleEmployee":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};

export default GetSingleEmployeeReducer;
