import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./database/mysql";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/users.routes";
import duenosRoutes from "./routes/duenos.routes";
import mascotasRoutes from "./routes/mascotas.routes";
import historialRoutes from "./routes/historial.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/duenos", duenosRoutes);
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/historial", historialRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Servidor funcionando correctamente 🚀",
  });
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Error interno del servidor" });
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
