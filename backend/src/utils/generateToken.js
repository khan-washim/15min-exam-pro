import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  // Ensure JWT_SECRET is in your .env file
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;