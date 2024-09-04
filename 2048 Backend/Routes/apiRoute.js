import express from "express";
import Score from "../Models/score.model.js";
const Router = express.Router();

Router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const score = await Score.create(req.body);
    res.status(200).json(score);
  } catch (e) {
    res.status(500).json({ message: e.message });
    console.log(e.message);
  }
});

Router.get("/getTop10", async (req, res) => {
  try {
    const Scores = await Score.find().sort({ score: -1 }).limit(10);
    res.status(200).json(Scores);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

Router.get("/deleteAll", async (req, res) => {
  try {
    const { pwd } = req.query;
    if (pwd == "nirmunir") {
      const Scores = await Score.deleteMany();
      res.status(200).json(Scores);
    } else {
      throw new Error(`wrong password`);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
Router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const Scores = await Score.find({
      name: { $regex: query, $options: "i" }, // 'i' for case-insensitive search
    })
      .sort({ score: -1 })
      .limit(10);
    res.status(200).json(Scores);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
export default Router;
