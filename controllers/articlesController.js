const {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} = require("firebase/firestore");
const db = require("../services/db.js");

const createArticle = async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({
      error: true,
      message: "Title, content, and author are required",
    });
  }

  try {
    const docRef = await addDoc(collection(db, "articles"), {
      title,
      content,
      author,
    });
    res.status(201).json({
      error: false,
      message: "Article created successfully",
      data: {
        articleId: docRef.id,
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
    const querySnapshot = await getDocs(collection(db, "articles"));
    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json({
      error: false,
      message: "Berhasil menampilkan data articles",
      data: articles,
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
    const articleRef = doc(db, "articles", id);
    await deleteDoc(articleRef);
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
    const articleRef = doc(db, "articles", id);
    await updateDoc(articleRef, {
      title,
      content,
      author,
    });
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
  deleteArticle,
  updateArticle,
};