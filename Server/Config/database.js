/** @format */

/** @format */
const mysql = require("mysql2");
require("dotenv").config();
// const pool = mysql.createPool({
//   host: process.env.host,
//   database: process.env.database,
//   user: process.env.user,
//   password: process.env.password,
//   connectionLimit: 10,
//   socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", //* netstat -ln | grep mysql
// });
const pool = mysql.createConnection(process.env.DATABASE_URL);
// pool.connect(function (error, connection) {
//   if (!error) {
//     console.log("error");
//   } else {
//     console.log("connection successful");
//   }
// });

console.log("connected to planetscale");

// pool.getConnection(function (error, connection) {
//   if (error) {
//     console.log("error found");
//   } else {
//     console.log("server connected");
//   }

//   //   conn.query(/* ... */);
//   // Don't forget to release the connection when finished!
// pool.releaseConnection(connection);
// });
// pool.end();
// pool.connect(function (error, connection) {
//   if (error) {
//     console.log(`error found`);
//   } else {
//     console.log("server connected");
//   }
// });
let createRegistration = `CREATE TABLE if not exists Registration(user_id int auto_increment,
    user_name varchar(255) not null,
        user_email varchar(255) not null,
        pass varchar(255) not null,
        PRIMARY KEY (user_id))`;
let createProfile = `CREATE TABLE if not exists Profile(user_profile_id int auto_increment,
        user_id int not null,
        first_name TEXT not null, 
        last_name TEXT not null,
        PRIMARY KEY (user_profile_id))`;
let createQuestion = `CREATE TABLE if not exists question(question_id int auto_increment,
    question TEXT not null,
    question_description TEXT not null,
        user_id int not null,
        user_name varchar(255) not null,
        posted_date DATETIME not null,
        PRIMARY KEY (question_id))`;
let createAnswer = `CREATE TABLE if not exists answer(
        answer_id int auto_increment,
        answer TEXT not null,
        user_id int not null,
        user_name varchar(255) not null,
        question_id int(11) not null,
        posted_date DATETIME not null,
        PRIMARY KEY (answer_id)
)`;
pool.query(createRegistration, (err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Registration table created");
  }
});
pool.query(createProfile, (err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Profile table created");
  }
});
pool.query(createQuestion, (err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Question table created");
  }
});
pool.query(createAnswer, (err, results) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Answer table created");
  }
});

module.exports = pool;
