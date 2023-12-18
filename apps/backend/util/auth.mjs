import pkg from 'jsonwebtoken';
import { compare, hashSync } from 'bcrypt';
import { NotAuthError } from './errors.mjs';

const KEY = "supersecret";
const { sign, verify } = pkg;

const createJSONToken = (email) => {
  return sign({email}, KEY, {expiresIn: "1h", })
}

const validateJSONToken = (token) => {
  return verify(token, KEY)
}

const isValidPassword = (password, storedPassword) => {
  return compare(password, storedPassword);
}

const hashPassword = (password) => {
  return hashSync(password, 8)
}


//Middleware to be configured
const checkAuthMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (!req.headers.authorization) {
    console.log("NOT AUTH. AUTH HEADER MISSING.");
    return next(new NotAuthError("Not authenticated."));
  }
  const authFragments = req.headers.authorization.split(" ");

  if (authFragments.length !== 2) {
    console.log("NOT AUTH. AUTH HEADER INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.log("NOT AUTH. TOKEN INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }
  console.log("fail");
  next();
}

export { createJSONToken, validateJSONToken, isValidPassword, hashPassword }