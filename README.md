# 💻 Backend - Sistema de Gestión de Usuarios y Proyectos

API REST desarrollada con Node.js, Express, Sequelize y PostgreSQL para el curso de Programación Web. Permite la autenticación con JWT, control de roles y operaciones CRUD sobre usuarios y proyectos.

## 📁 Estructura del Código

- `src/config/`: Variables de entorno y conexión a PostgreSQL.
- `src/controllers/`: Controladores que manejan las respuestas HTTP.
- `src/middlewares/`: Lógica de intercepción (validación de tokens JWT y roles).
- `src/models/`: Esquemas de datos para Sequelize.
- `src/routes/`: Definición de los endpoints de la API.
- `src/services/`: Lógica de negocio principal (validaciones, bcrypt, operaciones en DB).
- `src/utils/`: Constantes del sistema (roles).
- `src/app.js`: Configuración base de Express (CORS, parseo de JSON, rutas).
- `src/server.js`: Punto de entrada para levantar el servidor y sincronizar modelos.

## Inicialización de la Base de Datos (Seed)

Para facilitar las pruebas, el proyecto cuenta con un script automatizado `seed.js`. Al ejecutar `npm run seed`, el sistema realiza lo siguiente:

1. Autentica la conexión con la base de datos.
2. Elimina todos los registros actuales de las tablas `usuarios_proyectos`, `proyectos` y `usuarios`.
3. Reinicia las secuencias de autoincremento para que los IDs vuelvan a comenzar desde 1.
4. Encripta las contraseñas base utilizando `bcryptjs`.
5. Genera dos perfiles por defecto listos para pruebas:
   - **Administrador Principal:** (ID: 1, Rol: 1)
   - **Usuario Regular:** (ID: 2, Rol: 2, bajo la administración del ID 1)
