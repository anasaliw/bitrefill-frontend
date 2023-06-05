const getSingleUserReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case "getSingleUser":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};

export default getSingleUserReducer;
