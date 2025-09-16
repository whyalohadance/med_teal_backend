const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// importăm rutele de pacienți
const patientRoutes = require("./routes/patients");
app.use("/patients", patientRoutes);

const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);


// test simplu
app.get("/", (req, res) => {
  res.send("Backend works!");
});

app.listen(PORT, () => {
  console.log(`✅ Serverul rulează pe http://localhost:${PORT}`);
});
