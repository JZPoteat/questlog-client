import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ReviewApiService from "../../services/reviews-api-service";
import "./ReviewForm.css";
export default class ReviewForm extends Component {
  state = {
    title: "",
    rating: "",
    time_played: "",
    review: "",
    error: null,
    editing: false,
    redirect: false,
  };

  setTitle = (e) => {
    //sets state of title for title field
    this.setState({
      title: e.target.value,
    });
  };

  setRating = (e) => {
    //sets state of rating for rating field
    this.setState({
      rating: e.target.value,
    });
  };

  setTimePlayed = (e) => {
    //sets timeplayed for timeplayed field
    this.setState({
      time_played: e.target.value,
    });
  };

  setReview = (e) => {
    //sets review for review field
    this.setState({
      review: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, rating, time_played, review } = this.state;
    if (!this.validateNumber(time_played)) {
      //validates time_played field
      this.setState({
        error: 'Please enter a valid "time_played" in hours',
      });
    } else if (!this.validateNumber(rating)) {
      //validates rating field
      this.setState({
        error: 'Please enter a valid "rating" in dollars',
      });
    } else if (this.props.editing) {
      //if this component was rendered from the user clicking the edit button in the ExpandedReview component, then update the Review
      ReviewApiService.updateReview(
        this.props.review.id,
        title,
        rating,
        time_played,
        review
      )
        .then(() => {
          this.setState({
            title: "",
            rating: "",
            time_played: "",
            review: "",
            redirect: true,
          });
        })
        .catch((error) => console.log(error));
    } else {
      ReviewApiService.postReview(title, rating, time_played, review)
        .then(() => {
          this.setState({
            title: "",
            rating: "",
            time_played: "",
            review: "",
            redirect: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  validateNumber(maybeNum) {
    //check if component is number
    if (isNaN(Number(maybeNum))) {
      return false;
    }
    return true;
  }

  checkProps = () => {
    //if this component is being rendered as a result of the user clicking the edit button in the Expanded review component, then populate the form fields with the appropriate information
    if (this.props.review) {
      this.setState({
        title: this.props.review.title,
        rating: this.props.review.rating,
        time_played: this.props.review.time_played,
        review: this.props.review.review,
      });
    }
  };
  componentDidMount() {
    this.checkProps();
  }

  render() {
    const { error } = this.state;
    if (this.state.redirect) {
      return <Redirect to="/reviews" />;
    }
    return (
      <form className="add_review_form" onSubmit={this.handleSubmit}>
        <p role="alert">{error}</p>
        <div className="add_review_text_area">
          <label htmlFor="add_review_title">Title</label>
          <input
            required
            type="text"
            value={this.state.title}
            name="title"
            className="review_text_box"
            id="add_review_title"
            onChange={this.setTitle}
          />
        </div>
        <div className="add_review_text_area">
          <label htmlFor="add_review_rating">Rating ($)</label>
          <input
            required
            type="text"
            name="rating"
            value={this.state.rating}
            id="add_review_rating"
            className="review_text_box"
            onChange={this.setRating}
          />
        </div>
        <div className="add_review_text_area">
          <label htmlFor="add_review_time_played">Time Played (hrs)</label>
          <input
            required
            type="text"
            name="time_played"
            value={this.state.time_played}
            id="add_review_time_played"
            className="review_text_box"
            onChange={this.setTimePlayed}
          />
        </div>
        <div className="add_review_text_area">
          <label htmlFor="add_review_review" id="notes_label">
            Thoughts...
          </label>
          <textarea
            required
            type="text"
            name="review"
            id="add_review_review"
            value={this.state.review}
            className="text_box"
            onChange={this.setReview}
          />
        </div>
        <div className="add_review_buttons">
          <Link to="/reviews">
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

ReviewForm.defaultProps = {
  title: "",
  priority: "1",
  est_time: "",
  loc: "",
  notes: "",
};
