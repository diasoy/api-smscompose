const db = require("../services/db");
const { v4: uuidv4 } = require("uuid");

exports.createArticle = async (req, res) => {
  const { title, content, author } = req.body;
  const id = uuidv4();

  if (!title || !content || !author) {
    return res.status(400).json({ 
      error: true, 
      message: "Title, content, and author are required" 
    });
  }

  const query = "INSERT INTO articles (id, title, content, author) VALUES (?, ?, ?, ?)";
  try {
    const [results] = await db.query(query, [id, title, content, author]);
    res.status(201).json({
      error: false,
      message: "Article created successfully",
      data: {
        articleId: id,
        title: title,
        content: content,
        author: author
      }
    });
  } catch (err) {
    res.status(500).json({ 
      error: true, 
      message: err.message 
    });
  }
};

exports.getArticles = async (req, res) => {
  const query = "SELECT * FROM articles";
  try {
    const [results] = await db.query(query);
    res.status(200).json({
      error: false,
      message: "Berhasil menampilkan data articles",
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
      data: [],
    });
  }
};

exports.deleteArticle = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM articles WHERE id = ?";
  try {
    const [results] = await db.query(query, [id]);
    res.status(200).json({
      error: false,
      message: "Berhasil menghapus data article",
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
      data: [],
    });
  }
};

exports.updateArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    const query = "UPDATE articles SET title = ?, content = ?, author = ? WHERE id = ?";
    try {
        const [results] = await db.query(query, [title, content, author, id]);
        res.status(200).json({
        error: false,
        message: "Berhasil mengupdate data article",
        data: results,
        });
    } catch (err) {
        res.status(500).json({
        error: true,
        message: err.message,
        data: [],
        });
    }
}
