const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// ---------------------------
// Date mock (pacienți)
// ---------------------------
let patients = [
  { id: 1, name: "Ion Popescu", age: 30 },
  { id: 2, name: "Maria Ionescu", age: 25 },
  { id: 3, name: "Vasile Georgescu", age: 40 },
  { id: 4, name: "Ana Pop", age: 35 },
  { id: 5, name: "Mihai Enache", age: 50 },
  { id: 6, name: "Elena Marin", age: 28 },
  { id: 7, name: "Cristina Dobre", age: 22 },
  { id: 8, name: "Paul Radu", age: 33 },
  { id: 9, name: "Simona Iliescu", age: 27 },
  { id: 10, name: "Andrei Matei", age: 45 }
];

// ---------------------------
// Nivel 5 – GET /list (lista pacienților)
// ---------------------------
app.get('/list', (req, res) => {
  res.json(patients);
});

// ---------------------------
// Nivel 6 – GET /details/:id
// ---------------------------
app.get('/details/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    return res.status(404).json({ message: "Pacientul nu a fost găsit" });
  }
  res.json(patient);
});

// ---------------------------
// Nivel 7 – Modularizare (simulată aici cu 2 categorii)
// ---------------------------
app.get('/patients/list', (req, res) => {
  res.json(patients);
});

app.get('/patients/details/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    return res.status(404).json({ message: "Pacientul nu a fost găsit" });
  }
  res.json(patient);
});

// ---------------------------
// Nivel 8 – Search cu query params
// ---------------------------
app.get('/search', (req, res) => {
  const { name, minAge, maxAge } = req.query;
  let results = patients;

  if (name) {
    results = results.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (minAge) {
    results = results.filter(p => p.age >= parseInt(minAge));
  }
  if (maxAge) {
    results = results.filter(p => p.age <= parseInt(maxAge));
  }

  res.json(results);
});

// ---------------------------
// Nivel 9 – Separare Admin/Public
// ---------------------------
app.get('/public/list', (req, res) => {
  res.json(patients);
});

app.put('/admin/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return res.status(404).json({ message: "Pacientul nu există" });
  }

  patient.name = name || patient.name;
  patient.age = age || patient.age;

  res.json({ message: "Pacient actualizat", patient });
});

// ---------------------------
// Nivel 10 – Middleware roluri
// ---------------------------
function checkRole(role) {
  return (req, res, next) => {
    const userRole = req.query.role; // ex: ?role=admin
    if (userRole === role) {
      next();
    } else {
      res.status(403).json({ message: "Acces interzis. Rol invalid!" });
    }
  };
}

// Ruta protejată doar pentru Admin
app.get('/admin/reports', checkRole('admin'), (req, res) => {
  res.json({ message: "Raport complet: venituri, pacienți, programări." });
});

// Ruta protejată doar pentru User
app.get('/user/history', checkRole('user'), (req, res) => {
  res.json({ message: "Istoricul vizitelor pacientului." });
});

// ---------------------------
// Pornire server
// ---------------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
