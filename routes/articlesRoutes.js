const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');

router.get('/articles', articlesController.getArticles);
router.get('/articles/:id', articlesController.getArticleById);
router.post('/articles', articlesController.createArticle);
router.put('/articles/:id', articlesController.updateArticle);
router.delete('/articles/:id', articlesController.deleteArticle);

module.exports = router;