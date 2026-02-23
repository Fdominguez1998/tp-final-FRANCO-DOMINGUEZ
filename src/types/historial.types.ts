export interface HistorialClinico {
  id?: number;
  mascota_id: number;
  veterinario_id: number;
  descripcion: string;
  tratamiento?: string;
  fecha_consulta: string;
  created_at?: Date;
}
