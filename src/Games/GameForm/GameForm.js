import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import GameApiService from "../../services/game-api-service";
import "./GameForm.css";
export default class GameForm extends Component {
  state = {
    title: "",
    priority: "",
    est_time: "",
    loc: "",
    notes: "",
    error: null,
    editing: false,
    redirect: false,
  };

  setTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  setPriority = (e) => {
    this.setState({
      priority: e.target.value,
    });
  };

  setEstTime = (e) => {
    this.setState({
      est_time: e.target.value,
    });
  };

  setLocation = (e) => {
    this.setState({
      loc: e.target.value,
    });
  };

  setNotes = (e) => {
    this.setState({
      notes: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, priority, est_time, loc, notes } = this.state;

    if (!priority) {
      this.setState({
        priority: "1",
      });
    } else if (!this.validateEstTime(est_time)) {
      this.setState({
        error: 'Please enter a valid "estimated time" in hours',
      });
    } else if (this.props.editing) {
      GameApiService.updateGame(
        this.props.game.id,
        title,
        priority,
        est_time,
        loc,
        notes
      )
        .then(() => {
          this.setState({
            title: "",
            priority: "1",
            est_time: "",
            loc: "",
            notes: "",
            redirect: true,
          });
        })
        .catch((error) => this.setState({ error: error }));
    } else {
      GameApiService.postGame(title, priority, est_time, loc, notes)
        .then(() => {
          this.setState({
            title: "",
            priority: "1",
            est_time: "",
            loc: "",
            notes: "",
            redirect: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  validateEstTime(est_time) {
    if (isNaN(Number(est_time))) {
      return false;
    }
    return true;
  }

  checkProps = () => {
    if (this.props.game) {
      this.setState({
        title: this.props.game.title,
        priority: this.props.game.importance,
        est_time: this.props.game.est_time,
        loc: this.props.game.loc,
        notes: this.props.game.notes,
      });
    }
  };
  componentDidMount() {
    //Check if props were passed.  If so, populate fields with the given information
    this.checkProps();
  }

  render() {
    const { error } = this.state;
    if (this.state.redirect) {
      return <Redirect to="/games" />;
    }
    return (
      <form className="add_game_form" onSubmit={this.handleSubmit}>
        <p role="alert">{error}</p>
        <div className="add_game_text_area">
          <label htmlFor="add_game_title">Title</label>
          <input
            required
            type="text"
            value={this.state.title}
            name="title"
            className="text_box"
            id="add_game_title"
            onChange={this.setTitle}
          />
        </div>
        <div className="add_game_text_area" id="priority_box">
          <label htmlFor="add_game_priority">Priority</label>
          <select
            required
            name="priority"
            id="add_game_priority"
            onChange={this.setPriority}
            value={this.state.priority}
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
        <div className="add_game_text_area" id="hours_box">
          <label htmlFor="add_game_est_time">Hours left</label>
          <input
            required
            type="text"
            name="est_time"
            value={this.state.est_time}
            id="add_game_est_time"
            className="text_box"
            onChange={this.setEstTime}
          />
        </div>
        <div className="add_game_text_area">
          <label htmlFor="add_game_location">Location</label>
          <input
            required
            type="text"
            name="location"
            value={this.state.loc}
            id="add_game_location"
            className="text_box"
            onChange={this.setLocation}
          />
        </div>
        <div className="add_game_text_area">
          <label htmlFor="add_game_notes" id="notes_label">
            Notes
          </label>
          <textarea
            required
            type="text"
            name="notes"
            id="add_game_notes"
            value={this.state.notes}
            className="text_box"
            onChange={this.setNotes}
          />
        </div>
        <div className="add_game_buttons">
          <Link to="/games">
            <button type="button" id="cancel_button">
              Cancel
            </button>{" "}
          </Link>
          <button type="submit" id="submit_button">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

GameForm.defaultProps = {
  title: "",
  priority: "1",
  est_time: "",
  loc: "",
  notes: "",
};
