const path = require("path");
const fs = require("fs");

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const db = require("./util/database");

const port = process.env.PORT ||3080;

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static(path.join("public")));

const loginRoutes = require("./routes/login");
const formsRoutes = require("./routes/froms");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// app.use(helmet());
app.use(compression());
app.use(morgan("combined", {stream: accessLogStream}));

//body-parser config;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "Hussain Forms System This is secret which can no know about it",
    resave: false,
    saveUninitialized: false,
    expires: new Date(Date.now() + 30 * 86400 * 1000),
  })
);

app.use(flash());

app.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    console.log("session cleared? " + req.session);
    res.redirect("/");
  });
});
app.use(function (req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

app.use(loginRoutes);
app.use(formsRoutes);

db.then((result) => {
  console.log("Database is connected");
  app.listen(port, () => {
    console.log(`Server in running in post ${port}`);
  });
}).catch((err) => {
  console.log(err);
});
