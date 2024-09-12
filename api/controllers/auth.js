import db from "../db.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profiles/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp
  },
});

const upload = multer({ storage: storage });

export const register = async (req, res) => {
  // Correct this line from "pload" to "upload"
  upload.single("img")(req, res, async function (err) {
    if (err) {
      return res.status(500).json({
        message: "An error occurred while uploading the image",
        error: err,
      });
    }

    // Use req.file.path only if the file is uploaded successfully
    const imgPath = req.file ? req.file.path : null;

    const { username, password } = req.body;
    const sql = `
        INSERT INTO
            login
            (username, password)
        VALUES
            (?,  ?)
    `;

    try {
      // Hash the password and save the data including the image path
      const hash = await bcrypt.hash(password, 10);
      db.query(sql, [username, hash, imgPath], (error, result) => {
        if (error) throw error;
        res.status(200).json({ message: "Register success", result });
      });
    } catch (error) {
      res.status(500).json({ message: "Error during registration", error });
    }
  });
};

// Login function
export const login = async (req, res) => {
  const { username, password } = req.body;
  const sql = `
    SELECT * FROM
        login
    WHERE
        username = ?
    `;

  try {
    db.query(sql, [username], async (error, result) => {
      if (error)
        return res.status(500).json({ message: "Database query error" });
      if (result.length === 0)
        return res.status(401).json({ message: "User not found" });

      const user = result[0];
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        res
          .status(200)
          .json({ message: "Login success", user_ID: user.user_ID });
      } else {
        res.status(401).json({ message: "Login failed" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error during login" });
  }
};

// Get user information
export const get = async (req, res) => {
  const sql = `
        SELECT * FROM 
            login
        WHERE
            user_ID = ?
    `;

  const { user_ID } = req.query;

  try {
    db.query(sql, [user_ID], (error, result) => {
      if (error)
        return res.status(500).json({ message: "Database query error" });
      if (result.length === 0)
        return res.status(401).json({ message: "User not found" });
      res.status(200).json({ message: "Success", result });
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user data" });
  }
};

export const edit = async (req, res) => {
  const { user_ID } = req.query;
  const { username } = req.body;

  const sql = `
    UPDATE 
      login
    SET
      username = ?,
      img = ?
    WHERE
      user_ID = ?
  `;

  upload.single("img")(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({
        message: "An error occurred while uploading the image",
        error: err,
      });
    }

    const imgPath = req.file ? req.file.path : null;

    try {
      db.query(sql, [username, imgPath, user_ID], (error, result) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({ message: "Database error", error });
        }
        res.status(200).json({ message: "Update success", result });
      });
    } catch (error) {
      console.error("Hashing error:", error);
      res.status(500).json({ message: "Error during hashing", error });
    }
  });
};
