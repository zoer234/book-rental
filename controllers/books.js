const connection = require("../db/mysql_connection");
const moment = require("moment");
// @ desc    모든 책 목록 불러오기
// @ route   GET /api/v1/books
// @ parameters  offset
exports.get_book = async (req, res, next) => {
  let offset = req.query.offset;

  let query = `select * from book limit ${offset},25`;
  try {
    [rows] = await connection.query(query);
    res.status(200).json({ rows: rows });
    return;
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// @ desc   책 한권을 선택하여 대여하기
// @ route   POST/ api/v1/rental_book
// @ parameters user_id , book_id , age , limit_date

exports.rental_book = async (req, res, next) => {
  let user_id = req.user.id;
  let user_age = req.user.age;
  let book_id = req.body.book_id;

  let currentTime = Date.now();
  let compareTime = currentTime + 1000 * 60 * 30 * 48 * 7;
  compareTime = moment(compareTime).format("YYYY-MM-DD HH:mm:ss");
  let query = `select * from book where id = ${book_id}`;
  try {
    [rows] = await connection.query(query);
    let limit_age = rows[0].limit_age;
    if (user_age < limit_age) {
      res.status(400).json();
      return;
    } else {
      query = `insert into book_rental(user_id,book_id,limit_date) values
      (${user_id},${book_id},"${compareTime}") `;
      try {
        [result] = await connection.query(query);
        res.status(200).json();
        return;
      } catch (e) {
        res.status(400).json();
        return;
      }
    }
  } catch (e) {
    res.status(500).json();
  }
};

//@ desc   내가 대여한 책 목록 25개씩 불러오기
//@ route  GET/api/v1/books/my_rental
//@ params user_id , offset

exports.my_rental = async (req, res, next) => {
  let user_id = req.user.id;
  let offset = req.query.offset;

  let query = `select * from book as b 
    join book_rental as br
     on b.id = br.book_id 
     where br.user_id = ${user_id} limit ${offset},25`;

  try {
    [rows] = await connection.query(query);
    res.status(200).json({ rows: rows });
    return;
  } catch (e) {
    res.status(500).json();
  }
};

//@desc    대여한 책 반납
//@route   DELETE /api/v1/books/:id
//@params  user_id , book_id

exports.return_book = async (req, res, next) => {
  let user_id = req.user.id;
  let book_id = req.params.id;

  let query = `delete from book_rental 
    where user_id = ${user_id} and book_id = ${book_id}`;

  try {
    [result] = await connection.query(query);
    res.status(200).json({ result: result });
    return;
  } catch (e) {
    res.status(500).json();
  }
};
