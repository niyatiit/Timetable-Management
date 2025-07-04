import asyncHandler from "../utils/asyncHandler.js";
import connection from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

async function generateTokens(user) {
	const accessToken = await jwt.sign(
		{ id: user.id, email: user.email },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "15m" }
	);

	const refreshToken = await jwt.sign(
		{ id: user.id, email: user.email },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: "7d" }
	);

	return { accessToken, refreshToken };
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, number } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";

  connection.query(query, [email], async (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      throw new ApiError(500, "Internal server error");
    }

    if (results.length > 0) {
      return res.status(400).json(new ApiError(400, "Email already exists"));
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
    connection.query(insertQuery, [name, email, hashedPassword, number], (insertError, insertResults) => {
      if (insertError) {
        console.error("Database insert error:", insertError);
        throw new ApiError(500, "Internal server error");
      }

      return res.status(201).json(new ApiResponse(201, "User registered successfully", { id: insertResults.insertId, name, email }));
    });
  });
});

export const login = asyncHandler(async (req, res) => {
	const { email, password, admin } = req.body;
	const query = "SELECT * FROM users WHERE email = ? AND admin = ?";

	connection.query(query, [email, admin], async (error, results) => {
		if (error) {
			console.error("Database query error:", error);
			return res.status(500).json( new ApiError(500, "Internal server error") );
		}

		if (results.length === 0) {
			return res.status(401).json(new ApiError(401, "Invalid email or admin status"));
		}

		const user = results[0];

		// compare password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json(new ApiError(401, "Invalid password"));
		}

		// generate tokens
		const { accessToken, refreshToken } = await generateTokens(user);

		return res
			.status(200)
			.cookie("refreshToken", refreshToken, {
				httpOnly: true,
			})
      .cookie("accessToken", accessToken, {
        httpOnly: true,
      })
			.json(new ApiResponse(200, "Login successful", user));
	});
});
