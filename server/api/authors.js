import Author from "../models/author-model.js";

export default function (server) {

    server.get("/api/authors", async (req, res) => {
        try {
            res.json(await Author.find());
        } catch (error) {
            res.status(500).json({ message: "There was a problem fetching authors from the server." })
        }
    });

    server.get("/api/authors", async (req, res) => {
        try {
            const author = await Author.findById(req.params.Id).populate("books")
            if(!author) {
                return res.status(404).json({ message: "Author not found." })
            }
            res.json(author)
        } catch (error) {
            res.status(500).json({ message: "There was a problem fetching the author from the server." })
        }
    });

    server.post("/api/authors", async (req, res) => {
        try {
            const newAuthor = new Author({
                name: req.body.name,
                age: req.body.age
            })
            const savedAuthor = await newAuthor.save();
            res.status(201).json(savedAuthor)
        } catch (error) {
            res.status(500).json({ message: "There was a problem adding the new author." })
        }
    });

    server.put('/api/authors/:id', async (req, res) => {
        try {
            const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body);
            if(!updatedAuthor) {
                return res.status(404).json({ message: "Author not found." })
            }
            res.json(updatedAuthor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "There was a server problem when attempting to update the author." });
        }
    });

    server.delete('/api/authors/:id', async (req, res) => {
        try {
            const deletedAuthor = Author.findByIdAndDelete(req.params.id);
            if(!deletedAuthor) {
                return res.status(404).json({ message: "Author not found." });
            }
            res.json({ message: "Author has been deleted!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "There was a server problem when attempting to delete the author." });
        }
    });
}