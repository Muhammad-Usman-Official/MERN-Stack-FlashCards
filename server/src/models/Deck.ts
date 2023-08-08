import mongoose from "mongoose";

const Schema = mongoose.Schema;
//TODO: // add @param ObjectId in the DeckSchema later
const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
  title: {
    type: String,
    minlength: [1, `Title is shorter than the minimum allowed characters!`],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const DeckModel = mongoose.model("Deck", DeckSchema);
export default DeckModel;
