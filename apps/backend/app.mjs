import "./loadEnvironment.mjs";
import bodyParser from "body-parser"
import express from "express"
import users from "./routes/users/users.mjs"
import auth from "./routes/auth/auth.mjs"

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (_, res) => res.send("Hello from express!"));


app.use("/backend/users", users);
app.use("/backend/api/auth", auth);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(PORT)