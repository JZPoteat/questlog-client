import React from "react";
import SearchResultItem from "../SearchResultItem/SearchResultItem";
import './SearchResults.css';
export default class SearchResults extends React.Component {
  render() {
    if(!this.props.results) {
        return <div></div>;
    }
    return (
      <div className="search_results">
        {this.props.results.map((game, index) => {
          return <SearchResultItem key={index} name={game.name} background_image={game.background_image} platforms={game.platforms} selectSearchItem={this.props.selectSearchItem}/>;
        })}
      </div>
    );
  }
}
