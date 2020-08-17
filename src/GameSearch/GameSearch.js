import React from "react";
import "./GameSearch.css";
import fileContext from "../context/FileContext";
import Loading from "../Loading/Loading";

export default class GameSearch extends React.Component {
  static contextType = fileContext;
  render() {
    
    return (
        
      <div className="search_game_box">
        <p>Search for your new game!</p>
        <form onSubmit={this.props.handleSubmitSearch} id='search_form'>
          <input
            type="text"
            id="search_box"
            value={this.props.search}
            onChange={this.props.handleSearch}
          />
          <button type="submit" id="search_button">
            Search
          </button>
        </form>
        {this.context.isLoading && <Loading />}
        <p id='manual_redirect_sentence'>Can't find your game?  Enter the game manually by clicking <strong onClick={this.props.toggleSearch} id='manual_redirect'>here!</strong></p>
      </div>
    );
  }
}
