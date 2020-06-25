const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Enter an exercise type."
        },
        name : {
            type: String,
            trim: true,
            required: "Enter a name for your exercise."
        },
        duration: {
            type: Number,
            required: "Enter the proper duration of your exercise, in minutes."
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        }
    }]
},
{toJSON: {virtuals:true}}
);

WorkoutSchema.virtual("totalDuration").get(function() {
    return this.exercises.reduce((total, current) =>{
        return total + current.duration
    }, 0)
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;