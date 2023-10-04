const fs = require('fs');
const path = require('path');
const { AppError } = require('../../utils/errorController');
const { v4: uuIdv4 } = require('uuid');

const filePath = path.resolve(__dirname, 'library.json');

const getFile = (func) => {
  if (!fs.existsSync(filePath)) {
    fs.closeSync(fs.openSync(filePath, 'w'));
  }
  const file = !!fs.readFileSync(filePath).toString()
    ? JSON.parse(fs.readFileSync(filePath))
    : [];

  return (req, res, next) => {
    func(req, res, next, file);
  };
};

const setLibraryFile = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data));
};

const addBookController = getFile((req, res, next, file) => {
  const book = req.body;

  if (file.some((f) => f.title.toLowerCase() === book?.title.toLowerCase())) {
    throw new AppError(`${book?.title} is already exist in library`, 400);
  } else {
    book.id = uuIdv4();
    setLibraryFile([...file, book]);
  }
  res.status(201).send({ book });
});

const updateBookController = getFile((req, res, next, file) => {
  const bookId = req.params.bookId;
  const newFile = [...file];
  const book = req.body;
  const index = newFile.findIndex((f) => f.id === bookId);

  if (index > -1) {
    // updating book object
    newFile.splice(index, 1, {
      ...newFile[index],
      ...book,
    });
    setLibraryFile(newFile);
    res.status(200).send({ book: newFile });
  } else {
    throw new AppError(`Book is not exist in the library`, 404);
  }
});

const FILTER_KEYWORD = ['title', 'author', 'year', 'readingStatus'];

const getBooksController = getFile((req, res, next, file) => {
  if (req.params.bookId) {
    const book = file.find((f) => f.id === req.params.bookId);
    if (book) {
      res.status(200).send(book);
    } else {
      throw new AppError('Requested Book Id is not exist', 404);
    }
    return;
  } else if (Object.keys(req.query)?.length) {
    const query = {};
    Object.entries(req.query).forEach(([type, value]) => {
      if (FILTER_KEYWORD.includes(type) && value) {
        query[type] = type === 'year' ? Number(value) : value;
      }
    });

    const books = file.filter((f) => {
      return Object.entries(query).every(([query, value]) => {
        return f[query] === value;
      });
    });
    res.status(200).send(books);
    return;
  }
  res.status(200).send(file);
});

const deleteBookController = getFile((req, res, next, file) => {
  const index = file.findIndex((f) => f.id === req.params.bookId);
  const newFile = [...file];
  if (index > -1) {
    newFile.splice(index, 1);

    setLibraryFile(newFile);
    res.status(200).send(newFile);
  } else {
    throw new AppError('Book does not exist', 400);
  }
});

module.exports = {
  addBookController,
  updateBookController,
  getBooksController,
  deleteBookController,
};
