import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const generateToken = email => {
  const token = uuidv4();
  const expiry = Date.now() + 60 * 60 * 1000; // expired 1 jam
  return JSON.stringify({ token, email, expiry });
};

export const validateToken = tokenString => {
  try {
    const data = JSON.parse(tokenString);
    return data.expiry > Date.now();
  } catch (err) {
    return false;
  }
};

export const validateEmail = email => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const validatePassword = password => {
  return password.length >= 6;
};
