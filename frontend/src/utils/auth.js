import {apiConfig} from "./apiConfig";
class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getErrorFromServer(res) {
    return res.json().then((res) => {
      throw new Error(res.message);
    });
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return this._getErrorFromServer(res);

  }

  register({email, password}) {
    const url = `${this._baseUrl}/signup`;
    return fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    })
      .then(this._checkResponse);
  }

  authorize({email, password}) {
    const url = `${this._baseUrl}/signin`;
    return fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    })
      .then(this._checkResponse);
  }

  checkToken(token) {
    const url = `${this._baseUrl}/users/me`;
    return fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
      .then(this._checkResponse);
  }
}

const auth = new Auth(apiConfig.baseUrl);

export default auth;
