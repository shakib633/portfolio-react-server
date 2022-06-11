const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xo1ear5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const projectCollection = client.db("profolio").collection("projects");
       

        // get all projects 
        app.get('/project', async (req, res) => {
            const query = {};
            const cursor = projectCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
        });

        // get single project
        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const project = await projectCollection.findOne(query);
            res.send(project);
        });

       
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello from Portfolio Website!')
})

app.listen(port, () => {
    console.log(`Portfolio Website listening on port ${port}`)
})