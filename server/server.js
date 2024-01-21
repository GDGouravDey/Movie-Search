require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect");
const cors = require("cors");
const app = express();

dbConnect();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});