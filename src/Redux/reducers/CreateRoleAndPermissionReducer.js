const CreateRollAndPermissionReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case "createRole":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default CreateRollAndPermissionReducer;
