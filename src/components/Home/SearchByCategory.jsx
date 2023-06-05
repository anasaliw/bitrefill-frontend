import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkPermissionAction } from "../../Redux/actions/checkPermissionAction";
import { useSearchParams } from "react-router-dom";

const SearchByCategory = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  console.log(searchParams);

  React.useEffect(() => {}, []);
  return <div>HEllo</div>;
};

export default SearchByCategory;
