import mongoose from "mongoose";

const allowedUsernameSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
});

const AllowedUsername = mongoose.model("AllowedUsername", allowedUsernameSchema);
export default AllowedUsername;
