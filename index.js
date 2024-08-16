const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4wc44xb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const productCollection = client.db('ShopSphere').collection('products')

        app.get('/products', async (req, res) => {
            const result = await productCollection.find().toArray()
            res.send(result);
        })

        //for pagination
        app.get('/all-products', async (req, res) => {
            const size = parseInt(req.query.size)
            const page = parseInt(req.query.page) - 1
            const brand = req.query.brand;
            const category = req.query.category;
            const priceRange = req.query.priceRange;
            //create a filter object
            let filter = {}
            if(brand){
                filter.brand = brand;
            }
            if(category){
                filter.category = category;
            }
            if(priceRange){
                const[minPrice,maxPrice] = priceRange.split('-').map(Number)
                filter.price = {$gte:minPrice, $lte: maxPrice}
            }
            const result = await productCollection.find(filter).skip(page * size).limit(size).toArray()
            res.send(result);
        })

        //for data count
        app.get('/products-count', async (req, res) => {
            const count = await productCollection.countDocuments()
            res.send({ count });
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('ShopSphere server is running')
})
app.listen(port, () => {
    console.log(`Server is running on port:${port}`)
})