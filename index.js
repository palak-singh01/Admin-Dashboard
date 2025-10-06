const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const Item = require('./models/Item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



mongoose.connect('mongodb://localhost:27017/dashBoard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));


app.get('/', async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.render('index', { items });
});

app.post('/items', async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    await Item.create({ name, description, price, quantity });
    res.redirect('/');
  } catch (err) {
    res.status(400).send("Error saving item");
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send("Error deleting item");
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
