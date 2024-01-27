const router = require("express").Router();
const Movie = require("../models/Movie");
const movies = require("../config/movies.json");

router.get("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    const genreOptions = [
      "Action",
      "Adventure",
      "Animation",
      "Biography",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Family",
      "Fantasy",
      "Romance",
      "Sci-fi",
      "Thriller",
    ];

    genre = genre === "All" ? genreOptions : genre.split(",");
    sort = req.query.sort ? req.query.sort.split(",") : [sort];

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const total = await Movie.find({
      name: { $regex: search, $options: "i" },
    })
      .where("genre")
      .in([...genre])
      .countDocuments();
    
    const movies = await Movie.find({
      name: { $regex: search, $options: "i" },
    })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      total_pages: Math.ceil(total / limit),
      genres: genreOptions,
      movies,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Comment these lines if already updated, Uncomment these lines to update the database if 'movies.json' is updated

const insertMovies = async () => {
  try {
    await Movie.deleteMany({});
    const docs = await Movie.insertMany(movies);
    return Promise.resolve(docs);
  } catch (err) {
    return Promise.reject(err);
  }
};

insertMovies()
  .then((docs) => {
    console.log(docs);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = router;
