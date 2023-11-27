import express from 'express'
import db from '../../db/conn.mjs'
import {isValidEmail, isValidPassword, isValidText} from '../../validation/validation.mjs'

const router = express.Router()

router.get("/api/test/all", async (req, res) => {
  let collection = db.collection('users');
  let results = await collection.find({})
    .limit(50)
    .toArray();
  res.send(results).status(200);
});

router.post("/api/auth/signin", async (req, res) => {
  let collection = db.collection('users');
  let result = collection.find({id: req.params.id});
  res.send(result).status(200);
})

router.post("/api/auth/signup", async (req, res) => {
  const data = req.body;

  let errors = {};

  //Validations here.

  try {
    const collection = db.collection('users');
    let isUserAlreadyRegistered = collection.find({ username: data.username });
    console.log(isUserAlreadyRegistered)


    //const result = await collection.insertOne(data);
    //res.status(201).json({ message: "User saved.", event: result });
  } catch (error) {
    next(error);
  }
})

//signout api call


export default router;