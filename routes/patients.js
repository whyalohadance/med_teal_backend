const express = require("express");
const router = express.Router();

let patients = [
  { id: 1, name: "Ion Popescu", age: 30 },
  { id: 2, name: "Maria Ionescu", age: 25 },
  { id: 3, name: "Vasile Gheorghe", age: 40 },
  { id: 4, name: "Elena Dobre", age: 28 },
  { id: 5, name: "Andrei Rusu", age: 35 },
  { id: 6, name: "Ana Stancu", age: 22 },
  { id: 7, name: "Mihai Enache", age: 50 },
  { id: 8, name: "Ioana Marinescu", age: 31 },
  { id: 9, name: "Cristian Pavel", age: 27 },
  { id: 10, name: "Gabriela Nistor", age: 29 }
];

// Nivel 5 – GET /patients/list
router.get("/list", (req, res) => {
  res.json(patients);
});

// Nivel 6 – GET /patients/details/:id
router.get("/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  res.json(patient);
});

// Nivel 8 – GET /patients/search?name=&minAge=&maxAge=
router.get("/search", (req, res) => {
  const { name, minAge, maxAge } = req.query;

  let results = patients;

  if (name) {
    results = results.filter(p =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (minAge) {
    results = results.filter(p => p.age >= parseInt(minAge));
  }
  if (maxAge) {
    results = results.filter(p => p.age <= parseInt(maxAge));
  }

  res.json(results);
});

module.exports = router;
