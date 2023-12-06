import express from "express";
import { Book } from "../models/book.js";
const router = express.Router();
//Post request
router.post("/", async (request, response) => {
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
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Get One single book by id
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  //Or
  // {id} = req.params;
  try {
    const book = await Book.findById(userId);
    return res.status(200).json(
      book
      // title: book.title,
      // author: book.author,
      // publishYear: book.publishYear,
      // createdAt: book.createdAt,
      // updatedAt: book.updatedAt,
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      console.log("Please input all values");
      return res.status(500).send({
        message: "Send all required fields : title ,authot , publish year",
      });
    }
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Please right id format");
      return res.status(500).send({
        message: "Send Valid Id please",
      });
    }
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "book updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//Delete  book
router.delete("/:id", async (req, res) => {
  const books = await Book.find({});
  console.log(books.length);
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    console.log(result);
    if (!result) {
      return res
        .status(404)
        .send({ length: books.length, message: "Book not found" });
    }
    const newbooks = await Book.find({});
    return res
      .status(200)
      .send({ length: newbooks.length, message: "Book deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
export default router;
