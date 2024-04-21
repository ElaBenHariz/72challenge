// server.js

const express = require('express');
const db = require('./database');
const User = require('./models/users');
const Article = require('./models/articles');
const cors = require('cors');
const app = express();
const PORT =5000;

app.use(express.json());
app.use(cors());
app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find().populate('creator', 'username');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/articles/:id', async (req, res) => {
    const creatorId = req.params.id;
  
    try {
        const articles = await Article.find({ creator: creatorId });

        if (!articles || articles.length === 0) {
          return res.status(404).json({ message: 'Articles not found for the specified creator' });
        }
  
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.post('/articles', async (req, res) => {
  const { title, description, creator } = req.body;

  try {
    const existingUser = await User.findById(creator);
    if (!existingUser) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    const article = new Article({ title, description, creator });
    await article.save();

    existingUser.articles.push(article);
    await existingUser.save();

    res.status(201).json(existingUser.articles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.post('/users', async (req, res) => {
    const { username, email} = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const newUser = new User({ username, email});
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
app.delete('/articles/:id', async (req, res) => {
    const articleId = req.params.id;

    try {
        const deletedArticle = await Article.findByIdAndDelete(articleId);

        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const creatorId = deletedArticle.creator;
        const creator = await User.findById(creatorId);

        if (!creator) {
            return res.status(404).json({ message: 'Creator not found' });
        }

        creator.articles.pull(articleId);
        await creator.save();

        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.put('/articles/:id', async (req, res) => {
    const articleId = req.params.id;
    const { title, description } = req.body;

    try {
        const updatedArticle = await Article.findByIdAndUpdate(articleId, { title, description }, { new: true });

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
