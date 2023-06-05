const UpdateProductReducer = (state = { loading: true, order: [] }, action) => {
  switch (action.type) {
    case "updateProduct":
      return { ...state, loading: false, order: action.payload };
    default:
      return state;
  }
};

export default UpdateProductReducer;
