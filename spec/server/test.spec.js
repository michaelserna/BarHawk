var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../server/server.js');

var fakeOrder = {
  id: 1,
  username: 'champagnepapi2',
  drinktype: 'Chardonnay',
  createdAt: '2016-03-17 14:36:51.958-07',
  closeout: 'f',
  currentprice: 9,
  totalprice: 30,
  drinkcount: 1,
};

var fakeTextMessDetails = {
  customerName: 'champagnepapi2',
  customerDrinkType: 'Chardonnay',
  customerCloseout: false
};

var fakeCustomerSignup = {
  drinkCount: 0,
  totalPrice: 0,
  firstname: 'test',
  lastname: 'test',
  username: 'testthirty',
  password: 'testpassword',
  phonenumber: 5059342914,
  photo: null,
  age: 45,
  weight: 150,
  gender: 'female'
};

var fakeCustomerLogin = {
  username: fakeCustomerSignup.username,
  password: fakeCustomerSignup.password
};

var fakeBarLogin = {
  username: 'baradmin',
  password: 'barpassword'
};

describe('Testing Suite', function () {

  it('Passes true tests', function (done) {
    expect(true).to.equal(true);
    done();
  });

  it('Fails false tests', function (done) {
    expect(2 + 2).to.equal(5);
    done();
  });
});

describe('Routes', function () {

  describe('Customer Routes', function () {

    describe('Signing up: POST to /api/customers/signup', function () {

      it('should return 200, currentUser, and token', function (done) {
        request(app)
          .post('/api/customers/signup')
          .send(fakeCustomerSignup)
          .expect(200)
          .end(function (err, res) {
            expect(res.body).to.have.property('currentUser');
            expect(res.body).to.have.property('token');
            expect(res.body).to.not.have.property('notAProperty');
            done();
          })
      });

      it('should return 401 if user already signed up', function (done) {
        request(app)
          .post('/api/customers/signup')
          .send(fakeCustomerSignup)
          .expect(401, done)
      })
    });

    describe('Logging in: POST to /api/customers/login', function () {

      it('should return 401 if no user sent', function (done) {
        request(app)
          .post('/api/customers/login')
          .send({})
          .expect(401, done)
      });

      xit('should return 200 if user sent', function (done) {
        request(app)
          .post('/api/cusotmers/login')
          .send(fakeCustomerLogin)
          .end(function (err, res) {
            console.log('xxxxx this is res.body: ', res.body);
            done();
          });
      });
    });
  });

  describe('Bar Queue Routes', function () {

    describe('Showing pending orders: POST to /api/barqueue/showPendingOrders', function () {

      it('should return 200 to logged in bartender', function (done) {
        request(app)
          .post('/api/barqueue/showPendingOrders')
          .send(fakeBarLogin)
          .expect(200, done);
      });

      it('should return 401 to non-bartenders', function (done) {
        request(app)
          .post('/api/barqueue/showPendingOrders')
          .send(fakeCustomerLogin)
          .expect(401, done);
      });
    });

    describe('Completing orders: POST to /api/barqueue/completeOrder', function () {

      it('should return 200 when orders table updated', function (done) {
        request(app)
          .post('/api/barqueue/completeOrder')
          .send(fakeOrder)
          .expect(200, done);
      });

      it('should return 404 if orders table not updated', function (done) {
        request(app)
          .post('/api/barqueue/completeOrder')
          .send({})
          .expect(404, done);
      });
    });

    describe('Text messages when order ready: POST to /api/barqueue/orderCompleteTextMessage', function () {

      it('should return 200 when order complete', function (done) {
        request(app)
          .post('/api/barqueue/orderCompleteTextMessage')
          .send(fakeTextMessDetails)
          .expect(200, done);
      });
    });

  });

});





// var app = require('../../server/server.js');
// var barqueueController = require('../../server/barqueue/barqueueController.js');
// var Sequelize = require('sequelize'); 

// describe('Server', function(){
//   beforeAll(function(done){
//     this.server = app.listen(3001, function(){
//       console.log('server now listening on 3001');
//       done();
//     });
//   });

//   beforeEach(function(done){
//     db = new Sequelize('test', null, null);

//   })

//   afterAll(function(done){
//     this.server.close(function(){
//       console.log('the server is now closed');
//       done();
//     });

//   });

//   describe('barqueueController', function(){

//     describe('showPendingOrders', function(){

//       it('should be a function', function(done){
//         expect(typeof barqueueController.showPendingOrders).toBe('function');
//           done();
//       });
//     });
//   });
// });
