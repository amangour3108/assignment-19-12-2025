import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: String,
  description: String,
  designation: String,
  image: String
});

export default mongoose.model("Client", clientSchema);
