require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("mongodb connection success!");
  } catch (err) {
    console.log("mongodb connection failed", err.message);
  }
};

// const connectDB = () => {
//   mongoose
//     .connect("mongodb://127.0.0.1:27017/lms", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("Failed to connect to MongoDB", err));
// };

module.exports = connectDB;
