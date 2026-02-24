import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("teste123");
});

app.listen(3000, () => {
    console.log("servidor rodando na porta 3000");
});