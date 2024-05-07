const express = require("express");
const mongoose = require("mongoose")
const app = express()
const port = 3000


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

const collection = mongoose.connection.db.collection("data");
app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/details", async (req, res) => {
    try {
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log("app is listening on port " + port)
})