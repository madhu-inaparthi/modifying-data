const mongoose = require('mongoose')
const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;


app.use(express.json());

mongoose.connect('mongodb+srv://madhukiraninaparthi2001:madhu@cluster0.1avfr.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB:', err));
const Menu = require('./schema');

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.get('/menu', async (req, res) => {
  try {
    const items = await Menu.find();
    res.status(200).json(items);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ error: 'Internal server error while fetching menu items.' });
  }
});

app.post('/menu', async (req, res) => {
  try {
    const menuItem = new Menu(req.body);
    const savedMenuItem = await menuItem.save();
    res.status(200).json({
      message: 'Menu item created successfully',
      item: savedMenuItem
    });
  } catch (err) {
    console.error('Error creating menu item:', err);
    res.status(500).json({ error: 'Internal server error while creating menu item.' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
