const AllProductsReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case "allProducts":
      return { ...state, loading: false, products: action.payload };
    default:
      return state;
  }
};
export default AllProductsReducer;
