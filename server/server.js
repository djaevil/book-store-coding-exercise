import express from "express";
import mongoose from "mongoose";
import apiRegister from "./api-register.js";

const server = express();

const port = 3000;

server.use(express.json());

mongoose.connect("mongodb+srv://admin:qwerty123@cluster0.mvygmm5.mongodb.net/bookstore");

apiRegister(server);

server.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
});

