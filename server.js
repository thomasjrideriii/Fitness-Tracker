const express = require("express")
const mongoose = require("mongoose")
const logger = require("morgan")
const db = require("./models")
const path = require("path")
const { Workout } = require("./models")


const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"))

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {useNewUrlParser: true});

// HTML Routes


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
})

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"))
})


// API Routes

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then((dbWorkout) => {
        res.json(dbWorkout)
    })
    .catch((err) => {
        res.json(err)
    })
})

app.post("/api/workouts", (req, res) => {
    const workout = new Workout(req.body);

    Workout.create(workout)
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err)
    })
})

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then((dbWorkout) => {
        res.json(dbWorkout)
    })
    .catch((err) => {
        res.json(err)
    })
})

app.put("/api/workouts/:id", (req, res) => {
    
    

    db.Workout.update(
        {
            _id: req.params.id
        },

        updatedExersize,

        (err, data) => {
            if (err) res.json(err);
            else res.json(data)
        }
    )
})

// Listener
app.listen(PORT, () => {
    console.log("App running on port " + PORT)
})
