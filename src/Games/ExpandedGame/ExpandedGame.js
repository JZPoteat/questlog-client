import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import GameForm from "../GameForm/GameForm";
import GameApiService from "../../services/game-api-service";
import "./ExpandedGame.css";
export default class ExpandedGame extends Component {
  state = {
    game: [],
    editing: false,
    error: null,
    deleting: false,
    redirect: false,
  };

  setGame = (game) => {
    this.setState({
      game,
      error: null,
    });
  };

  handleEditClick = () => {
    this.setState({
      editing: true,
    });
  };

  renderExpandedGame = () => {
    let { game } = this.state;
    return (
      <section
        className={
          this.state.game.importance === 1
            ? "expanded_game_box_low"
            : this.state.game.importance === 2
            ? "expanded_game_box_medium"
            : this.state.game.importance === 3
            ? "expanded_game_box_high"
            : "expanded_game_box"
        }
      >
        <Link to="/games">
          <button
            className={
              this.state.game.importance === 1
                ? "return_button_low"
                : this.state.game.importance === 2
                ? "return_button_medium"
                : this.state.game.importance === 3
                ? "return_button_high"
                : "return_button"
            }
          >
            Return
          </button>
        </Link>
        <button
          className={
            this.state.game.importance === 1
              ? "edit_button_low"
              : this.state.game.importance === 2
              ? "edit_button_medium"
              : this.state.game.importance === 3
              ? "edit_button_high"
              : "edit_button"
          }
          onClick={this.handleEditClick}
        >
          Edit
        </button>
        <ul className="expanded_game">
          <li id="game_title">{game.title}</li>
          <li id="game_hours">
            <strong>{game.est_time}</strong> hours remaining
          </li>
          <li>
            Location: <strong>{game.loc}</strong>
          </li>
          <li id="notes_box">
            Notes:<p>{game.notes}</p>
          </li>
        </ul>
        <button onClick={this.handleToggleDelete} id="delete_button">
          Delete
        </button>
      </section>
    );
  };

  handleToggleDelete = () => {
    const newDeleteState = !this.state.deleting;
    this.setState({
      deleting: newDeleteState,
    });
  };

  renderEditForm = () => {
    return <GameForm game={this.state.game} editing={true} />;
  };

  deleteGame = () => {
    GameApiService.deleteGame(this.state.game.id).then(() => {
      this.setState({
        redirect: true,
      });
    });
  };

  renderDeleteForm = () => {
    return (
      <section className="delete_confirmation">
        <p>Are you sure you want to delete this quest?</p>
        <p>"{this.state.game.title}"</p>
        <button onClick={this.handleToggleDelete} id="no_button">
          No
        </button>
        <button onClick={this.deleteGame} id="yes_button">
          Yes
        </button>
      </section>
    );
  };

  componentDidMount() {
    const gameId = this.props.match.params.id;
    GameApiService.getGame(gameId).then(this.setGame);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/games" />;
    }
    return (
      <>
        <div className="expanded_game">
          {this.state.editing
            ? this.renderEditForm()
            : this.state.deleting
            ? this.renderDeleteForm()
            : this.renderExpandedGame()}
        </div>
      </>
    );
  }
}
