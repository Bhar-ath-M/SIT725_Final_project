// Use top-level await to dynamically import chai
const { expect } = await import('chai');
const request = await import('request');

// The rest of your test cases
describe("Bid API Tests", function() {

  // Test for GET /api/bid
  it("should return status 200 and all bids", function(done) {
    request.get("http://localhost:3000/api/bid", function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      const data = JSON.parse(body);
      expect(data).to.be.an('object');
      expect(data).to.have.property('data').that.is.an('array');
      done();
    });
  });

  // Test for POST /api/bid
  it("should submit a new bid and return status 201", function(done) {
    const newBid = {
      name: 'John Doe',
      mobile: '1234567890',
      bid: 1000
    };

    request.post({
      url: "http://localhost:3000/api/bid",
      json: newBid
    }, function(error, response, body) {
      expect(response.statusCode).to.equal(201);
      expect(body).to.be.an('object');
      expect(body).to.have.property('message').eql('Bid submitted successfully');
      done();
    });
  });

  // Test POST /api/bid with missing data (error case)
  it("should fail to submit a bid with missing fields", function(done) {
    const incompleteBid = {
      name: 'Jane Doe'
      // missing mobile and bid amount
    };

    request.post({
      url: "http://localhost:3000/api/bid",
      json: incompleteBid
    }, function(error, response, body) {
      expect(response.statusCode).to.equal(500); // assuming the server sends 500 for validation errors
      expect(body).to.be.an('object');
      expect(body).to.have.property('message').eql('Failed to submit bid');
      done();
    });
  });
});
