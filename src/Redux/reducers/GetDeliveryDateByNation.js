const GetDeliveryDateByNation = (
  state = { loading: true, deliveryDate: [] },
  action
) => {
  switch (action.type) {
    case "getDeliveryDateByNation":
      return { ...state, loading: false, deliveryDate: action.payload };
    default:
      return state;
  }
};
export default GetDeliveryDateByNation;
