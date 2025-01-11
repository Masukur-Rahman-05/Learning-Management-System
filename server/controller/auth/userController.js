import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../model/auth/userSchema.js";

export const registerUser = async (req, res) => {
  const { username, email, password, terms } = req.body;

  if (!username || !email || !password || !terms) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      terms,
      role: "student",
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Registration Failed in Server Side",
    });
  }
};

//............................................................Login.................................................



export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await User.findOne({ email });

  try {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists",
      });
    }

    const checkedPassword = await bcrypt.compare(password, user.password);

    if (!checkedPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        username: user.username,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      })
      .json({
        success: true,
        message: "Login Successful",
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          username: user.username,
        },
        token: token,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login Failed.",
    });
  }
};

//..............................AuthMiddleware...............................

export const AuthMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authorization failed!",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Authorization failed! ${error.message}`,
    });
  }
};

   export const logoutUser = async (req, res) => {
     try {
       res.clearCookie("token");
       return res.status(200).json({
         success: true,
         message: "Logout Successful",
       });
     } catch (error) {
       return res.status(500).json({
         success: false,
         message: "Logout Failed.",
       });
     }
   };