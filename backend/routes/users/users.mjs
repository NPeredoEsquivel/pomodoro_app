import express from 'express'
import db from '../../db/conn.mjs'
import {isValidEmail, isValidPassword, isValidText} from '../../validation/validation.mjs'

const router = express.Router()

router.get("/users/all", async (req, res) => {
  let collection = db.collection('users');
  let results = await collection.find({})
    .limit(50)
    .toArray();
  res.send(results).status(200);
});


export default router;