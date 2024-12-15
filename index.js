const express = require("express");
const articlesRoutes = require("./routes/articlesRoutes");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/api", articlesRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
