const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
  static async register(username, email, password) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error('User with that email already exists.');
      error.statusCode = 400;
      throw error;
    }
    const user = await User.create({ username, email, password });
    return user;
  }

  static async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error('Invalid credentials.');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      const error = new Error('Invalid credentials.');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}

module.exports = AuthService;