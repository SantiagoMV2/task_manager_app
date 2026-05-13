const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [3, "Title must be at least 3 characters"],
    required: [true, "A title is required!"],
    trim: true
  },
  priority: {
    type: String,
    enum: {
      values: [
        "low", "medium", "high",
      ],
      message: "Solo puedes insertar low, medium y high como valores"
    },
    default: "medium",
  },
  done: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
}, { timestamps: true });

taskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Task", taskSchema);
