const express = require('express');
require('dotenv').config();
const app = express();

app.get('/', (req, res) => res.send('Welcome to the club'));

app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}!`));