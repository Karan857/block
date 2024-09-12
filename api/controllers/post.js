import db from "../db.js";
import { faker } from "@faker-js/faker";

import multer from "multer";
import path from "path";

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp
  },
});

const upload = multer({ storage: storage });

// POST: Create a new post
export const post = async (req, res) => {
  upload.single("img")(req, res, function (err) {
    if (err) {
      return res.status(500).json({
        message: "An error occurred while uploading the image",
        error: err,
      });
    }

    const { title, desc, user_ID } = req.body;
    const imgPath = req.file ? req.file.path : null;

    const sql = `
      INSERT INTO post (title, description, img, user_ID)
      VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [title, desc, imgPath, user_ID], (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Failed to post data",
          error,
        });
      }

      return res.status(200).json({
        message: "Post created successfully!",
        result,
      });
    });
  });
};

//get
export const gets = async (req, res) => {
  const sql = `
        SELECT
          post.*,
          login.username,
          login.img as profile
        FROM
          post
        LEFT JOIN
          login
        ON 
          post.user_ID = login.user_ID
    `;

  db.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "failed to fetch data",
        error,
      });
    }

    return res.status(200).json({
      message: "fetch success!!",
      result,
    });
  });
};

//get by user_ID
export const get = async (req, res) => {
  const { user_ID } = req.query;
  const sql = `
            SELECT
                *
            FROM
                post
            WHERE
                user_ID = ?   
      `;

  db.query(sql, [user_ID], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "failed to fetch data",
        error,
      });
    }

    return res.status(200).json({
      message: "fetch success!!",
      result,
    });
  });
};
export const postByID = async (req, res) => {
  const { post_ID } = req.params;
  const sql = `
            SELECT
                *
            FROM
                post
            WHERE
                post_ID = ?   
      `;

  db.query(sql, [post_ID], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "failed to fetch data",
        error,
      });
    }

    return res.status(200).json({
      message: "fetch success!!",
      result,
    });
  });
};

//edit
export const edit = async (req, res) => {
  upload.single("img")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        message: "An error occurred while uploading the image",
        error: err,
      });
    } else if (err) {
      return res.status(500).json({
        message: "An unknown error occurred",
        error: err,
      });
    }

    const { post_ID } = req.params;
    const { title, description } = req.body;
    const time = new Date();

    // Check if a new image was uploaded
    let imgPath = req.file ? req.file.path : null;

    // SQL query to update the post
    let sql;
    let params;

    if (imgPath) {
      // If a new image was uploaded, include it in the query
      sql = `
        UPDATE post
        SET title = ?, description = ?, img = ?, time = ?
        WHERE post_ID = ?
      `;
      params = [title, description, imgPath, time, post_ID];
    } else {
      // If no new image was uploaded, don't update the image field
      sql = `
        UPDATE post
        SET title = ?, description = ?, time = ?
        WHERE post_ID = ?
      `;
      params = [title, description, time, post_ID];
    }

    db.query(sql, params, (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Failed to edit post",
          error,
        });
      }

      return res.status(200).json({
        message: "Post edited successfully!",
        result,
      });
    });
  });
};

//delete
export const remove = async (req, res) => {
  const { post_ID } = req.query;
  const sql = `
              DELETE FROM
                  post
              WHERE
                  post_ID = ?
        `;

  db.query(sql, [post_ID], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "failed to delete data",
        error,
      });
    }

    return res.status(200).json({
      message: "delete success!!",
    });
  });
};
