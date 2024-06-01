"use strict";

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = "580533245472-07fsaucfsg12ga7h84paate5oav8or2a.apps.googleusercontent.com";
const JWT_SECRET = "eQgZH2zwGZevo403/1oVIZ+D";
const MONGODB_URL = "mongodb+srv://deeptalks:1WPDEyS9+2JMW9hx9r1t+qRn@deeptalks.qlprm1n.mongodb.net/?retryWrites=true&w=majority&appName=deeptalks";

const app = express();
const api = express.Router();

let db;
let Users;

app.set("json spaces", 2);
app.use(bodyParser.json(), cors());
app.use("/api", async (req, res, next) => {
  const conn = await MongoClient.connect(MONGODB_URL);
  db = conn.db("deeptalks");
  Users = db.collection("users");
  next();
}, api);

api.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

api.get("/db", async (req, res) => {
  const test = await db.collection("test").find().toArray();
  res.json({ test });
});

api.post("/db", async (req, res) => {
  const test = req.body;
  await db.collection("test").insertOne(test);
  res.json({ test });
});

function checkKey(key) {
  if (!key) return null;
  try {
    let verified = jwt.verify(key, JWT_SECRET);
    return verified;
  } catch (e) {
    console.error(e);
    return null;
  }
}

api.use(async (req, res, next) => {
  /* Return an authentication error. */
  const error = () => { res.status(403).json({ error: "Access denied" }); };
  let header = req.header("Authorization");
  /* `return error()` is a bit cheesy when error() doesn't return anything, but it works (returns undefined) and is convenient. */
  if (!header) return next();
  let [type, value] = header.split(" ");
  if (type !== "Bearer") return error();
  let verified = checkKey(value);
  if (!verified) error();
  res.locals.user = await Users.findOne({ email: verified.email });
  next();
});

api.post("/login", async (req, res) => {
  const idToken = req.body.idToken;
  const client = new OAuth2Client();
  let data;
  try {
    /* "audience" is the client ID the token was created for. A mismatch would mean the user is
       trying to use an ID token from a different app */
    const login = await client.verifyIdToken({ idToken, audience: CLIENT_ID });
    data = login.getPayload();
  } catch (e) {
    /* Something when wrong when verifying the token. */
    console.error(e);
    res.status(403).json({ error: "Invalid ID token" });
  }

  /* data contains information about the logged in user. */
  const { email } = data;
  const apiKey = jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
  const user = await Users.findOne({ email });
  res.json({ apiKey, email, user });
});

api.post("/users", async (req, res) => {
  const body = req.body;
  const verified = checkKey(body.apiKey);
  if (!verified) return res.status(400).json({ error: "Invalid key" });
  const { email } = verified;
  const existing = await Users.findOne({ email });
  if (existing) return res.status(400).json({ error: "User already exists" });
  const ids = await Users.find().sort({ _id: -1 }).limit(1).toArray();
  const _id = (ids[0]?._id || 0) + 1;
  const { pseudonym, bio, interest, personalityType } = body;
  await Users.insertOne({ _id, email, pseudonym, bio, interest, personalityType });
  res.json({ success: true });
});

api.get("/me", (req, res) => {
  const { user } = res.locals;
  if (!user) return res.json(null);
  res.json(user);
});

/* Catch-all route to return a JSON error if endpoint not defined.
   Be sure to put all of your endpoints above this one, or they will not be called. */
app.all("/*", (req, res) => {
  res.status(404).json({ error: `Endpoint not found: ${req.method} ${req.url}` });
});

app.listen(3001, () => console.log("Started"));
module.exports = app;
