let client = require('../mongoConnect');

let collection = client.db().collection('Bids');


function postBid(bid, callback) {
    collection.insertOne(bid,callback);
}

/*
function getAllBids(callback) {
    collection.find({}).toArray(callback);
}
*/

async function getAllBids() {
    try {
        const bids = await collection.find({}).toArray();
        return bids;
    } catch (err) {
        throw new Error('Failed to fetch bids from bid.js: ' + err.message);
    }
}

module.exports = {postBid,getAllBids}