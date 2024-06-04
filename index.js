import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import routerGetBank from './routes/getbank';
const app = express();
app.use(cors());
app.use(express.json());
async function connect() {
  try {
    await mongoose.connect('mongodb+srv://oninecv:i6G0omrkIWsyKG8R@cluster0.nhxhbsl.mongodb.net/', { useNewUrlParser: true });
    console.log("Mongoose connect succsess");
  } catch (error) {
    console.log(error);
  }
}
connect();
app.use("/api", routerGetBank);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("NodeJs is running PORT ", PORT);
});