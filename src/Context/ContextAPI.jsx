import React, { createContext, useState } from "react";

export const DataProvider = createContext(null);

const ContextAPI = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState(true);
  const [checkPermissions, setCheckPermissions] = useState({});
  return (
    <DataProvider.Provider
      value={{
        products,
        setProducts,
        userRole,
        setUserRole,
        checkPermissions,
        setCheckPermissions,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
};

export default ContextAPI;
