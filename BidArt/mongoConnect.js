const { MongoClient, ServerApiVersion } = require('mongodb');   //imported from the MongoDB Node.js driver to facilitate connecting to and interacting with a MongoDB database.
// const uri = "mongodb://localhost:27017";
const uri = "mongodb+srv://bharath96athreya:9yU3cc1LHv8gDQAi@cluster0.rvmgiqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}); //Creates a new MongoDB client instance.


client.connect();

module.exports = client;