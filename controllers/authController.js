const userService = require('../services/userService');

async function register(req, res) {
  try {
    const { username, password } = req.body;
    await userService.register(username, password);
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const token = await userService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function authenticate(req, res, next) {
  try {
      if (!req.headers.authorization) {
          throw new Error('Authorization header is missing');
      }
      const token = req.headers.authorization.split(' ')[1];
      console.log('Token:', token);
      if (!token) {
          throw new Error('Token is missing');
      }
      req.user = await userService.authenticate(token);
      console.log('Authenticated User:', req.user);
      if (!req.user) {
          throw new Error('User not found');
      }
      next();
  } catch (error) {
      console.error('Authentication Error:', error.message);
      res.status(401).send('Unauthorized: ' + error.message);
  }
}

module.exports = { register, login, authenticate };
