const FetchShippingReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case "fetchShipping":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default FetchShippingReducer;
