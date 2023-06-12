import mongoose from "mongoose";
const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
  rol: {
    type: String,
    default: "sin rol",
  },
});
mongoose.set("strictQuery", false);
const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;
