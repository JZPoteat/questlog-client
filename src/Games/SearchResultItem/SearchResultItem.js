import React from "react";
import "./SearchResultItem.css";
export default class SearchResultItem extends React.Component {
  state = {
    platforms: "",
    expand: false,
    selectedGame: ""
  };

  setExpand = () => {
    this.setState({
      expand: !this.state.expand,
    });
  };

  componentDidMount() {
    this.formatPlatformString();
  }

  formatPlatformString = () => {
    let formatPlatformStr = "Available on ";
    if (this.props.platforms.length === 1) {
      formatPlatformStr += this.props.platforms[0].platform.name;
    } else {
      this.props.platforms.forEach((platform, index) => {
        if (index === this.props.platforms.length - 1) {
          formatPlatformStr += "and " + platform.platform.name;
        } else {
          formatPlatformStr += platform.platform.name + ", ";
        }
      });
    }

    console.log(formatPlatformStr);
    this.setState({
      platforms: formatPlatformStr,
    });
  };


  render() {
    return (
      <div
        className="search-result"
        onMouseEnter={this.setExpand}
        onMouseLeave={this.setExpand}
      >
        <p className="search_item_title">{this.props.name}</p>

        <img
          src={this.props.background_image}
          alt={this.props.name}
          className="game_img"
        />
        {this.state.expand && (
          <>
            <p className="search_item_platforms">{this.state.platforms}</p>
            <button type="button" onClick={() => this.props.selectSearchItem(this.props.name)}className='add_quest_button'>
              Add Game
            </button>
          </>
        )}
      </div>
    );
  }
}
