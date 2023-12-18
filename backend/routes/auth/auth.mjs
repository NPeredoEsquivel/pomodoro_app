import express from 'express';
import db from '../../db/conn.mjs';
import { createJSONToken, isValidPassword, hashPassword } from '../../util/auth.mjs';
import { isValidEmail, isValidText } from '../../validation/validation.mjs'

const router = express.Router();

router.post("/signin", async (req, res) => {
  let collection = db.collection('users');
  const data = req.body;

  let errors = {};
  if (!isValidText(data.password)) {
    errors.password = 'Invalid password. Must be at least 6 characters long.';
  }
  
  if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email format.';
  } 

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'User signin failed due to validation errors.',
      errors,
    });
  }

  let result = await collection.findOne({ email: data.email });
  if (!result) {
    return res.status(404).send({ message: "User doesn't exist in database"});
  }

  const passwordIsValid = isValidPassword(
    data.password,
    result.scryptPass
  );

  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid Password!" });
  }


  const token = createJSONToken(data.email);
  res.json({ token });
})

router.post("/signup", async (req, res, next) => {
  const data = req.body;

  let errors = {};
  if (!isValidText(data.password, 6)) {
    errors.password = 'Invalid password. Must be at least 6 characters long.';
  }

  if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email format.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'User signin failed due to validation errors.',
      errors,
    });
  }

  try {
    const collection = db.collection('users');
    let userInDB = await collection.findOne({ email: data.email });
    if (userInDB && Object.values(userInDB).length > 0) {
      return res.status(422).json({
        message: "Register failed, user alrady in database.",
        errors,
      });
    }

    const {email, password} = data;
    const scryptPass = hashPassword(password);

    const result = await collection.insertOne({email, scryptPass});

    const authToken = createJSONToken(email);
    res.status(201).json({ message: "User saved.", event: result, token: authToken });
  } catch (error) {
    next(error);
  }
})

//signout api call


export default router;