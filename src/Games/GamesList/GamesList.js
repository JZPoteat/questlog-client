import React, { Component } from "react";
import { Link } from "react-router-dom";
import Game from "../GameListItem/GameListItem";
import GameApiService from "../../services/game-api-service";
import NavLink from "../../NavLink/NavLink";
import "./GameList.css";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from '../../Loading/Loading';
import fileContext from "../../context/FileContext";
export default class GamesList extends Component {
  static  contextType = fileContext;
  state = {
    games: [],
    search: "",
    sort: "",
    error: null,
  };

  setGames = (games) => {
    //after making fetch request, set the state of the games to render
    this.context.handleLoading();
    this.setState({
      games,
      error: null,
    });
  };

  setSort = (e) => {
    //sets the value selected for the sort field
    this.setState({
      sort: e.target.value,
    });
  };
  setSearch = (e) => {
    //sets the value input from the search field
    this.setState({
      search: e.target.value,
    });
  };

  searchBar = () => {
    //search bar component
    return (
      <div className="search_box">
        <p id="search_label">Search:</p>
        <input
          type="text"
          value={this.state.search}
          id="search_bar"
          onChange={this.setSearch}
        />
      </div>
    );
  };

  sortOptions = () => {
    //sort field component
    return (
      <div className="sort_box">
        <p id="sort_label">Sort by:</p>
        <select
          className="sort_options"
          id="sort_options"
          onChange={this.setSort}
        >
          <option value="0">N/A</option>
          <option value="1">Priority (Low to High)</option>
          <option value="2">Priority (High to Low)</option>
          <option value="3">Estimated Time (Low to High)</option>
          <option value="4">Estimated Time (High to Low)</option>
          <option value="5">Title (A-Z)</option>
          <option value="6">Title (Z-A)</option>
        </select>
      </div>
    );
  };

  sortGames = () => {
    let sort = Number(this.state.sort);
    if (sort === 0) {
      //sort by est time descending by default
      this.state.games.sort((a, b) => (a.est_time > b.est_time ? 1 : -1));
    }
    if (sort === 1) {
      //sort by importance ascending
      this.state.games.sort((a, b) => (a.importance > b.importance ? 1 : -1));
    } else if (sort === 2) {
      //sort by importance descending
      this.state.games.sort((a, b) => (a.importance > b.importance ? -1 : 1));
    } else if (sort === 3) {
      //sort by est_time ascending
      this.state.games.sort((a, b) => (a.est_time > b.est_time ? 1 : -1));
    } else if (sort === 4) {
      //sort by est_time descending
      this.state.games.sort((a, b) => (a.est_time > b.est_time ? -1 : 1));
    } else if (sort === 5) {
      //sort by title ascending
      this.state.games.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (sort === 6) {
      //sort by title descending
      this.state.games.sort((a, b) => (a.title > b.title ? -1 : 1));
    }
  };

  componentDidMount() {
    this.context.handleLoading();
    GameApiService.getGames()
      .then(this.setGames)
      .catch((error) => this.setState({ error: error }));
  }

  render() {
    this.sortGames();
    let { games } = this.state;
    if (!games) {
      //return gameListComponent but with no games
      return (
        <>
          <h1 className="welcome_statement">Welcome back!</h1>
          <nav className="game_review_nav">
            <NavLink />
          </nav>
          <p role="alert" className="red">
            {this.state.error}
          </p>
          <Link to="/quest-form">
            <button className="add_quest_button"> + Add Game</button>
          </Link>
        </>
      );
    }
    if (this.state.search !== "") {
      games = games.filter((g) =>
        //search by title, case insensitive
        g.title.toLowerCase().includes(this.state.search.toLowerCase())
      );
    }
    return (
      <>
        <h1 className="welcome_statement">Welcome back!</h1>
        <nav className="game_review_nav">
          <NavLink />
        </nav>
        <p role="alert" className="red">
          {this.state.error}
        </p>
        <section className="sort_search_box">
          {this.searchBar()}
          {this.sortOptions()}
        </section>
        <Link to="/quest-form">
          <button className="add_quest_button"> + Add Game</button>
        </Link>
        <div className="tooltip">
          <FontAwesomeIcon icon={faInfoCircle} id="help_icon" />
          <span className="tooltiptext">
            Games are color coded to match your selected priority: Green="High"
            Yellow = "Medium" Red = "Low"
          </span>
        </div>
        {this.context.isLoading && <Loading />}
        <ul className="quest_list">
          {games.map((game, index) => (
            <Game key={game.id} gameCount={index} {...game} />
          ))}
        </ul>
      </>
    );
  }
}
