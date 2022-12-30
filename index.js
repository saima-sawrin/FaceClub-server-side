const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion  } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9wy3smt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const postCollection = client.db('faceClub').collection('Post');
    

    app.get('/Post', async (req, res) => {
      const query = {}
      const cursor = postCollection.find(query).sort({like:-1});
      const services = await cursor.toArray();
      res.send(services);
      });
    app.get('/allPost', async (req, res) => {
      const query = {}
      const cursor = postCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
      });
      app.post('/post', async (req, res) => {
        const post = req.body;
        const result = await postCollection.insertOne(post);
        res.send(result);
        });
  }
  finally{

  }
}
run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('Face Club server is running')
    })
    
    app.listen(port, () => {
    console.log(`Face Club  server running on ${port}`);
    })