import { pool } from '../db';

export const saveFileInfo = async (
  fileName: string,
  fileExtension: string,
  userId: string
) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const fileQuery =
      'INSERT INTO files(name, extension) VALUES($1, $2) RETURNING id';
    const result = await client.query(fileQuery, [fileName, fileExtension]);

    const userQuery =
      'INSERT INTO user_files(user_id, file_id, owner) VALUES ($1, $2, $3)';
    await client.query(userQuery, [userId, result.rows[0].id, true]);

    await client.query('COMMIT');
    return result.rows[0].id as string;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

export const getFiles = async (userId: string, afterId?: string) => {
  const query = `SELECT files.* FROM files INNER JOIN user_files ON files.id = user_files.file_id WHERE user_id = $1 ${
    afterId ? 'AND files.id > $2 ' : ''
  }LIMIT 10`;

  const queryParams = afterId ? [userId, afterId] : [userId];

  return pool.query(query, queryParams).then((result) => result.rows);
};
