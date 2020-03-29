const User = require("../model/user");
var jwt = require("jsonwebtoken");

var privateKey = "secret key";

function authenticate(req, res, next) {
    // Check whether user has given back the token
    var authToken = req.header("Authorization");

    if (authToken) {
        User.findOne({ token: authToken })
            .then(function(user) {
                if (user === undefined) {
                    return res.status(401).send("Invalid credentials");
                } else {
                    jwt.verify(user.token, privateKey, function(err, payload) {
                        if (err) {
                            console.log(err);
                            return res.status(401).send("Invalid credentials");
                        } else {
                            // This step is made to make sure the succeding middlewares have the access to this data.
                            req.user = user;
                            next();
                        }
                    });
                }
            })
            .catch(function(err) {
                res.send("Invalid Creadintials");
            });
    } else {
        res.send("Invalid Creadintials");
    }
}
module.exports = authenticate;
