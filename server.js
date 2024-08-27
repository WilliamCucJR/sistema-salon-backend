require('dotenv').config();
const express = require('express');
const supplierRoutes = require('./routes/supplierRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const productRoutes = require('./routes/productRoutes')

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', supplierRoutes);
app.use('/api', employeeRoutes);
app.use('/api', productRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}