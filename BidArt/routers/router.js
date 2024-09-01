let express = require('express');
let router = express.Router();
let controller = require('../controller/controller');


router.post('/', (req, res) => {
    try {
        controller.postBid(req, res);
        console.log("Post routing success")
    }
    catch (err) {
        console.error('Error Post routing bid:', err);
    }

});

router.get('/', (req, res) => {
    try {
        controller.getAllBids(req,res);
        console.log("Get routing success")
    }
    catch (err) {
        console.error('Error Get routing bid:', err);
    }
});

module.exports = router;