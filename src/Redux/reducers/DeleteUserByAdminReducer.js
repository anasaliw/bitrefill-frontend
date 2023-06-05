const DeleteUserByAdminReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case "deleteUser":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default DeleteUserByAdminReducer;
