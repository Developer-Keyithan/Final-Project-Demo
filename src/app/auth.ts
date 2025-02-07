import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.SECRET_KEY;
console.log(JWT_SECRET)

const generateToken = (user: any): any => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET!, { expiresIn: '1h' });
};

export default generateToken;