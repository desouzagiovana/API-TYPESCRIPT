import express from "express";
import { config } from "dotenv";

config();

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening ON PORT ${port}`));

app.get("/", (req, res) => {
  res.send("Giovana hello world!");
});
