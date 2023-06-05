const getAllOrdersReducer = (state = { loading: true, orders: [] }, action) => {
  switch (action.type) {
    case "getAllOrders":
      return { ...state, loading: false, orders: action.payload };
    default:
      return state;
  }
};
export default getAllOrdersReducer;
