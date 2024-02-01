import Book from "../models/book-model.js";
import Author from "../models/author-model.js";

export default function (server) {

    server.get('/api/books', async (req, res) => {
        try {
            res.json(await Book.find());
        } catch (error) {
            res.status(500).json({ message: "There was a problem fetching books from the server."});
        }
    });

    server.get('/api/books/:id', async (req, res) => {
        try {
            const book = await Book.findById(req.params.id).populate("author");
            if(!book) {
                return res.status(404).json({ message: "Book not found"});
            }
            res.json(book);
        } catch (error) {
            res.status(500).json({ message: "There was a problem fetching the book from the server."});
        }
    });

    server.post('/api/books', async (req, res) => {
        try {
            const newBook = new Book({ 
                title: req.body.title,
                description: req.body.description,
                author: req.body.authorId
            })
            const savedBook = await newBook.save()

            const author = await Author.findById(req.body.authorId)
            author.books.push(newBook._id)
            await author.save()

            res.status(201).json(savedBook)
        } catch (error) {
            res.status(500).json({ message: "There was a problem adding the new book to the server." })
        }
    });

    server.put('/api/books/:id', async (req, res) => {
        try {
            const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
            if(!updatedBook) {
                return res.status(404).json({ message: "Book not found." })
            }
            res.json(updatedBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "There was a server problem when attempting to update the book." });
        }
    });

    server.delete('/api/books/:id', async (req, res) => {
        try {
            const deletedBook = Book.findByIdAndDelete(req.params.id);
            if(!deletedBook) {
                return res.status(404).json({ message: "Book not found." });
            }
            res.json({ message: "Book has been deleted!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "There was a server problem when attempting to delete the book." });
        }
    });
}