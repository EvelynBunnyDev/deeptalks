import Api from "./Api.js";

const CLIENT_ID = "580533245472-07fsaucfsg12ga7h84paate5oav8or2a.apps.googleusercontent.com";

/* global google */
class Auth {
  constructor() {
    this._callback = null;
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: this._onLogin.bind(this),
      hd: "stanford.edu"
    });
  }

  async check() {
    const user = await Api.req("GET", "/me");
    return user;
  }

  render(parent, onLogin) {
    this._callback = onLogin;
    google.accounts.id.renderButton(parent, { theme: "outline", text: "signin" });
  }

  async _onLogin(response) {
    const idToken = response.credential;
    const data = await Api.req("POST", "/login", { idToken });
    if (this._callback) this._callback(data);
  }
}

const auth = new Auth();
export default auth;