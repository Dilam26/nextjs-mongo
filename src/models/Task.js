import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    isCompleted: {
        type: Boolean,
        required: false,
        default: false
    }
},{
    timestamps: true
});

export default models.Task ||  model("Task", TaskSchema);