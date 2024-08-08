import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "feliperiverokiefer",
  host: "localhost",
  database: "likeme",
  password: "9807",
  port: 5432,
  allowExitOnIdle: true,
});

const getTable = async (table) => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const addNewRegister = async (titulo, img, descripcion, likes = 0) => {
  const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [titulo, img, descripcion, likes];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateLikes = async (id) => {
  const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deletePost = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export { getTable, addNewRegister, updateLikes, deletePost };
