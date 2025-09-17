const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// ---------------------------
// Importăm rutele
// ---------------------------
const patientRoutes = require('./routes/patients');
const adminRoutes = require('./routes/admin');

app.use('/patients', patientRoutes); 
app.use('/admin', adminRoutes);      

// ---------------------------
// Pornire server
// ---------------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
