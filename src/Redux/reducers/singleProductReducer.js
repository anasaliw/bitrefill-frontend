const singleProductReducer = (
  state = { loading: true, product: [] },
  action
) => {
  switch (action.type) {
    case "singleProduct":
      return { ...state, loading: false, product: action.payload };
    default:
      return state;
  }
};

export default singleProductReducer;
