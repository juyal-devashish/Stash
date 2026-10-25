import { Router } from "express";
import { pool } from "../db/pool.js";

export const router = Router();

router.get("/", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM bookmarks ORDER BY created_at DESC"
  );
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { url, title, notes, tags } = req.body;
  if (!url || !title) {
    return res.status(400).json({ error: "url and title are required" });
  }
  const { rows } = await pool.query(
    `INSERT INTO bookmarks (url, title, notes, tags)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [url, title, notes ?? null, tags ?? []]
  );
  res.status(201).json(rows[0]);
});

router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM bookmarks WHERE id = $1", [req.params.id]);
  res.status(204).end();
});
