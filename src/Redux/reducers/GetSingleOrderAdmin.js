const GetSingleOrderAdminReducer = (
  state = { loading: true, orders: [] },
  action
) => {
  switch (action.type) {
    case "getSingleOrderAdmin":
      return { ...state, loading: false, orders: action.payload };
    default:
      return state;
  }
};
export default GetSingleOrderAdminReducer;
