require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect");
const movieRoutes = require("./routes/movies");
const cors = require("cors");
const app = express();

dbConnect();

app.use(cors());
app.use(express.json());

app.use("/api", movieRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api/movies`);
});