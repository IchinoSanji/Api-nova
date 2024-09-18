const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const authMiddleware = require('/middleware/authMiddleware');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

// Rota protegida para criação de posts
app.post('/api/posts', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = new Post({ title, content, user: req.user.id });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
