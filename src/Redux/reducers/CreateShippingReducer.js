const CreateShippingReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case "createShipping":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default CreateShippingReducer;
