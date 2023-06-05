const PlaceOrderReducer = (state = { loading: true, products: [] }, action) => {
  switch (action.type) {
    case "placeOrder":
      return { ...state, loading: false, products: action.payload };
    default:
      return state;
  }
};
export default PlaceOrderReducer;
