const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    favourite: [{
        type: Schema.Types.ObjectId,
        ref: "property"
    }]
});

user.pre("save", function (next) {
    var user = this;
    if (user.isModified("password")) {
        bcrypt
            .hash(user.password, 10)
            .then(function (hashedPassword) {
                user.password = hashedPassword;
                next();
            })
            .catch(function (err) {
                next(err);
            });
    }
});

user.statics.userFind = function(email, password) {
  var userObj = null;
  return new Promise(function(resolve, reject) {
    User.findOne({ email: email })
      .then(function(user) {
        if (!user) reject("Incorrect Credintials");
        userObj = user;
        return bcrypt.compare(password, user.password);
      })
      .then(function(isMatched) {
        if (!isMatched) reject("Incorrect credentials");
        resolve(userObj);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};

var User = mongoose.model("user", user);
module.exports = User;