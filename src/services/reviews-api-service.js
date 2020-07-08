import TokenService from "./TokenService";
import config from "../config";

const ReviewApiService = {
  getReviews() {
    return fetch(`${config.API_ENDPOINT}/reviews`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getReview(reviewId) {
    return fetch(`${config.API_ENDPOINT}/reviews/${reviewId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postReview(title, rating, time_played, review) {
    return fetch(`${config.API_ENDPOINT}/reviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title: title,
        rating: Number(rating),
        time_played: Number(time_played),
        review: review,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateReview(reviewId, title, rating, time_played, review) {
    return fetch(`${config.API_ENDPOINT}/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title: title,
        rating: Number(rating),
        time_played: Number(time_played),
        review: review,
      }),
    }).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : 0));
  },
  deleteReview(reviewId) {
    return fetch(`${config.API_ENDPOINT}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : 0));
  },
};

export default ReviewApiService;
