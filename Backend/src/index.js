import connection from "./db/db.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

if (connection) {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
  });
}
