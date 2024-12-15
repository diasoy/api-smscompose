const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articlesController");

router.post("/articles", articlesController.createArticle);
router.get("/articles", articlesController.getArticles);
router.delete("/articles/:id", articlesController.deleteArticle);
router.put("/articles/:id", articlesController.updateArticle);

module.exports = router;
