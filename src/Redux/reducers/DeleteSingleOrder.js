const DeleteSingleOrderReducer = (
  state = { loading: true, order: [] },
  action
) => {
  switch (action.type) {
    case "deleteOrder":
      return { ...state, loading: false, order: action.payload };
    default:
      return state;
  }
};
export default DeleteSingleOrderReducer;
