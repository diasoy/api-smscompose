// filepath: /c:/Users/User/Documents/Project VSCode/api-smscompose/controllers/articlesController.js
const db = require('../services/db');

const createArticle = (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({
      error: true,
      message: "Title, content, and author are required",
    });
  }

  db.query('INSERT INTO articles (title, content, author) VALUES (?, ?, ?)', [title, content, author], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }
    res.status(201).json({
      error: false,
      message: "Article created successfully",
      data: {
        articleId: results.insertId,
        title,
        content,
        author,
      },
    });
  });
};

const getArticles = (req, res) => {
  db.query('SELECT * FROM articles', (err, results) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }
    res.status(200).json({
      error: false,
      message: "Berhasil menampilkan data articles",
      data: results,
    });
  });
};

const getArticleById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM articles WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }
    res.status(200).json({
      error: false,
      message: "Berhasil menampilkan data article",
      data: results[0],
    });
  });
};

const deleteArticle = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM articles WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }
    res.status(200).json({
      error: false,
      message: "Article deleted successfully",
    });
  });
};

const updateArticle = (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  db.query('UPDATE articles SET title = ?, content = ?, author = ? WHERE id = ?', [title, content, author, id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }
    res.status(200).json({
      error: false,
      message: "Article updated successfully",
    });
  });
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  deleteArticle,
  updateArticle,
};