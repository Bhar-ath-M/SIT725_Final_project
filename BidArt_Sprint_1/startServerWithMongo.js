let express = require('express');   //imports the Express framework, which is used to create the web server and handle routing.
let app = express();                //creates an instance of an Express application.
const { MongoClient, ServerApiVersion } = require('mongodb');   //imported from the MongoDB Node.js driver to facilitate connecting to and interacting with a MongoDB database.
// const uri = "mongodb://localhost:27017";
const uri = "mongodb+srv://bharath96athreya:9yU3cc1LHv8gDQAi@cluster0.rvmgiqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let port = process.env.port || 3000;    //sets the port on which the Express server will listen.
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}); //Creates a new MongoDB client instance.


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Bid');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', function (req,res) {
    //res.render('index.html');
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/bids', async (req,res) => {
    getAllBids((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'get all bids successful'});
        }
    });
});

/*
app.get('/api/bids', async (req, res) => {
    try {
        const bids = await collection.find({}).toArray();
        res.json({ statusCode: 200, data: bids, message: 'Get all bids successful' });
    } catch (err) {
        console.error('Error fetching bids:', err);
        res.status(500).json({ statusCode: 500, message: 'Failed to fetch bids' });
    }
});*/


app.post('/api/bid', async (req,res)=>{
    let bid = req.body;
    postBid(bid, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});


/*
app.post('/api/bid', async (req, res) => {
    let bid = req.body;
    try {
        const result = await collection.insertOne(bid);
        res.json({ statusCode: 201, data: result, message: 'Bid submitted successfully' });
    } catch (err) {
        console.error('Error inserting bid:', err);
        res.status(500).json({ statusCode: 500, message: 'Failed to submit bid' });
    }
});
*/

function postBid(bid,callback) {
    collection.insertOne(bid,callback);
}

function getAllBids(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, ()=>{ 
    console.log('express server started');
    runDBConnection(); //Initiates the connection to the MongoDB database when the server starts.
});