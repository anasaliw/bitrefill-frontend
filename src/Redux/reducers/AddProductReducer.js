const AddProductReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case "addProduct":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default AddProductReducer;
