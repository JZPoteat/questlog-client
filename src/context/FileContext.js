import React from 'react'
const fileContext = React.createContext();
export default fileContext;

export class FileContextProvider extends React.Component {
    state = {
        games: [],
    }
}