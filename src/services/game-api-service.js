import TokenService from "./TokenService";
import config from "../config";

const GameApiService = {
  searchForGames(query) {
    return fetch(`${config.API_ENDPOINT}/search?search=${query}`, {
      headers: {
        'content-type': 'application/json',
      },
    }).then(res => !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getGames() {
    return fetch(`${config.API_ENDPOINT}/games`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getGame(gameId) {
    return fetch(`${config.API_ENDPOINT}/games/${gameId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postGame(title, priority, est_time, loc, notes) {
    return fetch(`${config.API_ENDPOINT}/games`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title: title,
        importance: Number(priority),
        est_time: Number(est_time),
        loc: loc,
        notes: notes,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateGame(gameId, title, priority, est_time, loc, notes) {
    return fetch(`${config.API_ENDPOINT}/games/${gameId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title: title,
        importance: Number(priority),
        est_time: Number(est_time),
        loc: loc,
        notes: notes,
      }),
    }).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : 0));
  },
  deleteGame(gameId) {
    return fetch(`${config.API_ENDPOINT}/games/${gameId}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : 0));
  },
};

export default GameApiService;
