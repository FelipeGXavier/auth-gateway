import jwt from 'jsonwebtoken';
import { CustomerLoginPayload } from '../data/auth';

const signToken = (data: CustomerLoginPayload): string => {
  return jwt.sign(data, process.env.SECRET);
};

const decodeToken = (token: string): CustomerLoginPayload => {
  try {
    return jwt.verify(token, process.env.SECRET) as CustomerLoginPayload;
  } catch (err) {
    throw new Error('Invalid token');
  }
};

export { signToken, decodeToken };
