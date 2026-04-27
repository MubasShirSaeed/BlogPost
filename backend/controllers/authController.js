import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ massage: "user already exist" });
        }
        const hasedPassword = await bcrypt.hash(password, 10);



        const newUser = await User.create(
            {
                name,
                email,
                password: hasedPassword,
            }
        )

        if (newUser) {
            return res.status(201).json({ massage: "user created successfully" });
        }
    } catch (error) {
        return res.status(500).json({ massage: error.message });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "no such user exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "invalid password" });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,   // REQUIRED on Render (HTTPS)
            sameSite: "none"

        });
        console.log("token", token);
        return res.status(200).json({ message: "login successful" });


    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: error.message });
    }


};

const Users = async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const profile = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(user);
}

const logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout successful" });
}

export { register, Users, login, profile, logout }; 