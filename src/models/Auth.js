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
    this._user = null;
  }

  async check() {
    if (this._user) return this._user;
    if (!Api.key) return null;
    const user = await Api.req("GET", "/me");
    this._user = user;
    return user;
  }

  async require(navigate) {
    const user = await this.check();
    if (user) return user;
    navigate("/");
  }

  logout(user) {
    google.accounts.id.revoke(user.email);
    Api.setKey(null);
    setTimeout(() => window.location.reload(), 250);
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
