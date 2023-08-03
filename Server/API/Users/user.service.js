/** @format */

const pool = require("../../Config/database");
module.exports = {
  register: (data, callback) => {
    pool.query(
      `INSERT INTO Registration (user_name, user_email, pass) VALUES(? ,?,?)`,
      [data.userName, data.email, data.password],
      (error, result) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  profile: (data, callback) => {
    pool.query(
      `INSERT INTO Profile (user_id, first_name, last_name) VALUES(? ,?,?)`,
      [data.userId, data.firstName, data.lastName],
      (error, result) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  userById: (id, callback) => {
    pool.query(
      `SELECT Registration.user_id,user_name,user_email,first_name,last_name FROM Registration LEFT JOIN Profile ON Registration.user_id=Profile.user_id WHERE Registration.user_id= ?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
  getUserByEmail: (email, callback) => {
    pool.query(
      `SELECT * FROM Registration WHERE user_email=?`,
      [email],
      (error, result) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result[0]);
      }
    );
  },
  getAllUsers: (callback) => {
    pool.query(
      `SELECT user_id, user_name, user_email FROM Registration`,
      [],
      (error, result) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  AskQuestion: (questionData, currentDate, callback) => {
    // console.log(questionData);
    pool.query(
      `INSERT INTO question(question, question_description, user_id, user_name, posted_date) VALUES (?,?,?,?,?)`,
      [
        questionData.title,
        questionData.question,
        questionData.userId,
        questionData.userName,
        currentDate,
      ],
      (error, result) => {
        if (error) {
          // console.log(error);
          return callback(error);
        }
        return callback(null, result);
      }
    );
    // Assuming you have a database function to insert the question.
  },

  getAllQuestions: (callback) => {
    pool.query(`SELECT * FROM question`, [], (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    });
  },
  questionById: (id, userData, callback) => {
    pool.query(
      `SELECT * FROM question WHERE question_id=?`,
      [id, userData],
      (error, result) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getQuestionByUserId: (data, callback) => {
    pool.query(
      `SELECT * FROM question WHRER user_id=?`,
      [data.userId],
      (error, result) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  answerToQuestion: (answerData, questionId, currentDate, callback) => {
    pool.query(
      `INSERT INTO answer(answer,user_id, user_name, question_id, posted_date)VALUES(?,?,?,?,?)`,
      [
        answerData.answer,
        answerData.userId,
        answerData.userName,
        questionId,
        currentDate,
      ],
      (error, result) => {
        if (error) {
          // console.log(error);
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  allAnswers: (callback) => {
    pool.query(`SELECT * FROM answer`, [], (error, result) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    });
  },
  answerByQuestionId: (questionId, callback) => {
    pool.query(
      `SELECT * FROM answer LEFT JOIN question ON answer.question_id=question.question_id WHERE question.question_id= ?`,
      [questionId],
      (error, result) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
};
