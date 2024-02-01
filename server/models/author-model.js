import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "books" }]
});

const Author = mongoose.model("authors", authorSchema);

export default Author;

