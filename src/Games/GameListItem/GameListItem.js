import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./GameListItem.css";
export default class GameListItem extends Component {
  render() {
    return (
      <Link to={`/games/${this.props.id}`} className="game_list_link">
        <li
          className={
            this.props.importance === 1
              ? "game_list_item_low"
              : this.props.importance === 2
              ? "game_list_item_medium"
              : this.props.importance === 3
              ? "game_list_item_high"
              : "game_list_item"
          }
        >
          <div>{this.props.title}</div>
          <div>{this.props.est_time} hours remaining</div>
        </li>
      </Link>
    );
  }
}
