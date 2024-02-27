const Book = require("../models/book");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

// Get all books
const getAllBooks = async (req, res) => {
  try {
    // Extract query parameters
    const { author, type, category, priceMin, priceMax, sort } = req.query;

    // Construct filter object based on query parameters
    const filter = {};
    if (author) filter.author = { $regex: new RegExp(author, "i") }; // Case-insensitive search
    if (type) filter.type = { $regex: new RegExp(type, "i") }; // Case-insensitive search
    if (category) filter.category = { $regex: new RegExp(category, "i") }; // Case-insensitive search
    if (priceMin !== undefined && priceMax !== undefined) {
      filter.price = { $gte: parseFloat(priceMin), $lte: parseFloat(priceMax) };
    } else if (priceMin !== undefined) {
      filter.price = { $gte: parseFloat(priceMin) };
    } else if (priceMax !== undefined) {
      filter.price = { $lte: parseFloat(priceMax) };
    }

    // Construct sort object based on query parameter
    let sortCriteria = {};
    if (sort) {
      const sortFields = sort.split(",");
      sortFields.forEach((field) => {
        if (field.startsWith("-")) {
          sortCriteria[field.substr(1)] = -1; // Sort by descending order
        } else {
          sortCriteria[field] = 1; // Sort by ascending order
        }
      });
    }

    // Find books based on filter and sort
    const books = await Book.find(filter).sort(sortCriteria);

    res.status(StatusCodes.OK).json({ books, count: books.length });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// Create a new book
const createBook = async (req, res) => {
  const { type, title, author, price, sku } = req.body;

  if (!type || !title || !author || !sku || !price) {
    throw new BadRequestError(
      "title, author, type, sku and price are required fields"
    );
  }

  try {
    const book = await Book.create({ type, title, author, price, sku });
    res.status(StatusCodes.CREATED).json({ book });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// Get a specific book by ID
const getBook = async (req, res) => {
  const {
    params: { id: bookId },
  } = req;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      throw new NotFoundError(`Book with id ${bookId} not found`);
    }
    res.status(StatusCodes.OK).json({ book });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// Update a book by ID
const updateBook = async (req, res) => {
  const {
    body: { title, author, description, price },
    params: { id: bookIdToUpdate },
  } = req;

  if (!title && !author && !description && !price) {
    throw new BadRequestError("At least one field must be provided to update");
  }

  try {
    const bookToUpdate = await Book.findById(bookIdToUpdate);
    if (!bookToUpdate) {
      throw new NotFoundError(`Book with id ${bookIdToUpdate} not found`);
    }

    if (title) bookToUpdate.title = title;
    if (author) bookToUpdate.author = author;
    if (description) bookToUpdate.description = description;
    if (price) bookToUpdate.price = price;

    const updatedBook = await bookToUpdate.save();
    res.status(StatusCodes.OK).json({ book: updatedBook });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  const {
    user: { role },
    params: { id: bookId },
  } = req;

  if (role !== "owner") {
    throw new UnauthenticatedError(
      "Your Role is not sufficient for this action."
    );
  }

  try {
    const book = await Book.findByIdAndDelete(bookId);
    if (!book) {
      throw new NotFoundError(`No book with id ${bookId}`);
    }
    res
      .status(StatusCodes.OK)
      .json({ book, msg: "Book was deleted successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
