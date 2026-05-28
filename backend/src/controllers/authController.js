const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
  

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
     message: "User registered successfully",

     token: generateToken(user._id),

    user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      message: "Login successful",

      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account with that email exists.",
      });
    }

    if (user.provider !== "local") {
      return res.status(400).json({
        message: `This account was registered using ${user.provider}. Please sign in using OAuth.`,
      });
    }

    // Generate secure random token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and set to database
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Token expires in 15 minutes
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Create reset URL
    const clientUrl = process.env.CLIENT_URL || process.env.FRONTEND_URL || "http://localhost:5173";
    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    // Premium HTML Email Template
    const html = `
      <div style="font-family: 'Inter', sans-serif; background-color: #FAF7FF; padding: 40px; border-radius: 24px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(124, 58, 237, 0.08);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #0F172A; font-size: 24px; font-weight: 800; margin: 0;">MOCKMATE X AI</h1>
          <p style="color: #64748B; font-size: 12px; margin: 4px 0 0 0;">Career Placement & Interview Catalyst</p>
        </div>
        <div style="background-color: #FFFFFF; border-radius: 16px; padding: 32px; box-shadow: 0 10px 40px rgba(124, 58, 237, 0.04); border: 1px solid rgba(124, 58, 237, 0.05);">
          <h2 style="color: #1E293B; font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">Security Verification: Password Reset</h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
            Hello ${user.name},<br/><br/>
            You requested to reset the security password for your MockMate X AI account. Click the button below to establish a new password credential. This link is only valid for <strong>15 minutes</strong>.
          </p>
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="${resetUrl}" style="background-image: linear-gradient(135deg, #7C3AED, #C026D3); color: #FFFFFF; text-decoration: none; padding: 12px 28px; font-size: 14px; font-weight: 600; border-radius: 12px; display: inline-block; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.25);">
              Reset Account Password
            </a>
          </div>
          <p style="color: #64748B; font-size: 11px; line-height: 1.6; margin: 0;">
            If you did not request this reset, you can safely ignore this email. Your active credentials remain completely secure.
          </p>
          <div style="border-top: 1px solid #F1F5F9; margin-top: 24px; padding-top: 16px; color: #94A3B8; font-size: 11px;">
            If the button doesn't work, copy and paste this URL into your browser: <br/>
            <a href="${resetUrl}" style="color: #7C3AED; word-break: break-all;">${resetUrl}</a>
          </div>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Security: MockMate X AI Password Reset Request",
        html,
      });

      res.status(200).json({
        message: "Password reset email sent successfully.",
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return res.status(500).json({
        message: "Email could not be sent. Please try again later.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired password reset token.",
      });
    }

    // Set new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {  
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
};
