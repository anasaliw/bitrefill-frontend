const UpdateUserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "updateUser":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default UpdateUserReducer;
