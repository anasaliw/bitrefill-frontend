const GetAllCategoriesReducer = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case "getAllCategories":
      return { ...state, loading: false, categories: action.payload };
    default:
      return state;
  }
};
export default GetAllCategoriesReducer;
