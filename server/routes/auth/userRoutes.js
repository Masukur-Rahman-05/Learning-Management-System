import express from "express";
import { registerUser,loginUser,AuthMiddleware,logoutUser } from "../../controller/auth/userController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", AuthMiddleware, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    message: "Authorized",
    user,
  });
});

export default router;
