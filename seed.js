const bcrypt = require("bcryptjs");
const sequelize = require("./src/config/db");
const User = require("./src/models/user.model");

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos...");

    const adminHash = await bcrypt.hash("admin123", 10);
    const userHash = await bcrypt.hash("user123", 10);

    // Limpiar o insertar usuarios de prueba
    await sequelize.query('DELETE FROM "usuarios_proyectos"');
    await sequelize.query('DELETE FROM "proyectos"');
    await sequelize.query('DELETE FROM "usuarios"');

    // Reiniciar secuencia de id
    await sequelize.query('ALTER SEQUENCE usuarios_id_seq RESTART WITH 1');

    const admin = await User.create({
      nombre: "Admin Principal",
      email: "admin@gmail.com",
      password: adminHash,
      rol_id: 1,
      administrador_id: null,
    });

    const regularUser = await User.create({
      nombre: "Usuario Regular",
      email: "user@gmail.com",
      password: userHash,
      rol_id: 2,
      administrador_id: admin.id,
    });

    console.log("Usuarios creados exitosamente:");
    console.log("-----------------------------------------");
    console.log(`ADMIN  -> Email: ${admin.email} | Password: admin123 (ID: ${admin.id}, Rol: 1)`);
    console.log(`USER   -> Email: ${regularUser.email} | Password: user123 (ID: ${regularUser.id}, Rol: 2, Admin: ${admin.id})`);
    console.log("-----------------------------------------");
  } catch (error) {
    console.error("Error al sembrar la base de datos:", error);
  } finally {
    await sequelize.close();
  }
}

seed();

