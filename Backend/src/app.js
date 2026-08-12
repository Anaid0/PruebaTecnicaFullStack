const express = require('express');
const cors = require('cors');

const categoryRoutes = require('./routers/cartegory.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Backend funcionando correctamente 🚀'
    });
});

app.use('/api/categories', categoryRoutes);

module.exports = app;