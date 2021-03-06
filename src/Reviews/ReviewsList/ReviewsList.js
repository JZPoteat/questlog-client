import React, { Component } from "react";
import { Link } from "react-router-dom";
import Review from "../ReviewsListItem/ReviewsListItem";
import ReviewsApiService from "../../services/reviews-api-service";
import NavLink from "../../NavLink/NavLink";
import Loading from "../../Loading/Loading";
import "./ReviewsList.css";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fileContext from "../../context/FileContext";
export default class ReviewsList extends Component {
  
  static contextType = fileContext;

  state = {
    reviews: [],
    search: "",
    sort: "",
    error: null,
  };

  setReviews = (reviews) => {
    //After making fetch request, set the state of current reviews
    this.context.handleLoading();
    this.setState({
      reviews,
      error: null,
    });
  };

  setSort = (e) => {
    //set state of selected sort value
    this.setState({
      sort: e.target.value,
    });
  };

  setSearch = (e) => {
    //set state of search bar value
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
    //sort box component
    return (
      <div className="sort_box">
        <p id="sort_label">Sort by:</p>
        <select
          className="sort_options"
          id="sort_options"
          onChange={this.setSort}
        >
          <option value="0">N/A</option>
          <option value="1">Rating (Low to High)</option>
          <option value="2">Rating (High to Low)</option>
          <option value="3">Time Played (Low to High)</option>
          <option value="4">Time Played (High to Low)</option>
          <option value="5">Title (A-Z)</option>
          <option value="6">Title (Z-A)</option>
        </select>
      </div>
    );
  };

  sortReviews = () => {
    let sort = Number(this.state.sort);
    if (sort === 0) {
      //sort by rating ascending by default
      this.state.reviews.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    }
    if (sort === 1) {
      //sort by rating ascending
      this.state.reviews.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    } else if (sort === 2) {
      //sort by rating descending
      this.state.reviews.sort((a, b) => (a.rating > b.rating ? -1 : 1));
    } else if (sort === 3) {
      //sort by time_played ascending
      this.state.reviews.sort((a, b) =>
        a.time_played > b.time_played ? 1 : -1
      );
    } else if (sort === 4) {
      //sort by time_played descending
      this.state.reviews.sort((a, b) =>
        a.time_played > b.time_played ? -1 : 1
      );
    } else if (sort === 5) {
      //sort by title ascending
      this.state.reviews.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (sort === 6) {
      //sort by title descending
      this.state.reviews.sort((a, b) => (a.title > b.title ? -1 : 1));
    }
  };

  componentDidMount() {
    this.context.handleLoading();
    ReviewsApiService.getReviews()
      .then(this.setReviews)
      .catch((error) => this.setState({ error: error }));
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    this.sortReviews();
    let { reviews } = this.state;
    if (this.state.search !== "") {
      reviews = reviews.filter((g) =>
        g.title.toLowerCase().includes(this.state.search.toLowerCase())
      );
    }
    return (
      <>
        <h1 className="welcome_statement">Welcome back!</h1>
        <nav className="game_review_nav">
          <NavLink />
        </nav>
        <section className="sort_search_box">
          {this.searchBar()}
          {this.sortOptions()}
        </section>
        <Link to="/review-form">
          <button className="add_review_button">Add review</button>
        </Link>
        <div className="tooltip">
          <FontAwesomeIcon icon={faInfoCircle} id="help_icon" />
          <span className="tooltiptext">
            Let us know how much you think your games are worth in dollars.
            Ditch the old arbitrary rating system, and let your ratings carry
            concrete meaning!
          </span>
        </div>
        <ul className="review_list">
        {this.context.isLoading && <Loading />}
          {reviews.map((review) => (
            <Review key={review.id} {...review} />
          ))}
        </ul>
      </>
    );
  }
}
