const UpdateOrderStatusReducer = (
  state = { loading: true, order: [] },
  action
) => {
  switch (action.type) {
    case "orderStatusChanged":
      return { ...state, loading: false, order: action.payload };
    default:
      return state;
  }
};

export default UpdateOrderStatusReducer;
