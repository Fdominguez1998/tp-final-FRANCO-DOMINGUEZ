export interface Mascota {
  id?: number;
  nombre: string;
  especie: string;
  raza?: string;
  edad?: number;
  dueno_id: number;
  created_by: number;
  created_at?: Date;
}
