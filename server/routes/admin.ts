import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin";

export const adminRouter = Router();

adminRouter.get("/me", requireAdmin, (_req, res) => {
  res.json({ ok: true });
});
