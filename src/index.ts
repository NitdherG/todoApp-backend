import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import userRoutes from "./interfaces/routes/userRoutes";
import taskRoutes from "./interfaces/routes/taskRoutes";

const app = express();
// Configurar CORS
app.use(
  cors({
    origin: [
      "*",
      "http://localhost:4200", // Origen de desarrollo
      "https://todoapp-fbc7d.web.app", // Origen de producción
      "https://todoapp-fbc7d.firebaseapp.com",
    ], // La URL de tu frontend Angular
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type"], // Encabezados permitidos
  }),
);
app.use(express.json());
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

// Configurar puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export const api = onRequest(app);
