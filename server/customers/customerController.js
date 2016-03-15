var jwt = require('jwt-simple');

//dummy users table
var users = {
  Michael: {
    username: 'Michael',
    password: "password",
    age: 25,
    weight: 160,
    gender: "Male",
    drinkCount: 0,
    totalPrice: 0
  }
};

module.exports = {
  login: function (req, res) {
    //set username/password request to attempt variable
    var attempt = req.body;
    if (attempt.username in users) {
      if (users[attempt.username].password === attempt.password) {
        var token = jwt.encode(users[attempt.username], 'barHawksecret444');
        res.json({
          currentUser: users[attempt.username],
          token: token
        });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  },

  //the below is used with the PostgreSQL db
  // signup: function (req, res) {
  //   //assigning drink order to variable
  //   var ord = req.body;
  //   console.log('ord info', ord)


  //   models.users.findOrCreate({
  //     where: { username: ord.username },
  //     defaults: {
  //       password: ord.password,
  //       weight: ord.weight,
  //       gender: ord.gender,
  //       photo: ord.photo
  //     }
  //   }).spread(function (user, created) {
  //     console.log("able to create new user " + ord.username + "?", created);
  //     // //returns preexisting user
  //     var userObj = user.get({
  //       plain: false
  //     });
  //     if (created) {
  //       res.send(userObj);
  //     } else {
  //       res.sendStatus(401);
  //     }
  //   })
  // },

  signup: function (req, res) {
    var ord = req.body;
    console.log("hit route for signup successfully");
    console.log('ord info', ord);

    models.users.findOrCreate({
      where: { username: ord.username },
      defaults: {
        firstname: ord.firstname,
        lastname: ord.lastname,
        password: ord.password,
        age: ord.age,
        weight: ord.weight,
        gender: ord.gender,
        photo: ord.photo,
        phone: ord.phonenumber
      }
    }).spread(function (user, created) {
      console.log("able to create new user " + ord.username + "?", created);
      // //returns preexisting user
      var userObj = user.get({
        plain: false
      });
      if (created) {

        users[ord.username] = ord;
        var token = jwt.encode(users[ord.username], 'barHawksecret444');
        res.json({
          currentUser: ord,
          token: token
        });
      } else {
        res.sendStatus(401);
      }
    });

  }
};