import "./loadEnvironment.mjs";
import bodyParser from "body-parser"
import express from "express"
import users from "./routes/users/users.mjs"
import auth from "./routes/auth/auth.mjs"
import cors from 'cors'

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get("/", (_, res) => res.send("Hello from express!"));


app.use("/users", users);
app.use("/api/auth", auth);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(PORT)