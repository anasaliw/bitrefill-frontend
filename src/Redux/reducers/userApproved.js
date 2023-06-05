const UserBanUnbanReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "userBanUnban":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default UserBanUnbanReducer;
