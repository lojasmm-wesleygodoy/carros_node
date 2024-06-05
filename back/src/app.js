const express = require('express');
const cors = require('cors');
const app = express();
// ==> Rotas da API:
const index = require('./routes/index');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(index);
app.use('/api/v1/modelo', require('./routes/modelo-route'));
app.use('/api/v1/marca', require('./routes/marca-route'));
module.exports = app;