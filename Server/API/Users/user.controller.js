/** @format */
const pool = require("../../Config/database");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  register,
  profile,
  getUserByEmail,
  userById,
  getAllUsers,
  getAllQuestions,
  questionById,
  getQuestionByUserId,
  AskQuestion,
  answerToQuestion,
  answerByQuestionId,
  allAnswers,
} = require("./user.service");

module.exports = {
  createUser: (req, res) => {
    // console.log(req);
    const { userName, firstName, lastName, email, password } = req.body;
    // console.log(req.body.firstName);
    if (!userName || !firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Not all fields have been provided" });
    }
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "Password must be atleast eight characters" });

    pool.query(
      "SELECT * FROM Registration WHERE user_email=?",
      [email],
      (err, results) => {
        if (err) {
          return res.status(err).json({ message: "database connection error" });
        }
        if (results.length > 0) {
          return res
            .status(400)
            .json({ msg: "Account with this email already exists" });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            // const salt = bcrypt.genSalt(10);
            const saltRound = 10;
            // req.body.password = bcrypt.hashSync(password, salt);
            bcrypt.hash(password, saltRound, function (err, result) {
              if (err) throw err;
              req.body.password = result;
              console.log(req.body.password);
              register(req.body, (err, results) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(500)
                    .json({ message: "database connection error" });
                }
                pool.query(
                  "SELECT * FROM Registration WHERE user_email=?",
                  [email],
                  (err, results) => {
                    if (err) {
                      return res
                        .status(err)
                        .json({ message: "database connection error" });
                    }
                    req.body.userId = results[0].user_id;
                    console.log(req.body);
                    profile(req.body, (err, results) => {
                      if (err) {
                        console.log(err);
                        return res
                          .status(500)
                          .json({ message: "database connection error" });
                      }
                      return res
                        .status(200)
                        .json({ msg: "New user added", data: results });
                    });
                  }
                );
              });
            });
          });
        }
      }
    );
  },
  getUsers: (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({ data: results });
    });
  },
  getUserById: (req, res) => {
    userById(req.id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    // validation
    if (!email || !password)
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });
    getUserByEmail(email, (err, results) => {
      // console.log(email);
      // console.log(results);
      if (err) {
        console.log(err);

        res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res
          .status(404)
          .json({ msg: "No account with this email has been registered" });
      }
      bcrypt.compare(password, results.pass, function (err, result) {
        if (err) throw err;
        // console.log(results.pass);
      });
      const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });
      return res.json({
        msg: "loggin successful",
        token,
        user: {
          id: results.user_id,
          display_name: results.user_name,
        },
      });
    });
  },

  insertQuestion: (req, res) => {
    // console.log(req.user);
    // First, retrieve the user details from authenticateToken
    userById(req.user, (error, user) => {
      // console.log(user);
      if (error) {
        console.log("Failed to get user details from the database.");
        return res.status(500).json({ msg: "Failed to add the question." });
      }

      if (!user) {
        return res.status(404).json({ msg: "User not found." });
      }

      // Once we have the user details, we can proceed with adding the question to the database.
      const questionData = {
        title: req.body.title, //  "title" field in the request body.
        question: req.body.question, // "question" field in the request body.
        userId: user.user_id, //  retrieved user_id from the user details.
        userName: user.user_name,
      };
      let date = new Date().toISOString();
      let isoDate = new Date(date);
      const currentDate =
        isoDate.toLocaleDateString("en-US") +
        " " +
        isoDate.toLocaleTimeString();

      // Insert the question into the database.
      AskQuestion(questionData, currentDate, (error, result) => {
        if (error) {
          console.log("Question not submitted to the database.");
          return res.status(500).json({ msg: "Failed to add the question." });
        } else {
          console.log(result);
          return res
            .status(200)
            .json({ msg: "Question added successfully.", data: result });
        }
      });
    });
  },
  getQuestionByID: (req, res) => {
    questionById(req.id, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!result) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: result });
    });
  },

  listQuestions: (req, res) => {
    getAllQuestions((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({ results });
    });
  },
  getAllAnswer: (req, res) => {
    allAnswers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({ results });
    });
  },

  insertAnswer: (req, res) => {
    const questionId = req.body.questionId;
    const answer = req.body.answer;
    // console.log(req);
    userById(req.user, (error, user) => {
      // console.log(req.user);
      console.log(user);
      if (error) {
        console.log("Failed to get user details from the database.");
        return res.status(500).json({ msg: "Failed to add the question." });
      }

      if (!user) {
        return res.status(404).json({ msg: "User not found." });
      }

      questionById(questionId, user.user_id, (error, question) => {
        // console.log(questionId);
        if (error) {
          console.log("Failed to get user details from the database.");
          return res.status(500).json({ msg: "Failed to get the question." });
        }
        if (!question || question.length === 0) {
          return res.status(404).json({ msg: "Question not found." });
        }
        console.log(user.user_id);
        const answerData = {
          answer: answer,
          userId: user.user_id,
          userName: user.user_name,
        };
        console.log(answerData);
        let date = new Date().toISOString();
        let isoDate = new Date(date);
        const currentDate =
          isoDate.toLocaleDateString("en-US") +
          " " +
          isoDate.toLocaleTimeString();
        answerToQuestion(
          answerData,
          questionId,
          currentDate,
          (error, result) => {
            if (error) {
              console.log(error);
              console.log("Answer not submitted to the database.");
              return res
                .status(500)
                .json({ msg: "Failed to add your answer." });
            } else {
              console.log(result);
              return res
                .status(200)
                .json({ msg: "Answer added successfully.", data: result });
            }
          }
        );
      });
    });
  },

  getAnswerByQuestionId: (req, res) => {
    answerByQuestionId(req.questionId, (error, answers) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({ answers });
    });
  },
};
