require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

//Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//passport stuff
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const User = require("./models/user.model");
passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { email: profile.emails[0].value },
        {
          googleID: profile.id,
          email: profile.emails[0].value,
          username: profile.emails[0].value,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

//Connect to database
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected."))
  .catch((err) => console.log(err));

//Port
const port = process.env.PORT || 5000;

//Routes
const userRouter = require("./routes/api/user");
const eventRouter = require("./routes/api/event");
const OauthRouter = require("./routes/api/OAuth");
const configsRouter = require("./routes/api/configs");

app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.use("/api/configs", configsRouter);
app.use("/", OauthRouter);

//serve static files
if (process.env.NODE_ENV == "production") {
  app.use(express.static(__dirname + "/frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/frontend" + "/build" + "/index.html");
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
