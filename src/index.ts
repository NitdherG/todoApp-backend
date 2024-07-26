import { onRequest } from "firebase-functions/v2/https";
import express from "express";

const app = express();
app.use(express.json());
// Configurar puerto
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
export const api = onRequest(app);
