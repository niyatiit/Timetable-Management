import asyncHandler from "../utils/asyncHandler.js";
import connection from "../db/db.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getAllTasks = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM trainer_utilization WHERE trainer_id = ?";
  const userId = req.user.id;

  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json(new ApiError(500, "Internal server error"));
    }

    return res.status(200).json(new ApiResponse(200, "Tasks fetched successfully", { tasks: results }));
  });
});
