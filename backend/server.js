const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const app = express();
const port = 5000;
app.use(express.json());
mongoose
  .connect("mongodb+srv://srk001929:silvercoin@cluster0.kfzmtoc.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("Database is not connected", error);
  });

const booksSchema = new mongoose.Schema({
  userName: String,
  email: String,
  title: String,
  author: String,
});

const Book = mongoose.model("Book", booksSchema);

app.post("/books", async (req, res) => {
  const { title, author, userName, email } = req.body;
  if (!userName || !title || !author || !email) {
    res.status(400).json({ message: "All fields are required" });
  } else if (!validator.isEmail(email)) {
    res.status(400).json({ message: "Please enter the valid email" });
  } else {
    const book = new Book({
      userName,
      email,
      title,
      author,
    });
    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (error) {
      console.log(error, "dfkjdfsj");
      res.status(400).json({ message: error.message });
    }
  }
});

app.get("/books", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    res.json(book);
  } catch (err) {
    console.log(err);
  }
});

app.put("/book/:id", async (req, res) => {
  const id = req.params.id;
  const { title, author, userName, email } = req.body;
  if (!userName || !title || !author || !email) {
    res.status(400).json({ message: "All fields are required" });
  } else if (!validator.isEmail(email)) {
    res.status(400).json({ message: "Please enter the valid email" });
  } else {
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        {
          title,
          author,
          userName,
          email,
        },
        { new: true }
      );
      res.json(updatedBook);
    } catch (error) {
      console.log(error, "fjdjfjfjf");
    }
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBook = await Book.findByIdAndDelete(id);
    res.json({ message: "Book deleted Successfully" });
  } catch (err) {
    console.log(err, "defyhuiko");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
