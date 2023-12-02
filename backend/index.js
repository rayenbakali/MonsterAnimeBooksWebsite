import express, { response } from "express";
import { PORT, DB_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/book.js";
const app = express();

//Middleware for parsing request body

app.use(express.json());
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

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

//Post request
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Get books

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
