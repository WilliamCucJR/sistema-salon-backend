require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supplierRoutes = require('./routes/supplierRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const productRoutes = require('./routes/productRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', supplierRoutes);
app.use('/api', employeeRoutes);
app.use('/api', productRoutes);
app.use('/api', serviceRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}