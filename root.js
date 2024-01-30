const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bmiRoutes = require('./routes/routes');
const app = express();

const port = 3000;
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', bmiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
