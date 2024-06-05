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
let Threads;
let Invites;
let Journals;

app.set("json spaces", 2);
app.use(bodyParser.json(), cors());
app.use("/api", async (req, res, next) => {
  const conn = await MongoClient.connect(MONGODB_URL);
  db = conn.db("deeptalks");
  Users = db.collection("users");
  Threads = db.collection("threads");
  Invites = db.collection("invites");
  Journals = db.collection("journals");
  next();
}, api);

api.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
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

function requireAuth(req, res, next) {
  if (!res.locals.user) return res.status(401).json({ error: "Must be logged in" });
  next();
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

api.get("/users", async (req, res) => {
  const users = {};
  for (const user of await Users.find().toArray()) {
    delete user.email;
    users[user._id] = user;
  }
  res.json(users);
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

api.get("/threads", async (req, res) => {
  const threads = {};
  for (const t of await Threads.find().toArray()) {
    threads[t._id] = t;
  }
  res.json(threads);
});

api.post("/threads", requireAuth, async (req, res) => {
  const { title, content } = req.body;
  const author_id = res.locals.user._id;
  const ids = await Threads.find().sort({ _id: -1 }).limit(1).toArray();
  const _id = (ids[0]?._id || 0) + 1;
  await Threads.insertOne({ _id, title, content, author_id, comments: [] });
  res.json({ _id });
});

api.post("/threads/:id/comments", requireAuth, async (req, res) => {
  const thread = await Threads.findOne({ _id: Number(req.params.id) });
  if (!thread) return res.status(404).json({ error: "Thread not found" });

  const { content } = req.body;
  const author_id = res.locals.user._id;
  thread.comments.push({ content, author_id });
  await Threads.replaceOne({ _id: thread._id }, thread);
  res.json({ success: true });
});

api.get("/invites", requireAuth, async (req, res) => {
  const invites = await Invites.find({ recipient_id: res.locals.user._id, status: "pending" }).toArray();
  res.json({ invites });
});

api.post("/invites", requireAuth, async (req, res) => {
  const { message, recipient, topics } = req.body;
  const r = await Users.findOne({ _id: recipient });
  if (!r) return res.status(404).json({ error: "Invalid recipient" });
  const ids = await Invites.find().sort({ _id: -1 }).limit(1).toArray();
  const _id = (ids[0]?._id || 0) + 1;
  await Invites.insertOne({ _id, sender_id: res.locals.user._id, recipient_id: r._id, message, topics, status: "pending" });
  res.json({ success: true });
});

api.post("/invites/:id/:action", requireAuth, async (req, res) => {
  const { id, action } = req.params;
  if (action !== "accept" && action !== "decline") return res.status(400).json({ error: "Invalid action" });
  const i = await Invites.findOne({ _id: id }).toArray();
  if (!i || i.recipient_id !== res.locals.user._id || i.status !== "pending") return res.status(400).json({ error: "Invalid invite" });
  i.status = action;
  await Invites.replaceOne({ _id: i._id }, i);
  res.json({ success: true });
});

api.get("/journal", requireAuth, async (req, res) => {
  const entries = await Journals.find({ author_id: res.locals.user._id }).toArray();
  res.json({ entries });
});

api.post("/journal", requireAuth, async (req, res) => {
  const body = req.body;
  const ids = await Journals.find().sort({ _id: -1 }).limit(1).toArray();
  body._id = (ids[0]?._id || 0) + 1;
  body.author_id = res.locals.user._id;
  body.time = new Date();
  await Journals.insertOne(body);
  res.json({ _id: body._id });
});

/* Catch-all route to return a JSON error if endpoint not defined.
   Be sure to put all of your endpoints above this one, or they will not be called. */
app.all("/*", (req, res) => {
  res.status(404).json({ error: `Endpoint not found: ${req.method} ${req.url}` });
});

//app.listen(3001, () => console.log("Started"));
module.exports = app;
