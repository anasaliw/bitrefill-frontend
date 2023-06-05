const DeleteProductReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case "deleteProduct":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default DeleteProductReducer;
