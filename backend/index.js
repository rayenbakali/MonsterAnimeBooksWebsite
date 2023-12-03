import express, { response } from "express";
import { PORT, DB_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/book.js";
import booksRoute from "./routes/booksroute.js";
import cors from "cors";
const app = express();

//Middleware for parsing request body
app.use(express.json());
//Cors for everything:
//app.use(cors());
//Custom Cors :
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("It's working");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Nope sadly");
  });

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

app.use("/books", booksRoute);
