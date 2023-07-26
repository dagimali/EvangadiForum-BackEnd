/** @format */

const router = require("express").Router();
const { auth, authenticateToken } = require("../Middleware/auth");
const {
  createUser,
  getUsers,
  getUserById,
  login,
  insertQuestion,
  listQuestions,
  insertAnswer,
  getAllAnswer,
  getAnswerByQuestionId,
} = require("./user.controller");
router.post("/", createUser);
router.get("/all", getUsers);
router.get("/", auth, getUserById);
router.post("/login", login);

router.get("/questions", listQuestions);
router.post("/ask", authenticateToken, insertQuestion);
router.post("/response", authenticateToken, insertAnswer);
router.get("/allResponses", getAllAnswer);
router.get("/response", getAnswerByQuestionId);

module.exports = router;
