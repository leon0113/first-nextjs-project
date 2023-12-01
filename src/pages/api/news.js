
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://News:DEhu9vRO5v1haSfo@cluster0.uvyemjj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run(req, res) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const newsCollection = client.db("News-Portal").collection("newses");

        if (req.method === 'GET') {
            const newses = await newsCollection.find({}).toArray();
            res.send({ message: "Success", status: 200, data: newses })
        }

        if (req.method === "POST") {
            const news = req.body;
            const result = await newsCollection.insertOne(news);
            res.json(result);
        }

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

export default run;
