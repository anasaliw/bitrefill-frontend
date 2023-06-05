const UpdateUserByAdminReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "updateUserByAdmin":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default UpdateUserByAdminReducer;
