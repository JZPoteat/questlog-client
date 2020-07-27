import React from "react";
const fileContext = React.createContext({
  isLoggedIn: false,
  isLoading: false,
  handleLoading: () => {},
  handleLogout: () => {},
  handleLogin: () => {},
});

export default fileContext;
