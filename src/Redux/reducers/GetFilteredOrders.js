const GetFilteredOrdersReducer = (
  state = { loading: true, orders: [] },
  action
) => {
  switch (action.type) {
    case "getFilteredOrders":
      return { ...state, loading: false, orders: action.payload };
    default:
      return state;
  }
};
export default GetFilteredOrdersReducer;
