const express = require("express");
const router = express.Router();
const checkRole = require("../middleware/checkRole");

// mock data
let patients = [
  { id: 1, name: "Ion Popescu", age: 30 },
  { id: 2, name: "Maria Ionescu", age: 25 },
  { id: 3, name: "Vasile Gheorghe", age: 40 }
];

// Nivel 9 – Admin: GET /admin/patients
router.get("/patients", checkRole("admin"), (req, res) => {
  res.json(patients);
});

// Nivel 9 – Admin: PUT /admin/patients/edit/:id
router.put("/patients/edit/:id", checkRole("admin"), (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  if (name) patient.name = name;
  if (age) patient.age = age;

  res.json({ message: "Patient updated", patient });
});

// Nivel 10 – Admin: GET /admin/reports
router.get("/reports", checkRole("admin"), (req, res) => {
  res.json({ message: "Raport complet: venituri, pacienți, programări." });
});

module.exports = router;
