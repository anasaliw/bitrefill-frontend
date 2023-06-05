const GetAllDeliveryDates = (
  state = { loading: true, deliveryDates: [] },
  action
) => {
  switch (action.type) {
    case "getAllDeliveryDates":
      return { ...state, loading: false, deliveryDates: action.payload };
    default:
      return state;
  }
};
export default GetAllDeliveryDates;
