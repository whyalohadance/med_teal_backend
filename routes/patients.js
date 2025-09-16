const express = require("express");
const router = express.Router();

// lista statică (o mutăm aici ca exemplu)
const patients = [
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

// GET /patients/list
router.get("/list", (req, res) => {
  res.json(patients);
});

// GET /patients/details/:id
router.get("/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  res.json(patient);
});

module.exports = router;

// GET /patients/search?name=Ion&minAge=20&maxAge=40
router.get("/search", (req, res) => {
  const { name, minAge, maxAge } = req.query;

  let results = patients;

  // filtrare după nume (dacă există în query)
  if (name) {
    results = results.filter(p =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // filtrare după vârsta minimă
  if (minAge) {
    results = results.filter(p => p.age >= parseInt(minAge));
  }

  // filtrare după vârsta maximă
  if (maxAge) {
    results = results.filter(p => p.age <= parseInt(maxAge));
  }

  res.json(results);
});
