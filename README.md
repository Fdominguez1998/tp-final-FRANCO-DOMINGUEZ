# 🐾 Patitas Felices - Sistema de Gestión Veterinaria

Trabajo final del curso de Backend - Sistema completo de gestión para clínicas veterinarias desarrollado con Node.js, Express, TypeScript y MySQL.

## 📋 Descripción

Sistema web para gestionar las operaciones diarias de una clínica veterinaria, permitiendo el registro y control de dueños, mascotas e historiales clínicos. Incluye autenticación con JWT, roles de usuario (admin/veterinario) y validación de datos.

## 🚀 Stack Tecnológico

### Backend

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **TypeScript** - Lenguaje tipado
- **MySQL** - Base de datos relacional
- **JWT** (jsonwebtoken) - Autenticación
- **bcrypt** - Hashing de contraseñas
- **express-validator** - Validación de datos
- **CORS** - Configuración de seguridad

### Frontend

- **HTML5** - Estructura
- **CSS3** - Estilos personalizados
- **Bootstrap 5** - Framework CSS
- **JavaScript (Vanilla)** - Lógica del cliente

## 📦 Requisitos Previos

- Node.js v18 o superior
- Git

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Fdominguez1998/tp-final-FRANCO-DOMINGUEZ.git
cd tp-final-FRANCO-DOMINGUEZ
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=veterinaria_patitas_felices

JWT_SECRET=tu_clave_secreta_jwt_aqui
```

### 4. Crear base de datos desde el dump SQL

Se incluye el dump en [database.sql](database.sql). Podes importarlo de dos maneras.

**Opcion A: MySQL en consola**

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS veterinaria_patitas_felices;"
mysql -u root -p veterinaria_patitas_felices < database.sql
```

**Opcion B: phpMyAdmin**

1. Crear la base `veterinaria_patitas_felices`.
2. Ir a la pestaña **Importar**.
3. Seleccionar el archivo `database.sql` y ejecutar.

### 5. Iniciar servidor de desarrollo

```bash
npm run dev
```

El servidor estará disponible en http://localhost:3000

## 🗂️ Estructura del Proyecto

```
tp-final-FRANCO-DOMINGUEZ/
├── src/
│   ├── controllers/      # Lógica de controladores
│   ├── models/          # Modelos de datos (MySQL)
│   ├── routes/          # Definición de rutas
│   ├── services/        # Lógica de negocio
│   ├── middlewares/     # Auth, validación
│   ├── validators/      # Reglas de validación
│   ├── database/        # Conexión MySQL
│   └── index.ts         # Punto de entrada
├── frontend/
│   ├── css/            # Estilos compartidos
│   ├── utils/          # JavaScript común
│   ├── dashboard-principal/
│   ├── gestion-usuarios/
│   └── index.html      # Login
├── .env.example
└── package.json
```

## 🔐 Usuarios de Prueba

Crear estos usuarios manualmente o mediante la API:

**Administrador:**

- Email: `admin@patitasfelices.com`
- Password: `admin123`
- Role: `admin`

**Veterinario:**

- Email: `vet@patitasfelices.com`
- Password: `vet123`
- Role: `veterinario`

## 📦 Usuarios incluidos en database.sql

El dump [database.sql](database.sql) ya trae usuarios cargados.

**Administrador (listo para login):**

- Email: `admin@patitasfelices.com`
- Password: `admin123`
- Role: `admin`

**Veterinario:**

- Email: `Victor@test.com`
- Password: `1234`

## 🌐 Frontend

### Páginas Disponibles

1. **Login** - `http://localhost:3000/index.html`
   - Autenticación de usuarios

2. **Dashboard Principal** - `/dashboard-principal/code.html`
   - CRUD de Dueños, Mascotas e Historial Clínico
   - Acceso: admin y veterinario

3. **Gestión de Usuarios** - `/gestion-usuarios/code.html`
   - CRUD de usuarios del sistema
   - Acceso: solo admin

## 📡 API Endpoints

### Autenticación

#### POST `/api/auth/register`

Registrar nuevo usuario (requiere estar autenticado como admin).

**Body:**

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "password": "contraseña123",
  "role": "veterinario"
}
```

**Respuesta exitosa (201):**

```json
{
  "message": "Usuario registrado exitosamente"
}
```

#### POST `/api/auth/login`

Iniciar sesión y obtener token JWT.

**Body:**

```json
{
  "email": "admin@patitasfelices.com",
  "password": "admin123"
}
```

**Respuesta exitosa (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nombre": "Admin",
    "apellido": "Sistema",
    "email": "admin@patitasfelices.com",
    "role": "admin"
  }
}
```

#### GET `/api/auth/me`

Obtener información del usuario autenticado.

**Headers:**

```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**

```json
{
  "id": 1,
  "nombre": "Admin",
  "apellido": "Sistema",
  "email": "admin@patitasfelices.com",
  "role": "admin"
}
```

---

### Usuarios (Admin only)

#### GET `/api/users`

Listar todos los usuarios del sistema.

**Headers:**

```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**

```json
[
  {
    "id": 1,
    "nombre": "Admin",
    "apellido": "Sistema",
    "email": "admin@patitasfelices.com",
    "role": "admin"
  },
  {
    "id": 2,
    "nombre": "Dr. Juan",
    "apellido": "Pérez",
    "email": "vet@patitasfelices.com",
    "role": "veterinario"
  }
]
```

#### GET `/api/users/:id`

Obtener usuario específico por ID.

