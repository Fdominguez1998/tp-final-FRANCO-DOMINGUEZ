import express, { Request, Response } from "express";
import dotenv from "dotenv";
import pool from "./database/mysql";
import usersRoutes from "./routes/users.routes";
import duenosRoutes from "./routes/duenos.routes";
import mascotasRoutes from "./routes/mascotas.routes";
import historialRoutes from "./routes/historial.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/users", usersRoutes);
app.use("/duenos", duenosRoutes);
app.use("/mascotas", mascotasRoutes);
app.use("/historial", historialRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Servidor funcionando correctamente 🚀",
  });
});

const startServer = async () => {
  try {
    await pool.getConnection();
    console.log("Conectado a MySQL correctamente ✅");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error conectando a la base de datos ❌", error);
  }
};

startServer();
