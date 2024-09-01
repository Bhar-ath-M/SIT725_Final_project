let collection = require('../model/bid');

const postBid = async (req,res) => {
    let bid = req.body;
    try {
        const result = await collection.postBid(bid);
        res.json({ statusCode: 201, data: result, message: 'Bid submitted successfully' });
    } catch (err) {
        console.error('Error inserting bid:', err);
        res.status(500).json({ statusCode: 500, message: 'Failed to submit bid' });
    }
}

const getAllBids = async (req,res) => {
    try {
        const bids = await collection.getAllBids();
        res.json({ statusCode: 200, data: bids, message: 'Get all bids successful' });
    } catch (err) {
        console.error('Error fetching bids:', err);
        res.status(500).json({ statusCode: 500, message: 'Failed to fetch bids' });
    }
}

module.exports = {postBid,getAllBids}