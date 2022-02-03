"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const user_1 = require("./user");
const joi_1 = __importDefault(require("joi"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const schema = joi_1.default.object({
    login: joi_1.default.string().min(6).required(),
    password: joi_1.default.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,32}$"))
        .required()
        .messages({
        "string.pattern.base": "Password should be alphanumeric characters of length 6 to 32",
    }),
    age: joi_1.default.number().integer().min(4).max(130).required(),
    isDeleted: joi_1.default.boolean(),
});
app.post("/users", (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.send(error.details[0].message);
    }
    else {
        const user = user_1.User.create({
            id: (0, uuid_1.v4)(),
            login: req.body.login,
            password: req.body.password,
            age: req.body.age,
            isDeleted: req.body.isDeleted,
        });
        res.send(user);
    }
});
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.User.findAll();
    res.send(users);
}));
app.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findByPk(req.params.id);
    res.send(user);
}));
app.put("/users/:id", (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.send(error.details[0].message);
    }
    else {
        const user = user_1.User.update({
            id: req.body.id,
            login: req.body.login,
            password: req.body.password,
            age: req.body.age,
            isDeleted: req.body.isDeleted,
        }, { where: { id: req.params.id } });
        res.send(200);
    }
});
app.put("/users/restore/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.restore({
        where: {
            id: req.params.id,
        },
    });
    res.json(user);
}));
app.delete("/users/:id", (req, res) => {
    const user = user_1.User.destroy({ where: { id: req.params.id } });
    res.send(user);
});
database_1.sequelize.authenticate(); // this will check if the app is connected to the db.
console.log("Authenticated");
user_1.User.sync();
app.listen(3000, () => console.log(`Server is running on port 3000`));
