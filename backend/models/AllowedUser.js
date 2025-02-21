import mongoose from 'mongoose';

const AllowedUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
});

const AllowedUser = mongoose.model('AllowedUser', AllowedUserSchema);

export default AllowedUser;
