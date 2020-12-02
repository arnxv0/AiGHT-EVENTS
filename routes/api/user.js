const router = require("express").Router();
const User = require("../../models/user.model");
const passport = require("passport");

// router.route("/").get((req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json("Error: " + err));
// });

router.route("/register").post((req, res) => {
  const user = {
    username: req.body.email,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  if (user.email === "") {
    res.json({ isSuccessful: false, err: "Email can not be empty." });
  } else if (user.password === "") {
    res.json({ isSuccessful: false, err: "Password can not be empty." });
  } else if (user.password !== user.confirmPassword) {
    res.json({
      isSuccessful: false,
      err: "Confirm password field and password field do not match.",
    });
  } else {
    User.register(
      {
        email: user.email.toLowerCase(),
        username: user.username.toLowerCase(),
      },
      user.password,
      function (err, user) {
        if (err) {
          res.json({ isSuccessful: false, error: err });
        } else {
          passport.authenticate("local")(req, res, function () {
            res.json({
              isSuccessful: true,
              details: req.user,
              isAuthenticated: req.isAuthenticated(),
            });
          });
        }
      }
    );
  }
});

router.route("/login").post((req, res) => {
  const user = new User({
    username: req.body.email.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  });

  if (user.email === "") {
    res.json({ isSuccessful: false, err: "Enter a valid email." });
  } else if (user.password === "") {
    res.json({ isSuccessful: false, err: "Password field can not be empty." });
  } else {
    req.logIn(user, function (err) {
      if (err) {
        res.json({ isSucessful: false, error: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.json({
            isSuccessful: true,
            details: req.user,
            isAuthenticated: req.isAuthenticated(),
          });
        });
      }
    });
  }
});

router.route("/logout").get((req, res) => {
  req.logOut();
  res.json({ isSuccessful: true });
});

router.route("/isAuthenticated").get((req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() });
});

router.route("/getCurrentUser").get((req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated(), details: req.user });
});

module.exports = router;
