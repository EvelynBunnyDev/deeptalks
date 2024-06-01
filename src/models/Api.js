const API_URL = "http://localhost:3001/api";
//const API_URL = "/api";

export class HTTPError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class Api {
  constructor() {
    this.key = window.localStorage.getItem("apiKey");
  }

  async req(method, path, body = null) {
    let opts = { method, headers: {} };
    if (body) {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(body);
    }
    if (this.key) {
      opts.headers["Authorization"] = `Bearer ${this.key}`;
    }
    let res = await fetch(`${API_URL}${path}`, opts);
    let data = await res.json();
    if (res.status === 200) return data;
    if (res.status === 403) {
      this.setKey(null);
      return this.req(method, path, body);
    }
    throw new HTTPError(res.status, data.error);
  }

  setKey(key) {
    this.key = key;
    if (key) {
      window.localStorage.setItem("apiKey", key);
    } else {
      window.localStorage.removeItem("apiKey");
    }
  }
}

const api = new Api();
export default api;
