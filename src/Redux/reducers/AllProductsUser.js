const AllProductsUserReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case "allProductsUser":
      return { ...state, loading: false, products: action.payload };
    default:
      return state;
  }
};
export default AllProductsUserReducer;
