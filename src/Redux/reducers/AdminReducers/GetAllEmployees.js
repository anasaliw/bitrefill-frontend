const GetAllEmployeesReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case "getAllEmployee":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};

export default GetAllEmployeesReducer;
