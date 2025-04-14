import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateVote } from "../middlewares/voteValidate.mjs";

const answerRouter = Router();

// Middleware: validateVote จะตรวจสอบว่า vote เป็น 1 หรือ -1
answerRouter.post("/:answerId/vote", validateVote, async (req, res) => {
    const { answerId } = req.params
    const { vote } = req.body
    try {
      // ตรวจสอบว่า answer นั้นมีอยู่จริงหรือไม่
      const answerCheckQuery = "select id from answers where id = $1"
      const answerCheckResult = await connectionPool.query(answerCheckQuery, [answerId]);
  
      if (answerCheckResult.rowCount === 0) {
        return res.status(404).json({
          message: "Answer not found.",
        })
      }
  
      // บันทึก vote ลงใน answer_votes table
      const insertQuery = `
        INSERT INTO answer_votes (answer_id, vote)
        VALUES ($1, $2)
      `
      const values = [answerId, vote];
  
      const result = await connectionPool.query(insertQuery, values);
  
      res.status(200).json({
        message: "Vote on the answer has been recorded successfully.",
      });
    } catch(error) {
      res.status(500).json({
        message: "Unable to vote answer.",
        error: error.message
      });
    }
  })
  
export default answerRouter