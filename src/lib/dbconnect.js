const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URL;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default function connect(collection){
    const dbname=process.env.DB_NAME;
    return client.db(dbname).collection(collection)
}
