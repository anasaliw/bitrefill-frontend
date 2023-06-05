const UpdateDeliveryDate = (state = { loading: true, product: [] }, action) => {
  switch (action.type) {
    case "updateDeliveryDate":
      return { ...state, loading: false, product: action.payload };
    default:
      return state;
  }
};

export default UpdateDeliveryDate;
