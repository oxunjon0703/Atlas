const Io = require("../utils/Io");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { userValidation } = require("../validation/user.validation");
const Users = new Io("./database/users.json");
const jwt = require("../utils/jwt");
const { status } = require("express/lib/response");

const register = async (req, res) => {
    const {username, password} = req.body;

    const error = userValidation({username, password});
    if(error) return res.status(400).json({message: error});

    const users = await Users.read();

    const findUser = users.find((user) => user.username === username);

    if(findUser) return res.status(403).json({message: "User not found"});

    const heshPassword = await bcrypt.hash(password, 5);

    const newUser = new User(username, heshPassword);

    const data = users.length ? [...users, newUser] : [newUser];

    await Users.write(data);

    const token = jwt.sign({user_id: newUser.id});

    res.cookie("token", token, { maxAge: 60000});

    res.redirect("/atlas");
};

const login = async (req, res) => {
    const {username, password} = req.body;

    const error = userValidation({username, password});
    if(error) return res.status(400).json({message: error});


    const users = await Users.read();

    const findUser = users.find((user) => user.username === username);

    if (!findUser) {
        return res.status(403).json({message: "Username or Password is incorrect."});
    }

    const checkPass = await bcrypt.compare(password, findUser.password);

    if(!checkPass){
        return res.status(403).json({message: "Username or Password is incorrect."});
    };

    const token = jwt.sign({userId: findUser.id});

    res.cookie("token", token);

    res.status(200).json({message:"Success"});
};

const userGet = async (req, res) => {
    res.render("user");
};

module.exports = {
    register,
    login,
    userGet,
};