import db from "../db.js";

export const like = async (req, res) => {
  const sql = `
        INSERT INTO
            likePost
                (post_ID,user_ID)
        VALUES
            (?,?)
    `;

  const { post_ID, user_ID } = req.body;

  db.query(sql, [post_ID, user_ID], (error, result) => {
    if (error) {
      return res.status(500).json({ message: "failed query database", error });
    }
    return res.status(200).json({ message: "like success", result });
  });
};

export const getLike = async (req, res) => {
  const sql = `
        SELECT 
            *
        FROM
            likePost
    `;

  db.query(sql, (error, result) => {
    if (error) return res.json({ message: "error fetch like", error });
    return res.json({ message: "fetch like success!!", result });
  });
};
