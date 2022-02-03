import express from "express";
import { sequelize } from "./database";
import { User } from "./user";
import Joi from "joi";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

const schema = Joi.object({
  login: Joi.string().min(6).required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,32}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password should be alphanumeric characters of length 6 to 32",
    }),
  age: Joi.number().integer().min(4).max(130).required(),
  isDeleted: Joi.boolean(),
});

app.post("/users", (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.send(error.details[0].message);
  } else {
    const user = User.create({
      id: uuid(),
      login: req.body.login,
      password: req.body.password,
      age: req.body.age,
      isDeleted: req.body.isDeleted,
    });
    res.send(user);
  }
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);

  res.send(user); 
});

app.put("/users/:id", (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.send(error.details[0].message);
  } else {
    const user = User.update(
      {
        id: req.body.id,
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        isDeleted: req.body.isDeleted,
      },
      { where: { id: req.params.id } }
    );

    res.send(200);
  }
});

app.put("/users/restore/:id", async (req, res) => {
  const user = await User.restore({
    where: {
      id: req.params.id,
    },
  });
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const user = User.destroy({ where: { id: req.params.id } });

  res.send(user);
});

sequelize.authenticate(); // this will check if the app is connected to the db.

console.log("Authenticated");

User.sync();
app.listen(3000, () => console.log(`Server is running on port 3000`));