import express from 'express';
import cors from 'cors';
import { getTable, addNewRegister, updateLikes, deletePost } from './queries.js';

const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());
app.use(express.json());

// Ruta GET para obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const rows = await getTable("posts");
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta POST para crear un nuevo post
app.post('/posts', async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  try {
    const newPost = await addNewRegister(titulo, img, descripcion, likes);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta PUT para actualizar los likes de un post
app.put('/posts/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await updateLikes(id);
    if (!updatedPost) {
      res.status(404).send('Post no encontrado');
    } else {
      res.json(updatedPost);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta DELETE para eliminar un post
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await deletePost(id);
    if (!deletedPost) {
      res.status(404).send('Post no encontrado');
    } else {
      res.json(deletedPost);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
