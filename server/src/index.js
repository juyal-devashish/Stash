import express from "express";
import cors from "cors";
import "dotenv/config";
import { router as bookmarksRouter } from "./routes/bookmarks.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/bookmarks", bookmarksRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Stash API listening on port ${port}`);
});
