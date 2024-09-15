var expect  = require("chai").expect;
var request = require("request");

const baseUrl = "http://localhost:3000/api/bid";

//Check if homepage URL is responding with the HTTP status code 200
describe("GET / (Homepage)", function() {
  it("should return status 200", function(done) {
      request.get("http://localhost:3000", function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
      });
  });
});


// Test for GET request to fetch all bids
describe("GET /api/bid", function() {
    it("should return status 200 and an array of bids", function(done) {
        request.get({ url: baseUrl }, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            let data = JSON.parse(body);
            expect(data.statusCode).to.equal(200);
            expect(data.data).to.be.an('array');
            done();
        });
    });
});

// Test for POST request to submit a bid
describe("POST /api/bid", function() {
  it("should submit a new bid and return status 201", function(done) {  
    let bidData = {
        name: "Test User",
        mobile: "1234567890",
        bid: 500
    };

    request.post({
        url: baseUrl,
        json: true,
        body: bidData
    }, function(error, response, body) {
        expect(body.statusCode).to.equal(201);      // Expect 201 here as well
        expect(body.message).to.equal('Bid submitted successfully');
        done();
    });
  });
});