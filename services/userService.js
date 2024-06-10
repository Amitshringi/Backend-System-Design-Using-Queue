const User = require('../models/user');
const jwt = require('jwt-simple');
const SECRET_KEY = 'Backend_Developer-Amit';

async function register(username, password) {
  const user = new User({ username, password });
  await user.save();
  return user;
}

async function login(username, password) {
  const user = await User.findOne({ username, password });
  if (!user) throw new Error('Invalid credentials');
  const token = jwt.encode({ username }, SECRET_KEY);
  return token;
}

async function authenticate(token) {
  try {
      const decoded = jwt.decode(token, SECRET_KEY);
      const user = await User.findOne({ username: decoded.username });
      if (!user) throw new Error('User not found');
      return user;
  } catch (error) {
      throw new Error('Invalid token');
  }
}

module.exports = { register, login, authenticate };
