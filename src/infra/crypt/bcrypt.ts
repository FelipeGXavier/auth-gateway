import bcrypt from 'bcrypt';

const hash = (plaintext: string): Promise<string> => {
  return bcrypt.hash(plaintext, 10);
};

const compare = (plaintext: string, encoded: string): Promise<boolean> => {
  return bcrypt.compare(plaintext, encoded);
};

export { hash, compare };
