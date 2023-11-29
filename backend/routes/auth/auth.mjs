import express from 'express';
import db from '../../db/conn.mjs';
import * as bcrypt from 'bcrypt'
import { isValidEmail, isValidPassword, isValidText } from '../../validation/validation.mjs'

const router = express.Router();

router.post("/signin", async (req, res) => {
  let collection = db.collection('users');
  let result = await collection.findOne({ username: req.body.username });
  
  if (!result) {
    return res.status(404).send({ message: "User doesn't exist in database"});
  }

  const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    result.scryptPass
  );

  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid Password!" });
  }

  res.status(200).send({
    id: result._id,
    username: result.username,
    password: result.password,
  });
})

router.post("/signup", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  //Validations here.

  try {
    const collection = db.collection('users');
    let userInDB = await collection.findOne({ username: data.username });
    if (userInDB && Object.values(userInDB).length > 0) {
      return res.status(422).json({
        message: "Register failed, user alrady in database.",
        errors,
      });
    }

    const {username, password} = data
    const scryptPass = bcrypt.hashSync(password, 8)

    const result = await collection.insertOne({username, scryptPass});
    res.status(201).json({ message: "User saved.", event: result });
  } catch (error) {
    next(error);
  }
})

//signout api call


export default router;