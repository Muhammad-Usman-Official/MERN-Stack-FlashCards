import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
  title: String,
  id: ObjectId,
  date: Date,
});

const DeckModel = mongoose.model("Deck", DeckSchema);
export default DeckModel;
