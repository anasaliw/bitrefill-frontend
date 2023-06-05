const EditCategoryReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case "editCategory":
      return { ...state, loading: false, users: action.payload };
    default:
      return state;
  }
};
export default EditCategoryReducer;
