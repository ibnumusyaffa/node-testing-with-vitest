import { User } from './types.js';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
});

export const createUser = async (user: User): Promise<Boolean> => {
  const query = 'INSERT INTO users (id, name, email) VALUES (?, ?, ?)';
  const values = [user.id, user.name, user.email];

  try {
    const [result] = await pool.execute(query, values);
    if ((result as mysql.ResultSetHeader).affectedRows !== 1) {
      throw new Error('Failed to create user');
    }
    return true
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Duplicate entry')) {
        throw new Error('User with this email already exists');
      }
    }
    throw new Error('Database error');
  }
};