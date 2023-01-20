//Dependencies
require("dotenv").config()
const { PORT = 3000, DATABASE_URL } = process.env
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")

//Database connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

//Connection events
mongoose.connection
    .on("open", () => console.log("You are connected to Mongoose"))
    .on("close", () => console.log("You are not connected to Mongoose"))
    .on("error", (error) => console.log(error))

//Models
const MusicSchema = new mongoose.Schema({
    artist: String,
    genre: String,
    url: String,
    song: String,
    albumImage: String,
}) 

const Music = mongoose.model("Music", MusicSchema)

//Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

//Routes

//Test route
app.get("/", (req,res) => {
    res.send("Welcome to home page!")
})

//Music index route
app.get("/music", async(req,res) => {
    try{
        res.json(await Music.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

//Music create route
app.post("/music", async(req,res) => {
    try {
        res.json(await Music.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

//Music update route
app.put("/music/:id", async(req,res) => {
    try{
        res.json(
            await Music.findByIdAndUpdate(req.params.id, req.body, {new: true})
        )
    } catch (error) {
        res.status(400).json(error)
    }
})

//Music delete route
app.delete("/music/:id", async(req,res) => {
    try{
        res.json(
            await Music.findByIdAndDelete(req.params.id)
        )
    } catch (error) {
        res.status(400).json(error)
    }
})

//Music show route
app.get("/music/:id", async(req,res) => {
    try{
        res.json(
            await Music.findById(req.params.id)
        )
    } catch (error) {
        res.status(400).json(error)
    }
})

//Listener 
app.listen(PORT, () => {
    console.log(`Port is dancing on ${PORT}`)
})



