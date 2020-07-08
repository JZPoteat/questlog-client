import React from "react";
// export class FileContextProvider extends React.Component {
//     state = {
//         games: [],
//     }
// }
const fileContext = React.createContext({
  isLoggedIn: false,
  handleLogout: () => {},
  handleLogin: () => {},
});

export default fileContext;
