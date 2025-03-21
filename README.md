# 📌  Mi Proyecto Week 6

Este es mi proyecto de API REST desarrollada con Node.js, Express y MongoDB. Implementa validaciones con express-validator, 
seguridad con helmet y cors, y logging con winston.



👉 [Ver código principal](https://github.com/juancamacho-otf/Week-6.git)

## 🚀 Instalación  

1️⃣Clona el repositorio:

   ```sh
   https://github.com/juancamacho-otf/Week-6.git
   ```

2️⃣ Asegurate que estes en la rama master del proyecto:
cd src 
3️⃣ Instala las dependencias:

🛠️ Configuración
1️⃣ Este proyecto utiliza una base de datos en MongoDB Atlas. He compartido mis credenciales en el archivo de configuración para que
 puedas hacer peticiones sin necesidad de crear tu propia base de datos.

2️⃣ Si quieres crea un archivo .env en la raíz del proyecto y agrega:
```sh
DB_USERNAME=tu_usuario
DB_PW=tu_contraseña
NODE_ENV=development
```
3️⃣ Ejecuta el servidor en modo desarrollo:

npm run dev

Esto usará nodemon para reiniciar el servidor automáticamente cuando haya cambios.

4️⃣ Si deseas ejecutarlo en modo producción:
npm start
📡 Endpoints Disponibles
🔍 Obtener un usuario aleatorio y almacenarlo
```sh
GET /api/user
```
📌 Descripción: Obtiene un usuario aleatorio de la API externa y lo almacena en la base de datos.

📂 Obtener todos los usuarios almacenados
```sh
GET /api/user-all
```
📌 Descripción: Devuelve todos los usuarios guardados en la base de datos.

🔎 Obtener un usuario por ID
```sh
GET /api/:id
```

📌 Parámetro:

id (String) → ID del usuario en la base de datos.

📤 Crear un usuario individual
```sh
POST /api/user
```
📌 Body (JSON):
```sh
{
  "name": "Juan Pérez",
  "genero": "male",
  "ciudad": "Bogotá"
}
```
📥 Crear múltiples usuarios (Batch)
```sh
POST /api/batch-users
```
📌 Body (JSON):
```sh
[
  {
    "name": "Carlos Torres",
    "genero": "male",
    "ciudad": "Medellín"
  },
  {
    "name": "Ana Gómez",
    "genero": "female",
    "ciudad": "Cali"
  }
]
```
✏️ Actualizar un usuario
```sh
PUT /api/:id
```
📌 Parámetro:

id (String) → ID del usuario a actualizar.

📌 Body (JSON):
```sh
{
  "name": "Luis Ramírez",
  "genero": "male",
  "ciudad": "Cartagena"
}
```
🗑️ Eliminar un usuario
```sh
DELETE /api/:id
```
📌 Parámetro:

id (String) → ID del usuario a eliminar.

📖 Tecnologías Usadas

-✅ Node.js - Runtime de JavaScript
-✅ Express - Framework minimalista para APIs
-✅ MongoDB - Base de datos NoSQL
-✅ Mongoose - ODM para MongoDB
-✅ Express-validator - Validación de datos en las solicitudes
-✅ Helmet - Seguridad para HTTP headers
-✅ Cors - Control de acceso entre dominios
-✅ Winston - Logger avanzado

📌 Autor

👤 Juan Camacho

📧Contacto: juan.pelaez@onthefuze.com

🚀 ¡Gracias por revisar mi proyecto!
