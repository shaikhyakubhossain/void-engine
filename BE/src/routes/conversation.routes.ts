import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import {
  create,
  getAll,
  getOne,
  remove,
  updateTitle,
} from "../controllers/conversation.controller.js";

const router = Router();

router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getOne);
router.post("/", authenticate, create);
router.patch("/:id", authenticate, updateTitle);
router.delete("/:id", authenticate, remove);

export default router;
