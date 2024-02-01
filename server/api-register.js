import books from "./api/books.js";
import authors from "./api/authors.js";

export default function (server) {
  books(server)
  authors(server)
}