const db = require("../services/db");

const createArticle = async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({
      error: true,
      message: "Title, content, and author are required",
    });
  }

  try {
    const [results] = await db.query(
      "INSERT INTO articles (title, content, author) VALUES (?, ?, ?)",
      [title, content, author]
    );
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
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const getArticles = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM articles");
    res.status(200).json({
      error: false,
      message: "Berhasil menampilkan data articles",
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query("SELECT * FROM articles WHERE id = ?", [
      id,
    ]);
    res.status(200).json({
      error: false,
      message: "Berhasil menampilkan data article",
      data: results[0],
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM articles WHERE id = ?", [id]);
    res.status(200).json({
      error: false,
      message: "Article deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    await db.query(
      "UPDATE articles SET title = ?, content = ?, author = ? WHERE id = ?",
      [title, content, author, id]
    );
    res.status(200).json({
      error: false,
      message: "Article updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  deleteArticle,
  updateArticle,
};
