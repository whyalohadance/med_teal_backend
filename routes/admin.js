const express = require("express");
const router = express.Router();
const checkRole = require("../middleware/checkRole");

// listă locală (ca exemplu)
let patients = [
  { id: 1, name: "Ion Popescu", age: 30 },
  { id: 2, name: "Maria Ionescu", age: 25 },
  { id: 3, name: "Vasile Gheorghe", age: 40 }
];

// Admin: vezi lista pacienților
router.get("/patients", checkRole("ADMIN"), (req, res) => {
  res.json(patients);
});

// Admin: editează pacient
router.put("/patients/edit/:id", checkRole("ADMIN"), (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;

  const patient = patients.find(p => p.id === id);
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  if (name) patient.name = name;
  if (age) patient.age = age;

  res.json({ message: "Updated", patient });
});

// Admin: șterge pacient
router.delete("/patients/delete/:id", checkRole("ADMIN"), (req, res) => {
  const id = parseInt(req.params.id);
  const index = patients.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Patient not found" });
  }

  const deleted = patients.splice(index, 1);
  res.json({ message: "Deleted", patient: deleted[0] });
});

module.exports = router;
