import React from "react";
const fileContext = React.createContext({
  isLoggedIn: false,
  handleLogout: () => {},
  handleLogin: () => {},
});

export default fileContext;
