const express = require('express');
const cors = require('cors');

// const { MongoClient, ServerApiVersion , ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

app.get('/allServices', async (req, res) => {
    
    const query = {}
    const cursor = serviceCollection.find(query).sort({price:1});
    const services = await cursor.toArray();
    res.send(services);
    });
app.get('/', (req, res) => {
    res.send('Face Club server is running')
    })
    
    app.listen(port, () => {
    console.log(`Face Club  server running on ${port}`);
    })