#### PATCH `/api/users/:id`

Actualizar datos de usuario.

**Body (campos opcionales):**

```json
{
  "nombre": "Juan Carlos",
  "apellido": "Pérez López",
  "email": "nuevo@email.com",
  "password": "nuevaContraseña",
  "role": "admin"
}
```

#### DELETE `/api/users/:id`

Eliminar usuario (valida que no tenga registros relacionados).

---

### Dueños

#### GET `/api/duenos`

Listar todos los dueños.

**Headers:**

```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**

```json
[
  {
    "id": 1,
    "nombre": "María González",
    "telefono": "1234567890",
    "email": "maria@example.com",
    "direccion": "Calle Falsa 123"
  }
]
```

#### POST `/api/duenos`

Crear nuevo dueño.

**Body:**

```json
{
  "nombre": "María González",
  "telefono": "1234567890",
  "email": "maria@example.com",
  "direccion": "Calle Falsa 123"
}
```

#### GET `/api/duenos/:id`

Obtener dueño específico.

#### PATCH `/api/duenos/:id`

Actualizar datos del dueño.

#### DELETE `/api/duenos/:id`

Eliminar dueño.

---

### Mascotas

#### GET `/api/mascotas`

Listar todas las mascotas con información del dueño.

**Respuesta exitosa (200):**

```json
[
  {
    "id": 1,
    "nombre": "Firulais",
    "especie": "Perro",
    "raza": "Labrador",
    "edad": 3,
    "dueno_id": 1,
    "dueno_nombre": "María González"
  }
]
```

#### POST `/api/mascotas`

Registrar nueva mascota.

**Body:**

```json
{
  "nombre": "Firulais",
  "especie": "Perro",
  "raza": "Labrador",
  "edad": 3,
  "dueno_id": 1
}
```

#### GET `/api/mascotas/:id`

Obtener mascota específica.

#### PATCH `/api/mascotas/:id`

Actualizar datos de mascota.

#### DELETE `/api/mascotas/:id`

Eliminar mascota.

---

### Historial Clínico

#### GET `/api/historial`

Listar todo el historial clínico.

**Respuesta exitosa (200):**

```json
[
  {
    "id": 1,
    "mascota_id": 1,
    "mascota_nombre": "Firulais",
    "fecha_consulta": "2024-02-20",
    "descripcion": "Vacunación anual",
    "tratamiento": "Vacuna antirrábica",
    "veterinario_id": 2,
    "veterinario_nombre": "Dr. Juan Pérez"
  }
]
```

#### POST `/api/historial`

Crear nueva entrada en historial.

**Body:**

```json
{
  "mascota_id": 1,
  "fecha_consulta": "2024-02-20",
  "descripcion": "Vacunación anual",
  "tratamiento": "Vacuna antirrábica"
}
```

_Nota: El veterinario_id se asigna automáticamente desde el token JWT._

#### GET `/api/historial/:id`

Obtener entrada específica del historial.

#### GET `/api/historial/mascota/:mascota_id`

Obtener todo el historial de una mascota específica.

#### PATCH `/api/historial/:id`

Actualizar entrada del historial.

#### DELETE `/api/historial/:id`

Eliminar entrada del historial.

---

## 🔒 Autenticación y Autorización

### Middleware de Autenticación

Todas las rutas protegidas requieren header:

```
Authorization: Bearer <token_jwt>
```

### Roles y Permisos

| Endpoint             | Admin | Veterinario |
| -------------------- | ----- | ----------- |
| `/api/auth/register` | ✅    | ❌          |
| `/api/auth/login`    | ✅    | ✅          |
| `/api/auth/me`       | ✅    | ✅          |
| `/api/users/*`       | ✅    | ❌          |
| `/api/duenos/*`      | ✅    | ✅          |
| `/api/mascotas/*`    | ✅    | ✅          |
| `/api/historial/*`   | ✅    | ✅          |

## 🛠️ Scripts Disponibles

```bash
# Desarrollo con hot-reload
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar versión compilada
npm start
```

## 🧪 Colección de pruebas (Postman)

Se incluye una colección lista para ejecutar en:

- [postman-collection.json](postman-collection.json)

**Variables de colección:**

- `baseUrl` (por defecto `http://localhost:3000`)
- `adminEmail` (por defecto `admin@patitasfelices.com`)
- `adminPassword` (por defecto `admin123`)

**Orden recomendado:**

1. **Auth -> Login (admin)** (guarda el token)
2. **Usuarios**
3. **Duenos**
4. **Mascotas**
5. **Historial**
6. **Deletes**

## 🧪 Validaciones

El sistema implementa validación de datos con `express-validator`:

- **Email**: Formato válido
- **Contraseñas**: Mínimo 6 caracteres (en hash con bcrypt)
- **Campos requeridos**: nombre, email, role
- **Relaciones**: Validación de foreign keys antes de eliminar

## ⚠️ Manejo de Errores

### Códigos de Estado HTTP

- `200` - Operación exitosa
- `201` - Recurso creado
- `400` - Error de validación o datos incorrectos
- `401` - No autenticado
- `403` - No autorizado (sin permisos)
- `404` - Recurso no encontrado
- `500` - Error interno del servidor

### Ejemplo de Error

```json
{
  "message": "No se puede eliminar el usuario porque tiene registros relacionados: 5 dueño(s), 12 mascota(s), 23 historial(es)"
}
```

## 📝 Licencia

ISC

---

⭐ **Proyecto desarrollado como trabajo final del curso de Backend - 2026**
