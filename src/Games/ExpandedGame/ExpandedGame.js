import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import GameForm from "../GameForm/GameForm";
import GameApiService from "../../services/game-api-service";
import "./ExpandedGame.css";
import Loading from "../../Loading/Loading";
import fileContext from "../../context/FileContext";
export default class ExpandedGame extends Component {

  static contextType = fileContext;

  state = {
    game: [],
    editing: false,
    error: null,
    deleting: false,
    redirect: false,
  };

  setGame = (game) => {
    //when component mounts, it sets the state of the current game
    this.context.handleLoading();
    this.setState({
      game,
      error: null,
    });
  };

  handleEditClick = () => {
    //sets the state of editing to true, which will then trigger renderEditForm upon re render
    this.setState({
      editing: true,
    });
  };

  renderExpandedGame = () => {
    let { game } = this.state;
    return (
      //Games are color coded, and the className is changed to reflect the game's importance.
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
            Notes:<p id="notes_box">{game.notes}</p>
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
    //Setting state here renders a confirmation form to confirm that the user wants to delete the game
    this.setState({
      deleting: newDeleteState,
    });
  };

  renderEditForm = () => {
    //renders the game form but with props in order to populate the fields with game information
    return <GameForm game={this.state.game} editing={true} />;
  };

  deleteGame = () => {
    //deletes game from DB
    GameApiService.deleteGame(this.state.game.id).then(() => {
      this.setState({
        redirect: true,
      });
    });
  };

  renderDeleteForm = () => {
    //renders a confirmation component that verifies that the user wants to delete the game
    return (
      <section className="delete_confirmation">
        <p>Are you sure you want to delete this game?</p>
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
    this.context.handleLoading();
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
          {/**if editing, renderEditForm, else if confirming delete, renderDeleteForm, else render the expanded game */}
          {this.context.isLoading && <Loading />}
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
