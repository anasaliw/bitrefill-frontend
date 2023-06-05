const GetSingleOrdersReducer = (
  state = { loading: true, orders: [] },
  action
) => {
  switch (action.type) {
    case "getSingleOrder":
      return { ...state, loading: false, orders: action.payload };
    default:
      return state;
  }
};
export default GetSingleOrdersReducer;
