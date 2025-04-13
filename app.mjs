import express from "express";
import connectionPool from "./utils/db.mjs";

const app = express();
app.use(express.json()); //express อ่านค่าจาก body ได้
const PORT = 4000;

app.get("/test", (req, res) => {
  return res.json("✅ Server API is working");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});