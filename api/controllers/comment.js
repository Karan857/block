import db from "../db.js";

export const addComment = async (req, res) => {
  const sql = `
        INSERT INTO
            comment
                (post_ID,user_ID,comment)
            VALUES
                (?,?,?)
    `;

  const { post_ID, user_ID, comment } = req.body;

  db.query(sql, [post_ID, user_ID, comment], (error, result) => {
    if (error) return res.json({ message: "failed add comment ", error });
    return res.json({ message: "add comment success", result });
  });
};

export const getComment = async (req, res) => {
  const sql = `
        SELECT 
            login.*,
            comment.*
        FROM
            comment
        JOIN
            login on comment.user_ID = login.user_ID
    `;
  db.query(sql, (error, result) => {
    if (error) return res.json({ message: "failed fetch comment ", error });
    return res.json({ message: "fetch comment success", result });
  });
};
