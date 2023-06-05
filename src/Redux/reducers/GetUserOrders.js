const GetUserOrdersReducer = (
  state = { loading: true, orders: [] },
  action
) => {
  switch (action.type) {
    case "getUserOrders":
      return { ...state, loading: false, orders: action.payload };
    default:
      return state;
  }
};

export default GetUserOrdersReducer;
