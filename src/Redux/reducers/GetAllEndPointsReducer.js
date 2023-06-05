const GetAllEndPointsReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case "getAllEndPoints":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default GetAllEndPointsReducer;
