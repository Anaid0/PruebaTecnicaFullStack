const express = require('express');
const cors = require('cors');

const categoryRoutes = require('./routers/category.routes');

const userRoutes = require('./routers/users.routes');

const productRoutes = require('./routers/products.routes');

const inventoryRoutes = require('./routers/inventory_movements.routes');

const authRoutes = require('./routers/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        message: 'Backend funcionando correctamente 🚀'
    });
});


app.use('/api/categories', categoryRoutes);
app.use('/api/users', require('./routers/users.routes'));
app.use('/api/products', productRoutes);
app.use('/api/inventory_movements', inventoryRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;