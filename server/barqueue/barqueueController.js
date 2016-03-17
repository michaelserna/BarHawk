var accountSid = 'AC68614f28addcc82ca25a94fa00c12e18';
var authToken = '6eb7ad33bde4db24242e898205bc9a8a';
var client = require('twilio')(accountSid, authToken);
var models = require('../models')
var db = require('../models/index.js')
var moment = require("moment")

//dummy orders table
var ordersArray = [{
  username: 'zeebow',
  drinkType: 'beer',
  time: 'Tue Mar 08 2016 16:24:37 GMT-0800 (PST)',
  closeout: false,
  currentPrice: 5,
  totalPrice: 60,
  drinkCount: 1,
  showInQueue: true
}, {
  username: "Nadine",
  drinkType: "beer",
  time: 'Tue Mar 08 2016 17:24:37 GMT-0800 (PST)',
  closeout: false,
  currentPrice: 5,
  totalPrice: 100,
  drinkCount: 4,
  showInQueue: true
}, {
  username: "Collin",
  drinkType: "wine",
  time: 'Tue Mar 08 2016 18:24:37 GMT-0800 (PST)',
  closeout: false,
  currentPrice: 5,
  totalPrice: 15,
  drinkCount: 8,
  showInQueue: true
}];

module.exports = {

  showPendingOrders: function (req, res) {
    if (req.body.username === 'baradmin' && req.body.password === 'barpassword') {
      //only send back to bar queue those orders which have not yet been completed
      db.sequelize.query("Select * from orders where completed = 'f';")
        .then(function (pendingOrder) {
          res.status(200);
          res.send(pendingOrder[0]);
        })

    } else {
      res.status(401).send();
    }
  },

  completeOrder: function (req, res) {

    db.sequelize.query("Update orders set completed = 't' where id = '" + req.body.id + "';")

    .then(function (orderToBeCompleted) {
      res.sendStatus(200);
    });

  },

  orderCompleteTextMessage: function (req, res) {
    var customerName = req.body.customerName;
    var drinkType = req.body.customerDrinkType;
    var toPhoneNum;


    db.sequelize.query("Select phone from users where username = '" + customerName + "';")
      .then(function (targetPhoneNum) {
        client.messages.create({
          to: '+1' + targetPhoneNum[0]['0'].phone,
          from: '+15754485544',
          body: 'hey ' + customerName + ', your ' + drinkType + ' is ready.'
        }, function (err, message) {
          if (err) {
            console.log(err);
          } else {
            console.log(message);
            res.end();
          }
        });
      })
  }
};
