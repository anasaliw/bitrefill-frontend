const GetEmployeeDetailsReducer = (
  state = { loading: true, employees: [] },
  action
) => {
  switch (action.type) {
    case "getEmployeeData":
      return { ...state, loading: false, employees: action.payload };
    default:
      return state;
  }
};

export default GetEmployeeDetailsReducer;
